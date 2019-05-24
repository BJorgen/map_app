const updatePointContainer = function(point){
  $('#point-container .title').text(point.title);
  $('#point-container .description').text(point.description);
  $('#point-container .img').attr("src",point.image_url);
}

const handleFlagClick = function(point){
  $.ajax(
    {
      url: '/maps/:map/points/'+point,
      method: 'GET',
      success: function (point) { updatePointContainer(point)},
      error: function (req, textStatus, errorThrown) {
        alert("you have left the happy path");
      }
    }
  );
}

const addPoint = function(point) {
  var contentString = point.description;
  //TODO delete unnecessary props from parker init
  var marker = new google.maps.Marker({
    position: {lng : Number(point.longitude), lat : Number(point.latitude)},
    draggable: false,
    icon: "https://img.icons8.com/doodle/30/000000/filled-flag.png",
    map: map,
    content: contentString
  });
  var infowindow = new google.maps.InfoWindow({
    content: `<div><button onclick=handleFlagClick(${point.id})>View</button>${point.title}</div>`
  });
 marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
}

// call back function for Google API call
function initMap() {
  //TODO try to use HTML data attribute
  const centerlong = Number($('#centerlong').html());
  const center_lat = Number($('#centerlat').html());
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: center_lat, lng: centerlong} 
  });

  poly = new google.maps.Polyline({  });
  $.ajax(
    {
      url: '/maps/:map/points',
      method: 'GET',
      success: function (res) { res.forEach(addPoint)},
      error: function (req, textStatus, errorThrown) {
        alert("you have left the happy path");
      }
    }
  );
  poly.setMap(map);
  
}

$( document ).ready(function() {
  
});

