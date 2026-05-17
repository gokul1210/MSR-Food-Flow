const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5007;

app.use(cors());
app.use(express.json());

// In a real scenario, this service would securely query other DBs or a data warehouse.
// We'll mock the analytics for the prototype dashboard.
app.get('/analytics', (req, res) => {
    res.json({
        totalUsers: 1450,
        totalOrders: 3240,
        revenue: 125000,
        activeOrders: 12,
        topSellingItems: ['Chicken Biryani', 'Butter Chicken', 'Masala Dosa']
    });
});

app.get('/', (req, res) => res.send('Admin Service is running'));

app.listen(PORT, () => console.log(`Admin Service running on port ${PORT}`));
