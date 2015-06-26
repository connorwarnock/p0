// this is a simple example of how to consume the socket.io endpoint
// for large js applications, you'll want to use a js framework to
// manage complexity
$(function() {
  var $plants = $('#plants');
  $.ajax({
    url: '/plants',
    dataType: 'json',
    success: renderPlants
  });

  function renderPlants(data) {
    for (var i = 0, len = data.results.length; i < len; i++) {
      renderPlant(data.results[i]);
    }
  };

  function renderPlant(data) {
    var $plantView = $('<div class="plant"><p><span class="name"></span>: <span class="data"></span></p></div>');
    $plantView.find('.name').html(data.name);

    $plants.append($plantView);
    var socket = io('http://localhost:3000/plants:' + data.id);
    socket.on('connect', function() {
      console.log('Connected to socket for plant ' + data.id);
    });
    socket.on('moisture', function (data) {
      $plantView.find('.data').html(data.moisture);
    });
  };
});
