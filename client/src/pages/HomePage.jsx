import { Link } from 'react-router-dom';

export default function HomePage() {
  const bestSellers = [
    {
      id: 1,
      name: 'Ayam Geprek Cabe Merah + Nasi',
      desc: 'Ayam krispi sambal merah pedas dengan nasi yang menggugah selera.',
      price: 'Rp 11.000',
      tag: 'Terlaris',
    },
    {
      id: 2,
      name: 'Ayam Saus Lava + Nasi',
      desc: 'Ayam krispi saus lava dan nasi yang memanjakan lidah.',
      price: 'Rp 11.000',
      tag: 'Terlaris',
    },
    {
      id: 3,
      name: 'Ayam Geprek Cabe Merah + Nasi Daun Jeruk',
      desc: 'Ayam krispi sambal merah pedas dengan nasi aromatik.',
      price: 'Rp 14.000',
      tag: 'Terlaris',
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <h1 className="hero-title">
              Kriuknya Bikin Nagih, <span>Pedasnya</span> Bikin Melek!
            </h1>
            <p className="hero-desc">
              Ayam goreng tepung yang digeprek dengan cabai pilihan. Harga mahasiswa, porsi juara!
            </p>
            <div className="hero-buttons">
              <Link to="/menu" className="btn btn-primary">
                Pesan Sekarang →
              </Link>
              <Link to="/about" className="btn btn-outline">
                Tentang Kami
              </Link>
            </div>
          </div>

          <div>
            <div className="hero-image-box">
              <span style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>🍗🌶️</span>
              <strong>Foto Utama Ayam Geprek</strong>
              <span style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Ganti kotak ini dengan foto produk unggulan
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="section-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Kenapa Harus Geprek Mahasiswa?</h2>
            <p className="section-subtitle">
              Kami menjaga kualitas rasa dan porsi yang pas untuk kantong mahasiswa.
            </p>
          </div>

          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-icon">🍗</div>
              <h3>Ayam Segar Setiap Hari</h3>
              <p>Dimarinasi bumbu rempah pilihan sehingga daging tetap juicy di dalam dan renyah di luar.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ backgroundColor: '#fef3c7' }}>🌶️</div>
              <h3>Sambal Ulek Dadakan</h3>
              <p>Cabai diulek langsung saat pesanan masuk. Bebas tentukan level pedas sesuai seleramu.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ backgroundColor: '#dcfce7' }}>⚡</div>
              <h3>Higienis & Cepat</h3>
              <p>Pemesanan praktis lewat website tanpa antre lama di lokasi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MENU*/}
      <section className="menu-section">
        <div className="container">
          <div className="section-row-header">
            <div>
              <h2 className="section-title">Menu</h2>
              <p className="section-subtitle">Pilihan yang wajib kamu coba.</p>
            </div>
            <Link to="/menu" className="link-red">
              Lihat Semua Menu →
            </Link>
          </div>

          <div className="grid-3">
            {bestSellers.map((item) => (
              <div key={item.id} className="menu-card">
                <div className="menu-card-thumb">
                  <span>🍗</span>
                  <span className="menu-tag">{item.tag}</span>
                </div>
                <div className="menu-card-body">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <div className="menu-card-footer">
                    <span className="price-text">{item.price}</span>
                    <Link to="/menu" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                      Pesan
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}