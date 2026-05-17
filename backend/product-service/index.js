const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodflow_products')
    .then(() => console.log('Product Service connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    image: String,
    price: { type: Number, required: true },
    category: String,
    isVeg: { type: Boolean, required: true },
    stock: { type: Number, default: 100 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/category/:name', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.name });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/seed', async (req, res) => {
    try {
        const mockProducts = [
          { title: 'Idli Sambar', category: 'Breakfast', price: 80, isVeg: true, description: 'Steamed rice cakes served with lentil soup and chutney.', image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
          { title: 'Masala Dosa', category: 'Breakfast', price: 120, isVeg: true, description: 'Crispy crepe stuffed with spiced potato filling.', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
          { title: 'Premium Veg Thali', category: 'Lunch', price: 250, isVeg: true, description: 'A complete meal with 3 curries, dal, rice, roti, and sweet.', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
          { title: 'Chicken Biryani', category: 'Lunch', price: 300, isVeg: false, description: 'Aromatic basmati rice cooked with tender chicken and authentic spices.', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }
        ];
        await Product.deleteMany();
        await Product.insertMany(mockProducts);
        res.json({ message: 'Database seeded successfully', count: mockProducts.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
