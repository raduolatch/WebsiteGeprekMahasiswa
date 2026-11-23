import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ cartCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <header className="navbar">
      <nav className="container navbar-inner">
        <Link to="/" className="brand-logo">
          <span>
            GeprekMahasiswa
          </span>
        </Link>

        <ul className="nav-links">
          <li><NavLink to="/" className={getLinkClass}>Beranda</NavLink></li>
          <li><NavLink to="/menu" className={getLinkClass}>Menu</NavLink></li>
          <li><NavLink to="/about" className={getLinkClass}>Tentang Kami</NavLink></li>
        </ul>

        <div className="nav-actions">
          <Link to="/cart" className="cart-btn" aria-label="Keranjang Belanja">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle"
            aria-label="Toggle Menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/menu" onClick={() => setIsOpen(false)} className={getLinkClass}>
            Menu
          </NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className={getLinkClass}>
            About Us
          </NavLink>
        </div>
      )}
    </header>
  );
}