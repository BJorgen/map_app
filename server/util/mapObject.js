/*
stubbing data until db is up
*/

const mapObjext = map = {
  id : 3,
  name: 'Public Art Work',
  public: true,
  user_id: 2,
  map_setting: {
    id: 3,
    center_long: -114.082400,
    center_lat: 51.067900,
    zoom: 12.00
  },
  points: [
    {
      id: 4,
      title: 'Travelling Light',
      description: 'A controversial art piece and a very big circle',
      longitude: -114.042263,
      latitude: 51.142729,
      image_url: 'https://images.thestar.com/1Rz4yOpeL9aEexFVDcagcc4Le9A=/1086x716/smart/filters:cb(2700061000)/https://www.thestar.com/content/dam/thestar/calgary/2018/06/03/proposed-fixes-to-calgarys-controversial-public-art-program-going-to-council/bluering.jpg'
    },
    {
      id: 5,
      title: 'Wonderland Sculpture',
      description: 'Big head in the center of town',
      longitude: -114.062122,
      latitude: 51.047597,
      image_url: 'https://325mwx119m59jqt5r27qnkcn-wpengine.netdna-ssl.com/wp-content/uploads/2017/04/PUBLICART-Encana-5-1-1024x790.jpg'
    },
    {
      id: 6,
      title: 'Armengol Statues' ,
      description: 'Very tall people to look up to',
      longitude: -114.059937 ,
      latitude: 51.047669,
      image_url:'https://static1.squarespace.com/static/50e1b9c6e4b015296ce398f6/t/54e8c652e4b0440df7a30994/1424541305832/public+art+Calgary?format=1000w'
    }
  ]
 }

 module.exports = mapObjext;