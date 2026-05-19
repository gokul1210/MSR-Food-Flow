import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="glass-panel rounded-none border-b-0 border-l-0 border-r-0 border-t border-white/10 mt-12 py-8 print:hidden">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} MRS Food Flow. All rights reserved.</p>
        <p className="mt-2 text-sm">Developed by Madan C | <Link to="/admin" className="hover:text-white transition-colors">Admin Login</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
