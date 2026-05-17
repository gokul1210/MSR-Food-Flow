const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodflow_billing')
    .then(() => console.log('Billing Service connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const billSchema = new mongoose.Schema({
    userId: String,
    subtotal: Number,
    tax: Number,
    deliveryFee: Number,
    total: Number,
    paymentMethod: String,
    paymentStatus: { type: String, default: 'Pending' }
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema);

app.post('/calculate', (req, res) => {
    const { items } = req.body; // array of { price, quantity }
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% GST
    const deliveryFee = subtotal > 500 ? 0 : 40;
    const total = subtotal + tax + deliveryFee;
    
    res.json({ subtotal, tax, deliveryFee, total });
});

// Mock Payment
app.post('/pay', async (req, res) => {
    try {
        const { userId, subtotal, tax, deliveryFee, total, paymentMethod } = req.body;
        
        // Mock payment processing logic...
        const paymentSuccess = true; // Simulated successful payment
        
        const bill = new Bill({
            userId, subtotal, tax, deliveryFee, total, paymentMethod,
            paymentStatus: paymentSuccess ? 'Success' : 'Failed'
        });
        
        await bill.save();
        res.json({ success: paymentSuccess, billId: bill._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Billing Service running on port ${PORT}`));
