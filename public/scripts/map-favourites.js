function toggleFavourite(){
  // retrive components and data from DOM
  const heart = $(this);
  const mapId = $(this.dataset)[0].mapId;
  const heartClasses = $(this).attr('class').split(/\s+/);

  const isFavourite = heartClasses.includes('favourite');

  const removeClass = function(){
    heart.removeClass('favourite');
    const id = 'f_map_' + mapId;
    // remove map_card with this mapID from favourites  
    $('#'+id).remove();
  }

  const addClass = a => heart.addClass('favourite'); 
  // AJAX call can be POST or DELETE depending on current state (liked or not)
  const method = isFavourite ? "DELETE" : "POST";
  const action = isFavourite ? removeClass : addClass;
  // sending AJAX
  $.ajax({
    url : '/maps/' + mapId + '/favourite',
    method: method,
    success: function(likeArr){
      action();
      heart.text(" " + likeArr.length);
    },
    error: function(req, textStatus, errorThrown) {
      console.log("error", errorThrown);
      alert("you have left the happy path")
    }
  });
}


$(document).ready(function() {
  $('.map_favourites .fa-heart').on('click', toggleFavourite)
});

