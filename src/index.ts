import express from 'express';
import { Socket, Server } from 'socket.io';

const app = express();

const server = app.listen(3000, () => {
    console.log('Server started on port 3000');
});

const io = new Server(server);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket: Socket) => {
    socket.emit('success', 1);
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});