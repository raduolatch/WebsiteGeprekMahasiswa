import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="container about-container">
      <section className="section-header" style={{ marginBottom: 0 }}>
        <span className="badge-pill" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
          Tentang Kami
        </span>
        <h1 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>
          Menghadirkan Cita Rasa Ayam Geprek Autentik & Ramah Kantong
        </h1>
        <p className="section-subtitle" style={{ fontSize: '1rem' }}>
          Geprek Mahasiswa hadir sebagai solusi makan kenyang, enak, dan pedas nampol bagi mahasiswa dan pecinta kuliner pedas setiap harinya.
        </p>
      </section>

      <section className="about-box">
        <div className="hero-image-box" style={{ maxWidth: '100%' }}>
          <span style={{ fontSize: '3.25rem', marginBottom: '0.5rem' }}>👨‍🍳🔥</span>
          <strong>Foto Dapur / Proses Geprek</strong>
          <span style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
            Ganti dengan foto aktivitas dapur atau outlet
          </span>
        </div>

        <div>
          <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>
            Rahasia Kelezatan Kami
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
            Setiap potong ayam dimarinasi dengan bumbu rempah pilihan sebelum digoreng krispi dan digeprek langsung bersama cabai rawit segar sesuai level yang kamu minta.
          </p>

          <div className="about-mini-grid">
            <div className="about-mini-card">
              <div style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>🏅</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>100% Bahan Segar</h3>
              <p style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Cabai dan bawang dipilih segar setiap pagi.
              </p>
            </div>
            <div className="about-mini-card">
              <div style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>🎓</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Ramah Mahasiswa</h3>
              <p style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Porsi mengenyangkan dengan harga terjangkau.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Kunjungi Outlet Kami</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginTop: '0.35rem' }}>
            Ingin makan langsung di tempat atau ambil pesananmu? Kami siap melayani setiap hari.
          </p>
          <div className="info-list">
            <div className="info-item">
              <span>📍</span>
              <span>Area Kampus & Sekitarnya</span>
            </div>
            <div className="info-item">
              <span>🕒</span>
              <span>Senin – Minggu: 10.00 – 22.00 WIB</span>
            </div>
          </div>
        </div>

        <Link to="/menu" className="btn btn-primary" style={{ padding: '1rem 1.75rem' }}>
          Lihat Menu & Pesan Online
        </Link>
      </section>
    </div>
  );
}