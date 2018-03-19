var socket = io.connect('http://localhost:8000', { 'forceNew': true });


function render(data) {
    var html = "<div>${data}</div>"
    
    document.getElementById('feed').innerHTML = html;
}

function buildGraphic(data) {
   
    console.log("accedí a la función!") // sanity check
    $.ajax('"http://127.0.0.1:8000/data/"', {
      data: {
        id_sensor: data.id_sensor
      }
    })
    then(
      function success(json) {
        console.log("Sucess")
    },

      function fail(data, status) {
        alert('Request failed.  Returned status of ' + status);
      }
    );

}

socket.on('new_data', function(data) {
  render(data);
  buildGraphic();
});