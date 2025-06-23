import openSocket from 'socket.io-client';
// start the client socket
// ONCTION ENERGY Server
const socket = openSocket('http://178.18.250.74:3000', {
    transports: ['websocket'],
    // secure: true,
    // rejectUnauthorized: true,
    reconnect: true,
    // auth: {
    //     token: localStorage.getItem('token')
    // }
});

export default socket;
