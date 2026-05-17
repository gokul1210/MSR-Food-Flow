import { useState, useEffect } from 'react';
import { Clock, Receipt, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    // Load orders from LocalStorage
    const savedOrders = JSON.parse(localStorage.getItem('foodflow_orders')) || [];
    // Sort orders by newest first
    savedOrders.reverse();
    setOrders(savedOrders);
  }, []);

  const toggleOrder = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in">
        <div className="bg-white/5 p-6 rounded-full text-gray-500 mb-4">
          <Clock size={64} />
        </div>
        <h2 className="text-3xl font-bold text-white">No Past Orders</h2>
        <p className="text-gray-400 max-w-md">You haven't placed any orders yet. Once you order some delicious food, your bills will be stored here!</p>
        <Link to="/menu" className="btn-primary flex items-center gap-2 mt-4 px-6 py-3">
          Browse Menu <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-4">
      <div className="mb-10 border-b border-white/10 pb-6 flex items-center gap-4">
        <Receipt size={32} className="text-primary" />
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Orders</h1>
          <p className="text-gray-400">View your past bills and order history.</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="glass-panel overflow-hidden transition-all duration-300">
            {/* Order Header (Clickable) */}
            <div 
              className="p-6 flex flex-col sm:flex-row justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => toggleOrder(order.orderId)}
            >
              <div className="flex flex-col mb-4 sm:mb-0">
                <span className="text-lg font-bold text-white">Order #{order.orderId}</span>
                <span className="text-sm text-gray-400">{order.date}</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="block text-sm text-gray-400">Total</span>
                  <span className="text-xl font-bold text-primary">₹{order.grandTotal.toFixed(2)}</span>
                </div>
                <div className="text-gray-500">
                  {expandedOrder === order.orderId ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>
            </div>

            {/* Expanded Bill Details */}
            {expandedOrder === order.orderId && (
              <div className="p-6 border-t border-white/10 bg-black/20 animate-fade-in">
                <h3 className="text-white font-bold mb-4">Bill Summary</h3>
                <div className="space-y-3 mb-6">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div>
                        <span className="font-medium text-gray-200">{item.title}</span>
                        <span className="text-gray-500 text-sm ml-2">x{item.quantity}</span>
                      </div>
                      <span className="text-gray-300">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 text-sm text-gray-400 max-w-xs ml-auto">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 font-bold text-white text-base">
                    <span>Amount Paid</span>
                    <span className="text-primary">₹{order.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center sm:text-right">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Redirect to the thank-you page with this order data for printing
                      window.location.href = '#'; 
                      // For a real app, you could navigate to a dedicated print route here
                      alert('To print this bill, please view the Order Confirmation page directly after placing an order.');
                    }}
                    className="text-sm text-gray-400 hover:text-white transition-colors underline"
                  >
                    Download Receipt
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
