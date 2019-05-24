function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 51.0879, lng: -114.0524} 
  });

  poly = new google.maps.Polyline({
    
  });
  poly.setMap(map);
  
}

$( document ).ready(function() {
  initMap();
});
