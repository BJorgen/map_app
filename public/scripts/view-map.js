function addPoint(point) {
  var contentString = point.description;
  var marker = new google.maps.Marker({
    position: {lng : Number(point.longitude), lat : Number(point.latitude)},
    draggable: false,
    icon: "https://img.icons8.com/doodle/30/000000/filled-flag.png",
    map: map,
    content: contentString
  });
  var infowindow = new google.maps.InfoWindow({
    content: ("<div>"+point.description+"<imgsrc="+point.image_url+"></div>")
  });
 marker.addListener('click', function () {
    infowindow.open(map, marker, toggleBounce);

  });
  marker.addListener('click', toggleBounce);
  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.DROP);
    }
  }
}

// call back function for Google API call
function initMap() {
  const centerlong = Number($('#centerlong').html());
  const center_lat = Number($('#centerlat').html());
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: center_lat, lng: centerlong} 
  });

  poly = new google.maps.Polyline({  });
  $.ajax(
    {
      url: 'maps/:map/points/:point',
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

