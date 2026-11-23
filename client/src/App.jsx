import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/common/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function PlaceholderPage({ title, owner }) {
  return (
    <div className="container" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
      <h1 className="section-title">{title}</h1>
      <p className="section-subtitle">Coming soon {owner}.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout cartCount={0} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<PlaceholderPage title="Daftar Menu Ayam Geprek"  />} />
          <Route path="/cart" element={<PlaceholderPage title="Keranjang Belanja"  />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}