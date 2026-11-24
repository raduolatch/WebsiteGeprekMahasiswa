import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useCart } from '../../context/useCart';

export default function MainLayout() {
  const { itemCount } = useCart();

  return (
    <div className="layout-wrapper">
      <Navbar cartCount={itemCount} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}