
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {id: 1, point_id: 1, image_url: 'https://www.tuf-bar.com/wp-content/uploads/2017/02/peace_bridge_calgary_alberta_fiberglass_rebar.jpg'},
        {id: 2, point_id: 3, image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Calgary_Central_Library_Render.jpg/600px-Calgary_Central_Library_Render.jpg'},
        {id: 3, point_id: 4, image_url: 'https://images.thestar.com/1Rz4yOpeL9aEexFVDcagcc4Le9A=/1086x716/smart/filters:cb(2700061000)/https://www.thestar.com/content/dam/thestar/calgary/2018/06/03/proposed-fixes-to-calgarys-controversial-public-art-program-going-to-council/bluering.jpg'},
        {id: 4, point_id: 5, image_url: 'https://325mwx119m59jqt5r27qnkcn-wpengine.netdna-ssl.com/wp-content/uploads/2017/04/PUBLICART-Encana-5-1-1024x790.jpg'},
        {id: 5, point_id: 6, image_url: 'https://static1.squarespace.com/static/50e1b9c6e4b015296ce398f6/t/54e8c652e4b0440df7a30994/1424541305832/public+art+Calgary?format=1000w'}
      ]);
    });
};
