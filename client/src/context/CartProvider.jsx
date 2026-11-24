import { useState } from 'react';
import { CartContext } from './useCart';

const STORAGE_KEY = 'geprek-mahasiswa-cart';

function readStoredCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  function updateItems(nextItems) {
    setItems(nextItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  }

  function addToCart(product) {
    const existing = items.find((item) => String(item.id) === String(product.id));
    const nextItems = existing
      ? items.map((item) => (
        String(item.id) === String(product.id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
      : [...items, { ...product, quantity: 1 }];
    updateItems(nextItems);
  }

  function setQuantity(productId, quantity) {
    const nextItems = quantity < 1
      ? items.filter((item) => String(item.id) !== String(productId))
      : items.map((item) => (
        String(item.id) === String(productId) ? { ...item, quantity } : item
      ));
    updateItems(nextItems);
  }

  function removeFromCart(productId) {
    updateItems(items.filter((item) => String(item.id) !== String(productId)));
  }

  function clearCart() {
    updateItems([]);
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const value = { items, itemCount, subtotal, addToCart, setQuantity, removeFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
