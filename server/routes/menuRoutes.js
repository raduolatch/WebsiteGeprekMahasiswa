const express = require('express');
const router = express.Router();

const db = require('../config/database');

// GET semua menu
router.get('/', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM menu ORDER BY id_menu'
        );

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({
            message: 'Gagal mengambil data menu'
        });
    }
});

module.exports = router;