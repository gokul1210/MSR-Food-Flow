const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const routes = {
    '/api/users': 'http://localhost:5001',
    '/api/products': 'http://localhost:5002',
    '/api/cart': 'http://localhost:5003',
    '/api/billing': 'http://localhost:5004',
    '/api/orders': 'http://localhost:5005',
    '/api/notifications': 'http://localhost:5006',
    '/api/admin': 'http://localhost:5007',
};

for (const route in routes) {
    const target = routes[route];
    app.use(route, createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: '',
        },
    }));
}

app.get('/', (req, res) => res.send('API Gateway is running'));

app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
