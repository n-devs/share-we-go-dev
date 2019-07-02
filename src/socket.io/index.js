
const server = require('http').createServer();
const io = require('socket.io')(server, {
  serveClient: true,
  wsEngine: 'ws' // uws is not supported since it is a native module
});
const port = process.env.PORT || 9000;

io.on('connect', onConnect);
server.listen(port, () => console.log('server listening on port ' + port));

function onConnect(socket) {
  console.log('connect ' + socket.id);

  // goelocation
  socket.on('position', (position) => {
    console.log(position);
    
    socket.emit('otherPositions', position);
  })
  socket.on('disconnect', () => console.log('disconnect ' + socket.id));
}
