import openSocket from 'socket.io-client';
// start the client socket
// ONCTION ENERGY Server
const socket = openSocket('https://178.18.250.74:443', {
    transports: ['websocket'],
    secure: true,
    // rejectUnauthorized: true,
    reconnect: true,
    // auth: {
    //     token: localStorage.getItem('token')
    // }
});

export default socket;
