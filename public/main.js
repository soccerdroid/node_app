var socket = io.connect('http://localhost:3000', { 'forceNew': true });


function render(data) {
    //Do something
}

socket.on('new_data', function(data) {
  render(data);
});