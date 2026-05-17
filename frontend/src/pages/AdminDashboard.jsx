import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, ShoppingBag, TrendingUp, Settings, Trash2, Edit, Utensils, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // New Item Form State
  const [newItem, setNewItem] = useState({
    title: '', category: 'Breakfast', price: '', isVeg: true, image: ''
  });

  useEffect(() => {
    const savedRes = JSON.parse(localStorage.getItem('foodflow_reservations')) || [];
    setReservations(savedRes.reverse());
    
    const savedMenu = JSON.parse(localStorage.getItem('foodflow_menu')) || [];
    setMenuItems(savedMenu);

    const savedOrders = JSON.parse(localStorage.getItem('foodflow_orders')) || [];
    setOrders(savedOrders.reverse());
  }, []);

  const handleDeleteItem = (id) => {
    const updatedMenu = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedMenu);
    localStorage.setItem('foodflow_menu', JSON.stringify(updatedMenu));
  };

  const handleCancelReservation = (id) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      const updatedReservations = reservations.filter(res => res.id !== id);
      setReservations(updatedReservations);
      // We must reverse it back before saving because our state is stored reversed
      localStorage.setItem('foodflow_reservations', JSON.stringify([...updatedReservations].reverse()));
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const itemToAdd = {
      ...newItem,
      id: Math.floor(1000 + Math.random() * 9000),
      price: Number(newItem.price),
      rating: 4.5, // default rating
      image: newItem.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'
    };
    const updatedMenu = [itemToAdd, ...menuItems];
    setMenuItems(updatedMenu);
    localStorage.setItem('foodflow_menu', JSON.stringify(updatedMenu));
    setNewItem({ title: '', category: 'Breakfast', price: '', isVeg: true, image: '' });
  };

  // Calculate real stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.grandTotal, 0);

  const stats = [
    { title: 'Total Orders', value: orders.length.toString(), icon: <ShoppingBag className="text-blue-500" /> },
    { title: 'Total Revenue', value: `₹${totalRevenue.toFixed(0)}`, icon: <TrendingUp className="text-green-500" /> },
    { title: 'Reservations', value: reservations.length.toString(), icon: <Users className="text-purple-500" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] w-full max-w-7xl mx-auto px-4 mt-8 gap-6 animate-fade-in">
      {/* Sidebar */}
      <div className="w-full md:w-64 glass-panel p-4 h-fit">
        <h2 className="text-2xl font-bold text-white mb-6 pl-4 border-l-4 border-primary">Admin Panel</h2>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-primary/20 text-primary font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'menu' ? 'bg-primary/20 text-primary font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Utensils size={18} /> Manage Menu
          </button>
          <button 
            onClick={() => setActiveTab('reservations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'reservations' ? 'bg-primary/20 text-primary font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Users size={18} /> Reservations
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-primary/20 text-primary font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-panel p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <div className="bg-white/10 p-4 rounded-full">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="py-3 px-4 font-medium">Order ID</th>
                      <th className="py-3 px-4 font-medium">Customer</th>
                      <th className="py-3 px-4 font-medium">Amount</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-6 text-center text-gray-400">No orders placed yet.</td>
                      </tr>
                    ) : (
                      orders.slice(0, 10).map((order) => (
                        <tr key={order.orderId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-white">#{order.orderId}</td>
                          <td className="py-3 px-4 text-gray-300">{order.date.split(',')[0]}</td>
                          <td className="py-3 px-4 text-white font-medium">₹{order.grandTotal.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">Confirmed</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div className="glass-panel p-6">
            <h3 className="text-xl font-bold text-white mb-4">Table Reservations</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="py-3 px-4 font-medium">ID</th>
                    <th className="py-3 px-4 font-medium">Name</th>
                    <th className="py-3 px-4 font-medium">Date & Time</th>
                    <th className="py-3 px-4 font-medium">Guests</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-gray-400">No reservations found.</td>
                    </tr>
                  ) : (
                    reservations.map((res) => (
                      <tr key={res.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-white">#{res.id}</td>
                        <td className="py-3 px-4 text-gray-300">{res.name}</td>
                        <td className="py-3 px-4 text-white font-medium">{res.date} at {res.time}</td>
                        <td className="py-3 px-4 text-gray-300">{res.guests}</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">{res.status}</span>
                        </td>
                        <td className="py-3 px-4">
                          <button 
                            onClick={() => handleCancelReservation(res.id)} 
                            className="text-red-500 hover:text-red-400 hover:bg-red-500/10 px-3 py-1 rounded transition-colors text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Manage Menu Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            {/* Add Item Form */}
            <div className="glass-panel p-6 border border-[#2a2d36] rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Plus size={20} className="text-[#eab308]" /> Add New Item</h3>
              <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input type="text" required value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} className="w-full bg-[#1e2128] border border-[#2a2d36] rounded-lg px-3 py-2 text-white focus:border-[#eab308] outline-none" placeholder="e.g. Masala Dosa" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full bg-[#1e2128] border border-[#2a2d36] rounded-lg px-3 py-2 text-white focus:border-[#eab308] outline-none">
                    <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snacks</option><option>Dessert</option><option>Beverages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Price (₹)</label>
                  <input type="number" required min="1" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} className="w-full bg-[#1e2128] border border-[#2a2d36] rounded-lg px-3 py-2 text-white focus:border-[#eab308] outline-none" placeholder="e.g. 150" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Type</label>
                  <select value={newItem.isVeg} onChange={e => setNewItem({...newItem, isVeg: e.target.value === 'true'})} className="w-full bg-[#1e2128] border border-[#2a2d36] rounded-lg px-3 py-2 text-white focus:border-[#eab308] outline-none">
                    <option value="true">Veg</option><option value="false">Non-Veg</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Image URL (Optional)</label>
                  <div className="flex gap-2">
                    <input type="text" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} className="w-full bg-[#1e2128] border border-[#2a2d36] rounded-lg px-3 py-2 text-white focus:border-[#eab308] outline-none" placeholder="https://..." />
                    <button type="submit" className="bg-[#eab308] text-black px-6 py-2 rounded-lg font-bold hover:bg-[#dca506] transition-colors whitespace-nowrap">
                      Add Item
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Current Menu List */}
            <div className="glass-panel p-6 border border-[#2a2d36] rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Current Menu ({menuItems.length} items)</h3>
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-[#15161a] z-10">
                    <tr className="border-b border-[#2a2d36] text-gray-400">
                      <th className="py-3 px-4 font-medium">Image</th>
                      <th className="py-3 px-4 font-medium">Title</th>
                      <th className="py-3 px-4 font-medium">Category</th>
                      <th className="py-3 px-4 font-medium">Price</th>
                      <th className="py-3 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item) => (
                      <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-2 px-4">
                          <img src={item.image} alt={item.title} className="w-10 h-10 rounded object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80'; }} />
                        </td>
                        <td className="py-3 px-4 text-white">{item.title} {item.isVeg ? <span className="text-green-500 text-xs ml-1">●</span> : <span className="text-red-500 text-xs ml-1">●</span>}</td>
                        <td className="py-3 px-4 text-gray-300">{item.category}</td>
                        <td className="py-3 px-4 text-[#eab308] font-medium">₹{item.price}</td>
                        <td className="py-3 px-4">
                          <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs can be expanded later */}
        {activeTab !== 'overview' && activeTab !== 'reservations' && activeTab !== 'menu' && (
          <div className="glass-panel p-10 flex flex-col items-center justify-center text-center min-h-[40vh]">
            <Settings size={48} className="text-gray-500 mb-4 animate-spin-slow" />
            <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
            <p className="text-gray-400">The {activeTab} management panel is currently under construction.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
