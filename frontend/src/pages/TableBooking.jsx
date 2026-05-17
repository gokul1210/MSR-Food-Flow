import { useState, useEffect } from 'react';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';

const TableBooking = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: ''
  });
  
  const [selectedTable, setSelectedTable] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [recentBookings, setRecentBookings] = useState([]);
  const [bookedTables, setBookedTables] = useState([]);

  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('foodflow_reservations')) || [];
    setRecentBookings(saved.reverse().slice(0, 5));
    
    // Extract table IDs from all active reservations to mark them as booked
    const bookedIds = saved.map(res => parseInt(res.tableId)).filter(id => !isNaN(id));
    setBookedTables(bookedIds);
  }, [isBooked]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTableSelect = (tableNum) => {
    if (!bookedTables.includes(tableNum)) {
      setSelectedTable(tableNum);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTable) {
      alert("Please select a table from the floor plan.");
      return;
    }

    const newReservation = {
      ...formData,
      tableId: selectedTable,
      id: Math.floor(1000 + Math.random() * 9000),
      status: 'Confirmed',
      timestamp: new Date().toLocaleString()
    };
    
    const existingReservations = JSON.parse(localStorage.getItem('foodflow_reservations')) || [];
    localStorage.setItem('foodflow_reservations', JSON.stringify([...existingReservations, newReservation]));
    
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 animate-fade-in max-w-2xl mx-auto px-4">
        <div className="bg-green-500/20 p-6 rounded-full text-green-500 mb-2 animate-bounce-slow">
          <CheckCircle size={72} />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Reservation Confirmed!</h1>
        <p className="text-gray-400 text-lg mb-8">
          Thank you, {formData.name}. Table {selectedTable} for {formData.guests} has been booked for {formData.date} at {formData.time}.
        </p>
        <button 
          onClick={() => {
            setIsBooked(false);
            setSelectedTable(null);
          }} 
          className="btn-primary px-8 py-3 bg-gradient-to-r from-[#eab308] to-[#f97316] text-black border-none hover:scale-105 transition-transform"
        >
          Make Another Booking
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
          Reserve a <span className="text-[#eab308]">Table</span>
        </h1>
        <div className="w-16 h-1 bg-[#eab308] mx-auto mb-4"></div>
        <p className="text-gray-400 max-w-2xl mx-auto">Secure your spot for an unforgettable dining experience.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Reservation Details */}
        <div className="glass-panel p-8 flex-1 bg-[#15161a] border-[#2a2d36] rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 font-serif">Reservation Details</h2>
          <div className="w-full h-[1px] bg-[#2a2d36] mb-8"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-[#1e2128] border border-[#2a2d36] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#eab308] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Time</label>
                <input 
                  type="time" 
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-[#1e2128] border border-[#2a2d36] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#eab308] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Number of Guests</label>
              <select 
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full bg-[#1e2128] border border-[#2a2d36] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#eab308] transition-colors appearance-none"
              >
                <option value="" disabled>Select guests</option>
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-[#1e2128] border border-[#2a2d36] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#eab308] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91..."
                  className="w-full bg-[#1e2128] border border-[#2a2d36] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#eab308] transition-colors"
                />
              </div>
            </div>

            {/* Selected Table Display */}
            <div className="bg-[#101215] border border-[#2a2d36] p-4 rounded-lg mt-4 flex flex-col items-start justify-center min-h-[80px]">
              <span className="text-gray-400 text-sm mb-1">Selected Table:</span>
              {selectedTable ? (
                <span className="text-white font-bold text-lg">
                  <span className="text-[#eab308]">Table {selectedTable}</span> <span className="text-sm text-gray-500 font-normal">(4 Seats)</span>
                </span>
              ) : (
                <span className="text-gray-600 italic">None selected</span>
              )}
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full py-4 text-black font-bold text-lg rounded-full bg-gradient-to-r from-[#eab308] to-[#f97316] hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              >
                Confirm Reservation
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Floor Plan */}
        <div className="glass-panel p-8 flex-1 bg-[#15161a] border-[#2a2d36] rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 font-serif">Floor Plan</h2>
          <div className="w-full h-[1px] bg-[#2a2d36] mb-6"></div>
          
          <div className="flex justify-center gap-6 mb-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-green-500"></div> Available
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-red-500"></div> Booked
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-[#eab308]"></div> Selected
            </div>
          </div>

          <div className="bg-[#0a0b0d] border border-[#2a2d36] rounded-xl p-8 relative flex flex-col items-center min-h-[400px]">
            {/* Entrance */}
            <div className="bg-[#2a3040] text-gray-300 px-6 py-2 rounded mb-10 text-xs font-bold tracking-widest uppercase">
              Entrance
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-3 gap-x-12 gap-y-10 w-full max-w-sm mx-auto mb-10 pl-8">
              {tables.map(table => {
                const isBookedTable = bookedTables.includes(table);
                const isSelected = selectedTable === table;
                
                let ringColor = 'border-green-600';
                if (isBookedTable) ringColor = 'border-red-800 opacity-50';
                if (isSelected) ringColor = 'border-[#eab308] shadow-[0_0_15px_rgba(234,179,8,0.4)]';

                return (
                  <button
                    key={table}
                    type="button"
                    onClick={() => handleTableSelect(table)}
                    disabled={isBookedTable}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-white transition-all duration-300 hover:scale-110 ${ringColor} ${isBookedTable ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {table}
                  </button>
                )
              })}
            </div>

            {/* Bar Area */}
            <div className="mt-auto bg-[#2a3040] text-gray-300 px-10 py-3 rounded text-xs font-bold tracking-widest uppercase">
              Bar Area
            </div>
          </div>
        </div>

      </div>

      {recentBookings.length > 0 && (
        <div className="mt-12 glass-panel p-6 animate-fade-in bg-[#15161a] border-[#2a2d36] rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4">Recent Bookings Feed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-start gap-4 hover:border-[#eab308]/50 transition-colors">
                <div className="bg-[#eab308]/20 p-2 rounded-full text-[#eab308]">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">{booking.name}</p>
                  <p className="text-gray-400 text-sm">{booking.date} at {booking.time}</p>
                  <p className="text-[#eab308] text-xs mt-1">Table {booking.tableId} • {booking.guests} Guests</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableBooking;
