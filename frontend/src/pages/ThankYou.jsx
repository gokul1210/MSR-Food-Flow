import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';

const ThankYou = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // If accessed directly without an order, optionally redirect to home
  // But for now, we'll just allow it to render a generic thank you.
  const orderId = location.state?.orderId || Math.floor(100000 + Math.random() * 900000);

  const handleRating = (value) => {
    setRating(value);
  };

  const submitRating = () => {
    if (rating > 0) {
      setSubmitted(true);
      // In a real app, send rating to backend here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 animate-fade-in max-w-2xl mx-auto px-4">
      
      {!submitted ? (
        <>
          <div className="bg-green-500/20 p-6 rounded-full text-green-500 mb-2 animate-bounce-slow">
            <CheckCircle size={72} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Order Confirmed!</h1>
          <p className="text-gray-400 text-lg mb-8">
            Thank you for your purchase. Your delicious food is being prepared.<br />
            Order <span className="text-primary font-bold">#{orderId}</span>
          </p>

          <div className="glass-panel p-8 w-full mt-4 flex flex-col items-center">
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
        <div className="glass-panel p-10 w-full flex flex-col items-center text-center animate-fade-in mt-10">
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
