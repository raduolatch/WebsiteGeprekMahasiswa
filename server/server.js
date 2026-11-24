
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import routes
const menuRoutes = require('./routes/menuRoutes');
const pesananRoutes = require('./routes/pesananRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint utama
app.get('/', (req, res) => {
    res.json({
        message: 'API Geprek Mahasiswa berhasil berjalan!'
    });
});

// Endpoint API
app.use('/api/menu', menuRoutes);
app.use('/api/pesanan', pesananRoutes);

// Menjalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di port http://localhost:3000`);
});
