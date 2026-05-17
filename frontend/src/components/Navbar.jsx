import { Link } from 'react-router-dom';
import { Utensils, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="glass-panel sticky top-0 z-50 rounded-none border-t-0 border-l-0 border-r-0 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-primary font-bold text-2xl tracking-wide">
          <img src="/logo.jpg" alt="GK Food Flow Logo" className="h-12 w-auto object-contain rounded-full shadow-lg shadow-orange-500/20" />
          <span>GK Food Flow</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/booking" className="nav-link">Book Table</Link>
          <Link to="/orders" className="nav-link">My Orders</Link>
          <Link to="/cart" className="nav-link flex items-center gap-1">
            <ShoppingCart size={18} />
            <span>Cart ({cartCount})</span>
          </Link>
          <Link to="/login" className="btn-primary flex items-center gap-2 text-sm py-1.5">
            <User size={16} />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
