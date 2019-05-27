// ======================================================
//                 map-favourites.js
// ======================================================
// On page load:
//      - listen for favourite/unfavourite
// ======================================================

function toggleFavourite(){
  const heart = $(this);
  const mapId = $(this.dataset)[0].mapId;
  const heartClasses = $(this).attr('class').split(/\s+/);
  console.log('Classes:', heartClasses)
  console.log('map_id : ', mapId)

  if (heartClasses.includes('favourite')) {
    
    $.ajax({
      url : '/maps/' + mapId + '/favourite',
      method: 'DELETE',
      success: function(res){
        heart.removeClass('favourite')
        console.log(res.length);
      },
      error: function(req, textStatus, errorThrown) {
        console.log("error", errorThrown);
        alert("you have left the happy path")
      }
    });
  
  } else {
    
    $.ajax({
      url : '/maps/' + mapId + '/favourite',
      method: 'POST',
      success: function(res){
        heart.addClass('favourite')
        console.log(res.length);
      },
      error: function(req, textStatus, errorThrown) {
        console.log("error", errorThrown);
        alert("you have left the happy path")
      }
    });
  }
}


$(document).ready(function() {
  $('.map_favourites .fa-heart').on('click', toggleFavourite)
});

