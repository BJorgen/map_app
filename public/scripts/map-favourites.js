// ======================================================
//                 map-favourites.js
// ======================================================
// On page load:
//      - listen for favourite/unfavourite
// ======================================================

function toggleFavourite(map_id){
  console.log('Class Names : ',$(this))
  $.ajax({
    url : '/maps/' + map_id + '/favourite',
    method: 'POST',
    success: function(res){
      console.log(res);
    },
    error: function(req, textStatus, errorThrown) {
      console.log("error", errorThrown);
      alert("you have left the happy path")
    }
  });

}


// mapsRoutes.post("/:map/favorite", addMapFavourite);
// mapsRoutes.delete("/:map/favorite", deleteMapFavourite);