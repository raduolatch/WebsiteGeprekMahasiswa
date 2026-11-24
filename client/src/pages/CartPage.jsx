import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { createOrder } from '../services/api';

const formatPrice = (price) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
}).format(price);

export default function CartPage() {
  const { items, subtotal, setQuantity, removeFromCart, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fulfillment, setFulfillment] = useState('pickup');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  async function handleCheckout(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const order = {
      customerName: formData.get('customerName').trim(),
      phone: formData.get('phone').trim(),
      fulfillment: formData.get('fulfillment'),
      address: formData.get('address').trim(),
      paymentMethod: formData.get('paymentMethod'),
      notes: formData.get('notes').trim(),
      items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
      subtotal,
      total: subtotal,
    };

    try {
      const result = await createOrder(order);
      clearCart();
      setCheckoutOpen(false);
      setConfirmation(`Pesanan berhasil dikirim${result?.orderNumber ? ` dengan nomor ${result.orderNumber}` : ''}.`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="container order-page">
      <header className="order-page-header">
        <span className="badge-pill">Pesananmu</span>
        <h1 className="section-title">Keranjang Belanja</h1>
        <p className="section-subtitle">Periksa pesanan sebelum melanjutkan ke checkout.</p>
      </header>

      {confirmation && <p className="status-message status-success" role="status">{confirmation}</p>}
      {error && !checkoutOpen && <p className="status-message status-error" role="alert">{error}</p>}

      {items.length === 0 ? (
        <div className="empty-state">
          <span aria-hidden="true">🛒</span>
          <h2>Keranjangmu masih kosong</h2>
          <p>Yuk, pilih ayam geprek favoritmu dulu.</p>
          <Link to="/menu" className="btn btn-primary">Lihat Menu</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-image" aria-hidden="true">
                  {item.image && /^https?:\/\//.test(item.image) ? '🍗' : item.image || '🍗'}
                </div>
                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <span>{formatPrice(item.price)} / item</span>
                  <button className="remove-button" onClick={() => removeFromCart(item.id)} type="button">
                    Hapus
                  </button>
                </div>
                <div className="quantity-control" aria-label={`Jumlah ${item.name}`}>
                  <button onClick={() => setQuantity(item.id, item.quantity - 1)} type="button" aria-label="Kurangi jumlah">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => setQuantity(item.id, item.quantity + 1)} type="button" aria-label="Tambah jumlah">+</button>
                </div>
                <strong className="cart-item-total">{formatPrice(item.price * item.quantity)}</strong>
              </article>
            ))}
            <Link to="/menu" className="back-link">← Tambah menu lainnya</Link>
          </div>

          <aside className="order-summary">
            <h2>Ringkasan Pesanan</h2>
            <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className="summary-row summary-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
            <p className="summary-note">Biaya antar, jika ada, akan dikonfirmasi oleh pihak outlet.</p>
            <button className="btn btn-primary checkout-button" onClick={() => setCheckoutOpen(true)} type="button">
              Lanjut Checkout
            </button>
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !submitting) setCheckoutOpen(false);
        }}>
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            <div className="modal-heading">
              <div>
                <span className="product-category">Satu langkah lagi</span>
                <h2 id="checkout-title">Informasi Checkout</h2>
              </div>
              <button className="modal-close" onClick={() => setCheckoutOpen(false)} type="button" aria-label="Tutup checkout">×</button>
            </div>
            {error && <p className="status-message status-error" role="alert">{error}</p>}
            <form className="checkout-form" onSubmit={handleCheckout}>
              <label>
                Nama lengkap
                <input name="customerName" autoComplete="name" required maxLength="100" />
              </label>
              <label>
                Nomor WhatsApp
                <input name="phone" type="tel" autoComplete="tel" required minLength="8" maxLength="20" />
              </label>
              <label>
                Pesanan
                <select name="fulfillment" value={fulfillment} onChange={(event) => setFulfillment(event.target.value)}>
                  <option value="pickup">Ambil di outlet</option>
                  <option value="delivery">Antar ke alamat</option>
                </select>
              </label>
              <label>
                  Alamat {fulfillment === 'delivery' ? '' : '(opsional)'}
                  <textarea name="address" rows="2" maxLength="300" required={fulfillment === 'delivery'} placeholder="Isi alamat jika perlu diantar" />
              </label>
              <label>
                Metode pembayaran
                <select name="paymentMethod" defaultValue="cash">
                  <option value="cash">Bayar di tempat</option>
                  <option value="transfer">Transfer bank</option>
                </select>
              </label>
              <label>
                Catatan untuk outlet (opsional)
                <textarea name="notes" rows="2" maxLength="500" placeholder="Contoh: sambal dipisah" />
              </label>
              <div className="summary-row summary-total"><span>Total pembayaran</span><strong>{formatPrice(subtotal)}</strong></div>
              <button className="btn btn-primary checkout-button" disabled={submitting} type="submit">
                {submitting ? 'Mengirim pesanan...' : 'Kirim Pesanan'}
              </button>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
