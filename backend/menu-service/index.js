const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

// Sample static menu data (you can replace with DB integration later)
const menuItems = [
  {
    id: 101,
    title: 'Idli',
    category: 'Breakfast',
    price: 40,
    isVeg: true,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&q=80',
  },
  {
    id: 102,
    title: 'Dosa',
    category: 'Breakfast',
    price: 60,
    isVeg: true,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&q=80',
  },
  {
    id: 201,
    title: 'Chicken Biryani',
    category: 'Lunch',
    price: 350,
    isVeg: false,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&q=80',
  },
  {
    id: 202,
    title: 'Mutton Biryani',
    category: 'Lunch',
    price: 500,
    isVeg: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&q=80',
  },
  {
    id: 301,
    title: 'Noodles',
    category: 'Dinner',
    price: 180,
    isVeg: true,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&q=80',
  },
];

// Endpoint to fetch all menu items
app.get('/menu', (req, res) => {
  res.json(menuItems);
});

app.listen(PORT, () => {
  console.log(`Menu Service running on port ${PORT}`);
});
