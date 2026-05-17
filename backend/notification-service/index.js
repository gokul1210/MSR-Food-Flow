const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

const PORT = process.env.PORT || 5006;

io.on('connection', (socket) => {
    console.log('User connected to notifications:', socket.id);
    
    socket.on('join_order_room', (orderId) => {
        socket.join(orderId);
        console.log(`Socket ${socket.id} joined order room ${orderId}`);
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.post('/emit/:orderId', express.json(), (req, res) => {
    const { status, message } = req.body;
    io.to(req.params.orderId).emit('order_update', { status, message });
    res.json({ success: true, message: 'Notification emitted' });
});

app.get('/', (req, res) => res.send('Notification Service is running'));

server.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
