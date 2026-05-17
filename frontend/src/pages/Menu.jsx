import { useState, useEffect } from 'react';
import { ShoppingBag, Leaf, Drumstick, Star, Heart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const images = {
  "Idli": "images/idli.jpg",
  "Dosa": "images/dosa.jpg",
  "Masala Dosa": "images/Masala Dosa.jpg",
  "Pongal": "images/pongal.jpg",
  "Poori Masala": "images/Poori Masala.jpg",
  "Vada": "images/vada.jpg",
  "Upma": "images/upma.jpg",
  "Appam": "images/appam.jpg",
  "Paratha": "images/paratha.jpg",
  "Chole Bhature": "images/chole bhature.jpg",
  "Filter Coffee": "images/Filter Coffee.jpg",
  "Masala Tea": "images/Masala Tea.jpg",
  "Chicken Biryani": "images/Chicken Biryani.jpg",
  "Mutton Biryani": "images/Mutton Biryani.jpg",
  "Veg Meals": "images/Veg Meals.jpg",
  "South Indian Meals": "images/South Indian Meals.jpg",
  "Butter Chicken": "images/Butter Chicken.jpg",
  "Paneer Butter Masala": "images/Paneer Butter Masala.jpg",
  "Dal Makhani": "images/Dal Makhani.jpg",
  "Fish Curry Meals": "images/Fish Curry Meals.jpg",
  "Fried Rice": "images/Fried Rice.jpg",
  "Naan & Curry Combos": "images/Naan & Curry Combos.jpg",
  "Tandoori Chicken": "images/Tandoori Chicken.jpg",
  "Grill Chicken": "images/Grill Chicken.jpg",
  "Kadai Paneer": "images/Kadai Paneer.jpg",
  "Chicken Tikka": "images/Chicken Tikka.jpg",
  "Parotta with Salna": "images/Parotta with Salna.jpg",
  "Chilli Chicken": "images/Chilli Chicken.jpg",
  "Noodles": "images/Noodles.jpg",
  "Gobi Manchurian": "images/Gobi Manchurian.jpg",
  "BBQ Combo Meals": "images/BBQ Combo Meals.jpg",
  "Samosa": "images/Samosa.jpg",
  "Pani Puri": "images/Pani Puri.jpg",
  "Vada Pav": "images/Vada Pav.jpg",
  "Pakoda": "images/Pakoda.jpg",
  "Cutlet": "images/Cutlet.jpg",
  "French Fries": "images/French Fries.jpg",
  "Spring Roll": "images/Spring Roll.jpg",
  "Gulab Jamun": "images/Gulab Jamun.jpg",
  "Rasmalai": "images/Rasmalai.jpg",
  "Jalebi": "images/Jalebi.jpg",
  "Chocolate Cake": "images/Chocolate Cake.jpg",
  "Ice Cream": "images/Ice Cream.jpg",
  "Falooda": "images/Falooda.jpg",
  "Tea": "images/tea.jpg",
  "Rose Milk": "images/Rose Milk.jpg",
  "Lassi": "images/Lassi.jpg",
  "Mango Juice": "images/Mango Juice.jpg",
  "Oreo Shake": "images/Oreo Shake.jpg",
  "Fresh Lime Soda": "images/Fresh Lime Soda.jpg"
};

const mockProducts = [
  // BREAKFAST
  { id: 101, title: 'Idli', category: 'Breakfast', price: 40, isVeg: true, rating: 4.5, image: images['Idli'] },
  { id: 102, title: 'Dosa', category: 'Breakfast', price: 60, isVeg: true, rating: 4.6, image: images['Dosa'] },
  { id: 103, title: 'Masala Dosa', category: 'Breakfast', price: 90, isVeg: true, rating: 4.8, image: images['Masala Dosa'] },
  { id: 104, title: 'Pongal', category: 'Breakfast', price: 70, isVeg: true, rating: 4.4, image: images['Pongal'] },
  { id: 105, title: 'Poori Masala', category: 'Breakfast', price: 80, isVeg: true, rating: 4.7, image: images['Poori Masala'] },
  { id: 106, title: 'Vada', category: 'Breakfast', price: 30, isVeg: true, rating: 4.5, image: images['Vada'] },
  { id: 107, title: 'Upma', category: 'Breakfast', price: 50, isVeg: true, rating: 4.1, image: images['Upma'] },
  { id: 108, title: 'Appam', category: 'Breakfast', price: 60, isVeg: true, rating: 4.6, image: images['Appam'] },
  { id: 109, title: 'Paratha', category: 'Breakfast', price: 50, isVeg: true, rating: 4.5, image: images['Paratha'] },
  { id: 110, title: 'Chole Bhature', category: 'Breakfast', price: 120, isVeg: true, rating: 4.9, image: images['Chole Bhature'] },
  { id: 111, title: 'Filter Coffee', category: 'Breakfast', price: 40, isVeg: true, rating: 4.9, image: images['Filter Coffee'] },
  { id: 112, title: 'Masala Tea', category: 'Breakfast', price: 30, isVeg: true, rating: 4.7, image: images['Masala Tea'] },

  // LUNCH
  { id: 201, title: 'Chicken Biryani', category: 'Lunch', price: 250, isVeg: false, rating: 4.9, image: images['Chicken Biryani'] },
  { id: 202, title: 'Mutton Biryani', category: 'Lunch', price: 350, isVeg: false, rating: 4.8, image: images['Mutton Biryani'] },
  { id: 203, title: 'Veg Meals', category: 'Lunch', price: 150, isVeg: true, rating: 4.5, image: images['Veg Meals'] },
  { id: 204, title: 'South Indian Meals', category: 'Lunch', price: 180, isVeg: true, rating: 4.7, image: images['South Indian Meals'] },
  { id: 205, title: 'Butter Chicken', category: 'Lunch', price: 300, isVeg: false, rating: 4.9, image: images['Butter Chicken'] },
  { id: 206, title: 'Paneer Butter Masala', category: 'Lunch', price: 240, isVeg: true, rating: 4.8, image: images['Paneer Butter Masala'] },
  { id: 207, title: 'Dal Makhani', category: 'Lunch', price: 200, isVeg: true, rating: 4.6, image: images['Dal Makhani'] },
  { id: 208, title: 'Fish Curry Meals', category: 'Lunch', price: 280, isVeg: false, rating: 4.7, image: images['Fish Curry Meals'] },
  { id: 209, title: 'Fried Rice', category: 'Lunch', price: 180, isVeg: true, rating: 4.4, image: images['Fried Rice'] },
  { id: 210, title: 'Naan & Curry Combos', category: 'Lunch', price: 220, isVeg: true, rating: 4.5, image: images['Naan & Curry Combos'] },

  // DINNER
  
  { id: 307, title: 'Noodles', category: 'Dinner', price: 180, isVeg: true, rating: 4.3, image: images['Noodles'] },
  { id: 308, title: 'Gobi Manchurian', category: 'Dinner', price: 190, isVeg: true, rating: 4.5, image: images['Gobi Manchurian'] },
  { id: 309, title: 'BBQ Combo Meals', category: 'Dinner', price: 450, isVeg: false, rating: 4.8, image: images['BBQ Combo Meals'] },
  { id: 101, title: 'Idli', category: 'Dinner', price: 40, isVeg: true, rating: 4.5, image: images['Idli'] },
  { id: 102, title: 'Dosa', category: 'Dinner', price: 60, isVeg: true, rating: 4.6, image: images['Dosa'] },
  { id: 103, title: 'Masala Dosa', category: 'Dinner', price: 90, isVeg: true, rating: 4.8, image: images['Masala Dosa'] },
  { id: 301, title: 'Tandoori Chicken', category: 'Dinner', price: 350, isVeg: false, rating: 4.9, image: images['Tandoori Chicken'] },
  { id: 302, title: 'Grill Chicken', category: 'Dinner', price: 340, isVeg: false, rating: 4.7, image: images['Grill Chicken'] },
  { id: 303, title: 'Kadai Paneer', category: 'Dinner', price: 250, isVeg: true, rating: 4.6, image: images['Kadai Paneer'] },
  { id: 304, title: 'Chicken Tikka', category: 'Dinner', price: 280, isVeg: false, rating: 4.8, image: images['Chicken Tikka'] },
  { id: 305, title: 'Parotta with Salna', category: 'Dinner', price: 150, isVeg: true, rating: 4.7, image: images['Parotta with Salna'] },
  { id: 306, title: 'Chilli Chicken', category: 'Dinner', price: 220, isVeg: false, rating: 4.6, image: images['Chilli Chicken'] },
  { id: 104, title: 'Pongal', category: 'Dinner', price: 70, isVeg: true, rating: 4.4, image: images['Pongal'] },
  { id: 105, title: 'Poori Masala', category: 'Dinner', price: 80, isVeg: true, rating: 4.7, image: images['Poori Masala'] },
  { id: 106, title: 'Vada', category: 'Dinner', price: 30, isVeg: true, rating: 4.5, image: images['Vada'] },
  { id: 107, title: 'Upma', category: 'Dinner', price: 50, isVeg: true, rating: 4.1, image: images['Upma'] },
  { id: 108, title: 'Appam', category: 'Dinner', price: 60, isVeg: true, rating: 4.6, image: images['Appam'] },
  { id: 109, title: 'Paratha', category: 'Dinner', price: 50, isVeg: true, rating: 4.5, image: images['Paratha'] },
  { id: 110, title: 'Chole Bhature', category: 'Dinner', price: 120, isVeg: true, rating: 4.9, image: images['Chole Bhature'] },
  { id: 111, title: 'Filter Coffee', category: 'Dinner', price: 40, isVeg: true, rating: 4.9, image: images['Filter Coffee'] },
  { id: 112, title: 'Masala Tea', category: 'Dinner', price: 30, isVeg: true, rating: 4.7, image: images['Masala Tea'] },

  // SNACKS
  { id: 401, title: 'Samosa', category: 'Snacks', price: 40, isVeg: true, rating: 4.8, image: images['Samosa'] },
  { id: 402, title: 'Pani Puri', category: 'Snacks', price: 50, isVeg: true, rating: 4.9, image: images['Pani Puri'] },
  { id: 403, title: 'Vada Pav', category: 'Snacks', price: 45, isVeg: true, rating: 4.7, image: images['Vada Pav'] },
  { id: 404, title: 'Pakoda', category: 'Snacks', price: 60, isVeg: true, rating: 4.5, image: images['Pakoda'] },
  { id: 405, title: 'Cutlet', category: 'Snacks', price: 70, isVeg: true, rating: 4.4, image: images['Cutlet'] },
  { id: 406, title: 'French Fries', category: 'Snacks', price: 90, isVeg: true, rating: 4.3, image: images['French Fries'] },
  { id: 407, title: 'Spring Roll', category: 'Snacks', price: 110, isVeg: true, rating: 4.5, image: images['Spring Roll'] },

  // DESSERTS
  { id: 501, title: 'Gulab Jamun', category: 'Dessert', price: 80, isVeg: true, rating: 4.9, image: images['Gulab Jamun'] },
  { id: 502, title: 'Rasmalai', category: 'Dessert', price: 100, isVeg: true, rating: 4.9, image: images['Rasmalai'] },
  { id: 503, title: 'Jalebi', category: 'Dessert', price: 70, isVeg: true, rating: 4.7, image: images['Jalebi'] },
  { id: 504, title: 'Chocolate Cake', category: 'Dessert', price: 150, isVeg: true, rating: 4.8, image: images['Chocolate Cake'] },
  { id: 505, title: 'Ice Cream', category: 'Dessert', price: 120, isVeg: true, rating: 4.6, image: images['Ice Cream'] },
  { id: 506, title: 'Falooda', category: 'Dessert', price: 160, isVeg: true, rating: 4.8, image: images['Falooda'] },

  // BEVERAGES
  { id: 601, title: 'Filter Coffee', category: 'Beverages', price: 50, isVeg: true, rating: 4.9, image: images['Filter Coffee'] },
  { id: 602, title: 'Tea', category: 'Beverages', price: 30, isVeg: true, rating: 4.7, image: images['Tea'] },
  { id: 603, title: 'Rose Milk', category: 'Beverages', price: 60, isVeg: true, rating: 4.8, image: images['Rose Milk'] },
  { id: 604, title: 'Lassi', category: 'Beverages', price: 80, isVeg: true, rating: 4.7, image: images['Lassi'] },
  { id: 605, title: 'Mango Juice', category: 'Beverages', price: 90, isVeg: true, rating: 4.6, image: images['Mango Juice'] },
  { id: 606, title: 'Oreo Shake', category: 'Beverages', price: 120, isVeg: true, rating: 4.8, image: images['Oreo Shake'] },
  { id: 607, title: 'Fresh Lime Soda', category: 'Beverages', price: 50, isVeg: true, rating: 4.5, image: images['Fresh Lime Soda'] },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(mockProducts);

  useEffect(() => {
    // Check if menu is in localStorage
    const savedMenu = localStorage.getItem('foodflow_menu');
    if (savedMenu) {
      setProducts(JSON.parse(savedMenu));
    } else {
      // Initialize with default mockProducts
      localStorage.setItem('foodflow_menu', JSON.stringify(mockProducts));
    }
  }, []);

  const { addToCart } = useCart();

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert', 'Beverages'];

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredProducts = products.filter(p => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchVeg = vegOnly ? p.isVeg : true;
    return matchCategory && matchSearch && matchVeg;
  });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="mb-10 border-b border-white/10 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Our Grand Menu</h1>
            <p className="text-gray-400">Experience the finest authentic Indian cuisine.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search food..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on search
                  if (e.target.value !== '') {
                    setActiveCategory('All');
                  }
                }}
                className="bg-white/5 border border-white/10 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary w-full sm:w-64 transition-colors"
              />
            </div>

            {/* Veg Toggle */}
            <button
              onClick={() => { setVegOnly(!vegOnly); setCurrentPage(1); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${vegOnly ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-white/5 border-white/10 text-gray-300'
                }`}
            >
              <Leaf size={18} />
              {vegOnly ? 'Veg Only' : 'Veg / Non-Veg'}
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              className={`text-sm py-2 px-4 transition-colors duration-200 border border-white/10 shadow-sm ${activeCategory === cat
                ? 'bg-primary text-white font-bold rounded-lg border-primary shadow-primary/20'
                : 'bg-card text-gray-300 hover:bg-white/10 rounded-lg'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-400 py-16 glass-panel flex flex-col items-center">
          <Search size={48} className="text-gray-600 mb-4" />
          <p className="text-xl">No items found matching your criteria.</p>
          <button onClick={() => { setSearchQuery(''); setVegOnly(false); setActiveCategory('All'); setCurrentPage(1); }} className="mt-4 text-primary underline">Clear filters</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {currentProducts.map((product) => (
              <div key={product.id} className="glass-panel rounded-xl overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-white/5 hover:border-white/20">
                {/* Image Section */}
                <div className="w-full h-48 bg-gray-800 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&q=80'; }}
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    {product.rating}
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <div className="bg-card/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg">
                      {product.isVeg ? (
                        <Leaf size={16} className="text-green-500" />
                      ) : (
                        <Drumstick size={16} className="text-red-500" />
                      )}
                    </div>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="bg-card/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <Heart size={16} className={wishlist.includes(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"} />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-white leading-tight pr-2">{product.title}</h3>
                  </div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider mb-4">{product.category}</span>

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-xl font-bold text-accent">₹{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-primary/90 hover:bg-primary text-white p-2 rounded-lg transition-colors duration-200 flex items-center shadow-lg shadow-primary/20 hover:shadow-primary/40"
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pb-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === 1 ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
              >
                Previous
              </button>
              <span className="text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPage === totalPages ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Menu;
