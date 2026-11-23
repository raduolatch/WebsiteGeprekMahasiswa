import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ cartCount }) {
  return (
    <div className="layout-wrapper">
      <Navbar cartCount={cartCount} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}