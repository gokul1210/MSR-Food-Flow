import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, Wifi, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
      <div className="glass-panel p-12 max-w-3xl">
        <div className="text-accent mb-4"><Rocket size={32} /></div>
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
          Fast, Fresh, and Delivered to You
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Experience the future of food delivery. Powered by a robust microservices architecture for real-time tracking and ultimate reliability.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/menu" className="btn-primary flex items-center gap-2 text-lg px-8 py-3">
            <span>Order Now</span>
            <ArrowRight size={20} />
          </Link>
          <Link to="/login" className="btn-secondary flex items-center gap-2 text-lg px-8 py-3">
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
