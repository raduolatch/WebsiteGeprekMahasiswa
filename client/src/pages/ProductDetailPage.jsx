import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { demoMenu } from '../data/menu';
import { useCart } from '../context/useCart';
import { fetchMenu } from '../services/api';

const formatPrice = (price) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
}).format(price);

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(() => demoMenu.find((item) => item.id === productId));
  const [apiWarning, setApiWarning] = useState('');
  const [notice, setNotice] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    let active = true;
    fetchMenu()
      .then((menu) => {
        if (active) setProduct(menu.find((item) => String(item.id) === productId));
      })
      .catch((error) => {
        if (active) setApiWarning(`${error.message} Detail demo ditampilkan jika tersedia.`);
      });
    return () => { active = false; };
  }, [productId]);

  if (!product) {
    return (
      <section className="container order-page">
        {apiWarning && <p className="status-message status-warning" role="status">{apiWarning}</p>}
        <div className="empty-state">
          <span aria-hidden="true">🔎</span>
          <h1>Menu tidak ditemukan</h1>
          <p>Produk yang kamu cari tidak tersedia.</p>
          <Link to="/menu" className="btn btn-primary">Kembali ke Menu</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container order-page">
      <Link to="/menu" className="back-link">← Kembali ke menu</Link>
      {apiWarning && <p className="status-message status-warning" role="status">{apiWarning}</p>}
      {notice && <p className="status-message status-success" role="status">{notice}</p>}
      <article className="product-detail">
        <div className="product-detail-image">
          {product.image && /^https?:\/\//.test(product.image)
            ? <img src={product.image} alt={product.name} />
            : <span aria-hidden="true">{product.image || '🍗'}</span>}
        </div>
        <div className="product-detail-copy">
          {product.category && <span className="product-category">{product.category}</span>}
          <h1>{product.name}</h1>
          <p>{product.description || product.desc}</p>
          <strong className="detail-price">{formatPrice(Number(product.price) || 0)}</strong>
          <button
            className="btn btn-primary"
            onClick={() => {
              addToCart(product);
              setNotice('Menu ditambahkan ke keranjang.');
            }}
            type="button"
          >
            + Tambahkan ke Keranjang
          </button>
        </div>
      </article>
    </section>
  );
}
