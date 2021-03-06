var map_id;
var map;
var pointMap = {}
var nonPersistentMarker;
var activePoint;

const updatePointContainer = function(point){
  activePoint = point;
  $('#point-container .title').text(point.title);
  $('#point-container .description').text(point.description);
  $('#point-container .img').attr("src",point.image_url);
  $('#edit-point').show();
  $('#delete-point').show();
  $('#upload-img').show();
}

const clearPointContainer = function(){
  $('#point-container .title').text("Map App");
  $('#point-container .description').html(
    `Select a location in the map to get more information about it.
    <br>
    If you are logged in:
    <br/> - You can like the current map
    <br/> - You can create a new location by clicking the 'Add New Point' button and then selecting a point on a  the map.
    <br/> - You can edit or delete the selected location`
  );
 // src https://unsplash.com/photos/TrhLCn1abMU        
  $('#point-container .img').attr("src","/imgs/view-map-base.jpg");
  $('#edit-point').hide();
  $('#delete-point').hide();
  $('#upload-img').hide();
}

const openPointEditForm = function(){
  $('#editPointFrom input').val(activePoint.title);
  $('#editPointFrom textarea').val(activePoint.description);
  $('#editPointFrom').show();
}

const showPointInfo = function(point){
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

const getGoogleMarker = function(coord){
  let marker = new google.maps.Marker({
    position: coord,
    icon: "https://img.icons8.com/doodle/30/000000/filled-flag.png",
    map: map,
  });
  return marker;
}

const deleteActivePoint = function(){
  $.ajax(
    {
      url: '/maps/'+map_id+'/points/'+activePoint.id,
      method: 'DELETE',
      success: function (res) { 
        pointMap[activePoint.id].setMap(null);
        delete pointMap[activePoint.id];
        clearPointContainer();
      },
      error: function (req, textStatus, errorThrown) {
        alert("you have left the happy path");
      }
    }
  );
}

const addPoint = function(point) {
  let marker = getGoogleMarker({lng : Number(point.longitude), lat : Number(point.latitude)});
  var infowindow = new google.maps.InfoWindow({
    content: `<div>${point.title}</div>`
  });
  // Onclick show point info
  marker.addListener('click', function () {
    showPointInfo(point.id);
  });

  // Show point title on hover
  marker.addListener('mouseover', function() {
    infowindow.open(map, marker);
  });
  marker.addListener('mouseout', function() {
    infowindow.close();
  });
    pointMap[point.id] = marker;
}

function newPointEvent(event) {
  marker = getGoogleMarker(event.latLng);
  nonPersistentMarker = marker;
  $('#centerlat').text(marker.getPosition().lat());
  $('#centerlong').text(marker.getPosition().lng());
  let infowindow = new google.maps.InfoWindow({
    content: `<div>Add a title</div>`
  });
 marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
  $('#newPointForm').show();
}

const {enableNewPointEvent, disableNewPointEvent} = function(){
  let newPointListener = null;
  return {
    enableNewPointEvent : function (){
      newPointListener = map.addListener('click', newPointEvent);
      $("#toggleEditBtn").html("Cancel add point");
      $("#toggleEditBtn").attr("onclick","disableNewPointEvent()")        
    },
    
    disableNewPointEvent : function(){
      google.maps.event.removeListener(newPointListener);
      newPointListener = null;
      $("#toggleEditBtn").html("Add New Point");
      $("#toggleEditBtn").attr("onclick","enableNewPointEvent()")
    }
  }
}();

const cancelAddNewPoint = function(){
  $('#newPointForm').hide();
  nonPersistentMarker.setMap(null);
  nonPersistentMarker = null;
  disableNewPointEvent();
}

// call back function for Google API call
function initMap() {
  const mapDataSet = $('#map-container').data();
  const centerlong =  Number(mapDataSet.mapLongitude);
  const center_lat =  Number(mapDataSet.mapLatitude);
  map_id = Number(mapDataSet.mapId);
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: center_lat, lng: centerlong} 
  });

  poly = new google.maps.Polyline({  });
  $.ajax(
    {
      url: '/maps/'+map_id+'/points',
      method: 'GET',
      success: function (res) { res.forEach(addPoint)},
      error: function (req, textStatus, errorThrown) {
        alert("you have left the happy path");
      }
    }
  );
  poly.setMap(map);
  
}

const bindAjaxOnSubmit = function(errorObj){
  $( "#newPointForm" ).on( "submit", function( event ) {
    event.preventDefault();
    const pointData = {
      title : this.querySelector('input').value,
      description : this.querySelector('textarea').value,
      longitude : nonPersistentMarker.position.lng,
      latitude : nonPersistentMarker.position.lat,
      map_id : map_id
    }
    $.ajax({
      url : '/maps/'+map_id+'/points',
      method: 'POST' ,
      data :  pointData,
      success: function(res){
        cancelAddNewPoint();
        addPoint(res);
        $('#newPointForm').hide();
        updatePointContainer(res);
      },
      error: function(req, textStatus, errorThrown) {
        alert("you have left the happy path")
      }
    });
    this.querySelector('textarea').value = "";
    this.querySelector('input').value = "";
  });

  $( "#editPointFrom" ).on( "submit", function( event ) {
    event.preventDefault();
    const pointData = {
      title : this.querySelector('input').value,
      description : this.querySelector('textarea').value,
      longitude : Number($('#centerlong').html()),
      latitude : Number($('#centerlat').html()),
      map_id : map_id
    }
    $.ajax({
      url : '/maps/'+map_id+'/points/'+activePoint.id,
      method: 'PUT' ,
      data :  pointData,
      success: function(res){
        //delete the old marker and create a new one
        pointMap[activePoint.id].setMap(null);
        delete pointMap[activePoint.id];
        addPoint(res);
        $('#editPointFrom').hide();
        updatePointContainer(res);
      },
      error: function(req, textStatus, errorThrown) {
        console.log("error", errorThrown);
        alert("you have left the happy path")
      }
    });
  });

  $( "#uploadImg" ).on( "submit", function( event ) {
    event.preventDefault();
    const pointData = {
      url : this.querySelector('input').value,
      map_id : map_id
    }
    $.ajax({
      url : '/maps/'+map_id+'/points/'+activePoint.id + '/imgs',
      method: 'PUT' ,
      data :  pointData,
      success: function(res){
        activePoint.image_url = pointData.url;
        updatePointContainer(activePoint);
        $('#uploadImg').hide();
      },
      error: function(req, textStatus, errorThrown) {
        console.log("error", errorThrown);
        alert("you have left the happy path")
      }
    });
  });
}

$( document ).ready(function() {
  $('.modify-point').hide();
  $('.popups').hide();
  bindAjaxOnSubmit();
  clearPointContainer();
});