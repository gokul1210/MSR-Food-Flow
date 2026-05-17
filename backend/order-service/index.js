const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodflow_orders')
    .then(() => console.log('Order Service connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: Array,
    totalAmount: Number,
    billId: String,
    deliveryAddress: String,
    status: { type: String, default: 'Order Confirmed' } // Confirmed -> Preparing -> Out for Delivery -> Delivered
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

app.post('/', async (req, res) => {
    try {
        const { userId, items, totalAmount, billId, deliveryAddress } = req.body;
        const newOrder = new Order({ userId, items, totalAmount, billId, deliveryAddress });
        await newOrder.save();
        
        // Simulate Order State Machine (auto update status for prototype)
        setTimeout(() => {
            Order.findByIdAndUpdate(newOrder._id, { status: 'Preparing' }).exec();
        }, 10000); 
        
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
