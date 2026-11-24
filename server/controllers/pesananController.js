
const db = require('../config/database');

// 1. Mengambil semua pesanan
const getAllPesanan = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT
                p.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'nama_menu', m.nama_menu,
                            'jumlah', d.jumlah,
                            'subtotal', d.subtotal
                        )
                    ) FILTER (WHERE d.id_detail IS NOT NULL),
                    '[]'
                ) AS items
            FROM pesanan p
            LEFT JOIN detail_pesanan d
                ON p.id_pesanan = d.id_pesanan
            LEFT JOIN menu m
                ON d.id_menu = m.id_menu
            GROUP BY p.id_pesanan
            ORDER BY p.id_pesanan DESC
        `);

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({
            message: 'Gagal mengambil pesanan'
        });
    }
};

// 2. Mengambil satu pesanan berdasarkan ID
const getPesananById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query(`
            SELECT
                p.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'nama_menu', m.nama_menu,
                            'jumlah', d.jumlah,
                            'subtotal', d.subtotal
                        )
                    ) FILTER (WHERE d.id_detail IS NOT NULL),
                    '[]'
                ) AS items
            FROM pesanan p
            LEFT JOIN detail_pesanan d
                ON p.id_pesanan = d.id_pesanan
            LEFT JOIN menu m
                ON d.id_menu = m.id_menu
            WHERE p.id_pesanan = $1
            GROUP BY p.id_pesanan
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Pesanan tidak ditemukan'
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({
            message: 'Gagal mengambil detail pesanan'
        });
    }
};

// 3. Membuat pesanan baru
const createPesanan = async (req, res) => {
    const client = await db.connect();

    try {
        const { nama_pelanggan, items } = req.body;

        if (!nama_pelanggan || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: 'Nama pelanggan dan item pesanan wajib diisi'
            });
        }

        // Validasi item
        for (const item of items) {
            if (
                !Number.isInteger(Number(item.id_menu)) ||
                !Number.isInteger(Number(item.jumlah)) ||
                Number(item.jumlah) <= 0
            ) {
                return res.status(400).json({
                    message: 'ID menu dan jumlah pesanan tidak valid'
                });
            }
        }

        await client.query('BEGIN');

        let totalHarga = 0;
        const detailItems = [];

        for (const item of items) {
            const menuResult = await client.query(
                `SELECT id_menu, nama_menu, harga
                 FROM menu
                 WHERE id_menu = $1 AND tersedia = TRUE`,
                [item.id_menu]
            );

            if (menuResult.rows.length === 0) {
                throw new Error(`Menu ID ${item.id_menu} tidak tersedia`);
            }

            const menu = menuResult.rows[0];
            const subtotal = Number(menu.harga) * Number(item.jumlah);

            totalHarga += subtotal;

            detailItems.push({
                id_menu: menu.id_menu,
                nama_menu: menu.nama_menu,
                jumlah: Number(item.jumlah),
                subtotal
            });
        }

        // Simpan informasi pesanan
        const pesananResult = await client.query(
            `INSERT INTO pesanan
             (nama_pelanggan, total_harga)
             VALUES ($1, $2)
             RETURNING *`,
            [nama_pelanggan, totalHarga]
        );

        const pesanan = pesananResult.rows[0];

        // Simpan setiap detail pesanan
        for (const item of detailItems) {
            await client.query(
                `INSERT INTO detail_pesanan
                 (id_pesanan, id_menu, jumlah, subtotal)
                 VALUES ($1, $2, $3, $4)`,
                [
                    pesanan.id_pesanan,
                    item.id_menu,
                    item.jumlah,
                    item.subtotal
                ]
            );
        }

        await client.query('COMMIT');

        res.status(201).json({
            message: 'Pesanan berhasil dibuat',
            data: {
                ...pesanan,
                items: detailItems
            }
        });

    } catch (error) {
        await client.query('ROLLBACK');

        if (error.message.includes('tidak tersedia')) {
            return res.status(400).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: 'Gagal membuat pesanan'
        });

    } finally {
        client.release();
    }
};

// 4. Mengubah status pesanan
const updatePesanan = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const statusValid = [
            'Menunggu',
            'Diproses',
            'Selesai',
            'Dibatalkan'
        ];

        if (!statusValid.includes(status)) {
            return res.status(400).json({
                message: 'Status pesanan tidak valid'
            });
        }

        const result = await db.query(
            `UPDATE pesanan
             SET status = $1
             WHERE id_pesanan = $2
             RETURNING *`,
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Pesanan tidak ditemukan'
            });
        }

        res.json({
            message: 'Status pesanan berhasil diubah',
            data: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            message: 'Gagal mengubah pesanan'
        });
    }
};

// 5. Menghapus pesanan
const deletePesanan = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query(
            `DELETE FROM pesanan
             WHERE id_pesanan = $1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Pesanan tidak ditemukan'
            });
        }

        res.json({
            message: 'Pesanan berhasil dihapus'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Gagal menghapus pesanan'
        });
    }
};

module.exports = {
    getAllPesanan,
    getPesananById,
    createPesanan,
    updatePesanan,
    deletePesanan
};
