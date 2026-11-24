# Geprek Mahasiswa — Frontend

## Menjalankan aplikasi

```sh
npm install
npm run dev
```

## Integrasi API

Secara default frontend mengakses backend di `http://localhost:3000/api`. Atur `VITE_API_URL` pada environment Vite jika alamat backend berbeda, misalnya `VITE_API_URL=https://example.com/api`.

- `GET /menu` mengembalikan array produk atau objek `{ "data": [...] }`. Produk menggunakan `id`, `name`, `price`, dan dapat menyertakan `description`, `category`, `image`, serta `tag`.
- `POST /orders` menerima `customerName`, `phone`, `fulfillment`, `address`, `paymentMethod`, `notes`, `items` (array `productId` dan `quantity`), `subtotal`, dan `total`.
- Jika menu gagal dimuat, frontend menampilkan menu demo dari `src/data/menu.js` dan memberi peringatan. Pesanan tetap dikirim ke backend; kegagalan API ditampilkan dan isi keranjang tidak dihapus.
