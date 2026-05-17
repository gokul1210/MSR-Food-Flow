const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodflow_cart')
    .then(() => console.log('Cart Service connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    items: [{
        productId: String,
        title: String,
        price: Number,
        quantity: { type: Number, default: 1 }
    }],
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

app.get('/:userId', async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) cart = await Cart.create({ userId: req.params.userId, items: [] });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/add', async (req, res) => {
    try {
        const { userId, productId, title, price, quantity } = req.body;
        let cart = await Cart.findOne({ userId });
        if (!cart) cart = new Cart({ userId, items: [] });

        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity || 1;
        } else {
            cart.items.push({ productId, title, price, quantity: quantity || 1 });
        }
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/clear/:userId', async (req, res) => {
    try {
        await Cart.findOneAndUpdate({ userId: req.params.userId }, { items: [] });
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Cart Service running on port ${PORT}`));
