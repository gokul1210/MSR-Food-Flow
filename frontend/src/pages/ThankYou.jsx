import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Star, ArrowRight, Printer } from 'lucide-react';

const ThankYou = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  const orderData = location.state?.orderData;
  const orderId = orderData?.orderId || Math.floor(100000 + Math.random() * 900000);

  const handleRating = (value) => {
    setRating(value);
  };

  const submitRating = () => {
    if (rating > 0) {
      setSubmitted(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 animate-fade-in max-w-3xl mx-auto px-4 print:block print:min-h-0 print:m-0 print:p-0 print:space-y-1">
      
      {!submitted ? (
        <>
          <div className="bg-green-500/20 p-6 rounded-full text-green-500 mb-2 animate-bounce-slow print:hidden">
            <CheckCircle size={72} />
          </div>
          <div className="hidden print:flex flex-col items-center justify-center mb-4">
            <img src="/logo.jpg" alt="GK Food Flow" className="h-16 w-auto object-contain rounded-full mb-2" />
            <span className="font-bold text-2xl text-black">GK Food Flow</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center print:text-black print:text-xl print:mb-0">Order Confirmed!</h1>
          <p className="text-gray-400 text-lg mb-4 text-center print:text-black print:text-sm print:mb-1">
            Thank you for your purchase.<br />
            Order <span className="text-primary font-bold print:text-black">#{orderId}</span>
          </p>

          {/* Bill Section */}
          {orderData && (
            <div className="glass-panel p-8 w-full print:bg-white print:border-none print:shadow-none print:text-black print:p-0 print:text-xs">
              <div className="flex flex-col mb-6 border-b border-white/10 pb-4 print:mb-2 print:pb-2 print:border-black">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white print:text-black print:text-lg">Official Bill</h2>
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors print:hidden"
                  >
                    <Printer size={18} /> Print Bill
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6 print:space-y-1 print:mb-2">
                {orderData.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-2 print:pb-1 print:border-gray-300">
                    <div>
                      <span className="font-bold print:text-black">{item.title}</span>
                      <span className="text-gray-400 text-sm ml-2 print:text-gray-600 print:text-xs">x{item.quantity}</span>
                    </div>
                    <span className="font-medium print:text-black">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-gray-300 print:text-black print:space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{orderData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 print:pt-2 border-t border-white/10 font-bold text-xl print:text-base text-white print:border-black print:text-black">
                  <span>Grand Total</span>
                  <span className="text-primary print:text-black">₹{orderData.grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="text-center text-sm text-gray-500 mt-6 print:mt-4 print:text-xs print:text-gray-600">
                Date: {orderData.date}
              </div>
            </div>
          )}

          {/* Rating Section - Hidden in Print */}
          <div className="glass-panel p-8 w-full mt-4 flex flex-col items-center print:hidden">
            <h3 className="text-2xl font-bold text-white mb-2">How was your experience?</h3>
            <p className="text-gray-400 mb-6 text-sm">Please rate our ordering process</p>
            
            <div className="flex gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star 
                    size={40} 
                    className={`transition-colors duration-200 ${
                      star <= (hoverRating || rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-600'
                    }`} 
                  />
                </button>
              ))}
            </div>

            <button 
              onClick={submitRating}
              disabled={rating === 0}
              className={`btn-primary px-10 py-3 text-lg transition-all duration-300 ${rating === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              Submit Feedback
            </button>
          </div>
        </>
      ) : (
        <div className="glass-panel p-10 w-full flex flex-col items-center text-center animate-fade-in mt-10 print:hidden">
          <div className="text-yellow-400 mb-4">
            <Star size={64} className="fill-yellow-400 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-gray-300 text-lg mb-8">
            We appreciate your feedback. It helps us serve you better!
          </p>
          <Link to="/menu" className="btn-secondary px-8 py-3 flex items-center gap-2 text-lg hover:scale-105 transition-transform">
            Return to Menu <ArrowRight size={20} />
          </Link>
        </div>
      )}

    </div>
  );
};

export default ThankYou;
