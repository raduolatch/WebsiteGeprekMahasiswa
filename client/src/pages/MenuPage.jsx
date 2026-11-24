import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { demoMenu } from '../data/menu';
import { fetchMenu } from '../services/api';
import { useCart } from '../context/useCart';

const formatPrice = (price) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
}).format(price);

export default function MenuPage() {
  const [menu, setMenu] = useState(demoMenu);
  const [categories, setCategories] = useState(['Semua']);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [apiWarning, setApiWarning] = useState('');
  const [notice, setNotice] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    let active = true;
    fetchMenu()
      .then((products) => {
        if (!active) return;
        setMenu(products);
        setCategories(['Semua', ...new Set(products.map((product) => product.category).filter(Boolean))]);
        setApiWarning('');
      })
      .catch((error) => {
        if (active) setApiWarning(`${error.message} Kami menampilkan menu demo.`);
      });
    return () => { active = false; };
  }, []);

  const visibleMenu = menu.filter((product) => (
    activeCategory === 'Semua' || product.category === activeCategory
  ));

  function handleAdd(product) {
    addToCart(product);
    setNotice(`${product.name} ditambahkan ke keranjang.`);
    window.setTimeout(() => setNotice(''), 2500);
  }

  return (
    <section className="container order-page">
      <header className="order-page-header">
        <span className="badge-pill">Dibuat segar saat dipesan</span>
        <h1 className="section-title">Menu Ayam Geprek</h1>
        <p className="section-subtitle">Pilih menu favoritmu, atur level pedas, dan pesan dengan mudah.</p>
      </header>

      {apiWarning && <p className="status-message status-warning" role="status">{apiWarning}</p>}
      {notice && <p className="status-message status-success" role="status">{notice}</p>}

      <div className="category-list" aria-label="Kategori menu">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button${activeCategory === category ? ' is-active' : ''}`}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      {visibleMenu.length === 0 ? (
        <div className="empty-state">
          <span aria-hidden="true">🍽️</span>
          <h2>Menu belum tersedia</h2>
          <p>Belum ada menu untuk kategori ini. Coba pilih kategori lainnya.</p>
        </div>
      ) : (
        <div className="product-grid">
          {visibleMenu.map((product) => (
            <article key={product.id} className="menu-card">
              <Link to={`/menu/${product.id}`} className="product-image" aria-label={`Lihat ${product.name}`}>
                {product.image && /^https?:\/\//.test(product.image)
                  ? <img src={product.image} alt={product.name} />
                  : <span aria-hidden="true">{product.image || '🍗'}</span>}
                {product.tag && <span className="menu-tag">{product.tag}</span>}
              </Link>
              <div className="menu-card-body">
                <div>
                  {product.category && <span className="product-category">{product.category}</span>}
                  <h2><Link to={`/menu/${product.id}`}>{product.name}</Link></h2>
                  <p>{product.description || product.desc}</p>
                </div>
                <div className="menu-card-footer">
                  <span className="price-text">{formatPrice(Number(product.price) || 0)}</span>
                  <button className="btn btn-primary" onClick={() => handleAdd(product)} type="button">
                    + Keranjang
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
