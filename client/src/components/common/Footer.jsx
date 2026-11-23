    import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ color: '#ffffff', marginBottom: '0.75rem' }}>
              Geprek<span className="accent">Mahasiswa</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
              Ayam geprek tepung krispi dengan sambal ulek dadakan pilihan. Porsi kenyang, harga ramah kantong mahasiswa!
            </p>
          </div>

          <div>
            <h4>Tautan Cepat</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Daftar Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/cart">Keranjang Belanja</Link></li>
            </ul>
          </div>

          <div>
            <h4>Lokasi & Jam Buka</h4>
            <div className="info-list">
              <div className="info-item">
                <span>🕒</span>
                <span>Senin - Sabtu: 08.30 – 20.45 WIB <br/>
                  Minggu: Tutup
                </span>
              </div>
              <div className="info-item">
                <span>📍</span>
                <span>Jl. Pembangunan No.117Padang, BulanKec, Kec. Medan Baru, Kota Medan, Sumatera Utara 20155</span>
              </div>
              <div className="info-item">
                <span>📞</span>
                <span>0895-1044-6329</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Geprek Mahasiswa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}