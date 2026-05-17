import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const tax = cartTotal * 0.05;
  const deliveryFee = cartTotal > 500 || cartTotal === 0 ? 0 : 40;
  const grandTotal = cartTotal + tax + deliveryFee;

  const handleCheckout = () => {
    const orderId = Math.floor(100000 + Math.random() * 900000);
    clearCart();
    navigate('/thank-you', { state: { orderId } });
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in">
        <div className="bg-white/5 p-6 rounded-full text-gray-500 mb-4">
          <ShoppingBag size={64} />
        </div>
        <h2 className="text-3xl font-bold text-white">Your cart is empty</h2>
        <p className="text-gray-400 max-w-md">Looks like you haven't added any delicious authentic Indian dishes to your cart yet.</p>
        <Link to="/menu" className="btn-primary flex items-center gap-2 mt-4 px-6 py-3">
          Browse Menu <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Your Cart</h1>
          <p className="text-gray-400">Review your items and proceed to checkout.</p>
        </div>
        <button onClick={clearCart} className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1 transition-colors">
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="glass-panel p-4 flex flex-col sm:flex-row items-center gap-4">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.category}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-white/10 text-gray-300 transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-white/10 text-gray-300 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="w-20 text-right">
                  <span className="font-bold text-lg">₹{item.price * item.quantity}</span>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="glass-panel p-6 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h3>
            <div className="space-y-4 text-sm text-gray-300 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <span className="text-green-400">Free</span> : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-lg text-white font-bold">Total</span>
                <span className="text-2xl text-primary font-bold">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              className="btn-primary w-full py-3 text-lg flex justify-center items-center gap-2 shadow-lg shadow-primary/20"
            >
              Confirm Order <ArrowRight size={20} />
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
              * This is a prototype. No actual payments will be processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
