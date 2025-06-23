import openSocket from 'socket.io-client';
// start the client socket
// ONCTION ENERGY Server
const socket = openSocket('https://178.18.250.74', {
    secure: true,
    transports: ['websocket'],    
    rejectUnauthorized: false,
    reconnect: true,
    // auth: {
    //     token: localStorage.getItem('token')
    // }
});

socket.on('connect_error', (err) => {
  console.error('❌ Connection error:', err.message);
});

export default socket;
