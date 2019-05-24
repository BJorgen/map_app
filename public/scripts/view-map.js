function initMap() {
  const centerlong = Number($('#centerlong').html());
  const center_lat = Number($('#centerlat').html());
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: center_lat, lng: centerlong} 
  });

  poly = new google.maps.Polyline({
    
  });
  poly.setMap(map);
  
}

$( document ).ready(function() {
  initMap();
});
