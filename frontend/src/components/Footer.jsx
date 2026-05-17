const Footer = () => {
  return (
    <footer className="glass-panel rounded-none border-b-0 border-l-0 border-r-0 border-t border-white/10 mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} GK Food Flow. All rights reserved.</p>
        <p className="mt-2 text-sm">Developed by Gokul S.</p>
      </div>
    </footer>
  );
};

export default Footer;
