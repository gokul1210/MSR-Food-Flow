import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass-panel sticky top-0 z-50 rounded-none border-t-0 border-l-0 border-r-0 border-b border-white/10 print:hidden">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/home" className="flex items-center gap-2 md:gap-3 text-primary font-bold tracking-wide z-50">
          <img src="/logo.jpg" alt="GK Food Flow Logo" className="h-10 md:h-12 w-auto object-contain rounded-full shadow-lg shadow-orange-500/20" />
          <span className="text-xl md:text-2xl">GK Food Flow</span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-gray-300 hover:text-primary transition-colors z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/booking" className="nav-link">Book Table</Link>
          <Link to="/orders" className="nav-link">My Orders</Link>
          
          <Link to="/cart" className="nav-link flex items-center gap-1">
            <ShoppingCart size={18} />
            <span>Cart ({cartCount})</span>
          </Link>
          
          {localStorage.getItem('foodflow_auth') === 'true' ? (
            <button 
              onClick={() => {
                localStorage.removeItem('foodflow_auth');
                window.location.href = '/';
              }} 
              className="btn-primary bg-red-500 hover:bg-red-600 shadow-red-500/20 text-white flex items-center gap-2 text-sm py-1.5 px-4"
            >
              <User size={16} />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="btn-primary flex items-center gap-2 text-sm py-1.5 px-4">
              <User size={16} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#15161a] border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 gap-4">
          <Link to="/menu" className="text-gray-300 hover:text-primary transition-colors text-lg" onClick={() => setIsMenuOpen(false)}>Menu</Link>
          <Link to="/booking" className="text-gray-300 hover:text-primary transition-colors text-lg" onClick={() => setIsMenuOpen(false)}>Book Table</Link>
          <Link to="/orders" className="text-gray-300 hover:text-primary transition-colors text-lg" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
          
          <Link to="/cart" className="text-gray-300 hover:text-primary transition-colors text-lg flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <ShoppingCart size={20} />
            <span>Cart ({cartCount})</span>
          </Link>
          
          <div className="pt-4 border-t border-white/10 mt-2">
            {localStorage.getItem('foodflow_auth') === 'true' ? (
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  localStorage.removeItem('foodflow_auth');
                  window.location.href = '/';
                }} 
                className="btn-primary bg-red-500 hover:bg-red-600 shadow-red-500/20 text-white flex items-center justify-center gap-2 w-full py-3"
              >
                <User size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="btn-primary flex items-center justify-center gap-2 w-full py-3" onClick={() => setIsMenuOpen(false)}>
                <User size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
