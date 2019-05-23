var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/index');
var should = chai.should();

chai.use(chaiHttp);
const expect = chai.expect;

const testCases = {
// Maps routes
  test_GET_maps : describe("GET '/maps' - mainpage", function() {
    it('should return 200 OK', function(done) {
      chai.request(server)
        .get('/maps')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
  }),

  test_GET_maps_Imap : describe("GET '/maps:map' - view a map", function() {
    it('should return Error 400', function(done) {
      chai.request(server)
        .get('/maps/randomString')
        .end(function(err, res){
          res.should.have.status(400);
          done();
        });
    });
  }),

  test_GET_maps_Imap_points_Ipoint : describe("GET '/maps:map/points/:point' - view a map", function() {
    it('should return Error 400 if no valied map and point provided', function(done) {
      chai.request(server)
        .get('/maps:rmap/points/:rpoint')
        .end(function(err, res){
          res.should.have.status(400);
          done();
        });
    });
  }),
// Session route 
  test_GET_sessionNEW : describe('GET "/session/new" - loginpage', function() {
    it('should return 200 OK', function(done) {
      chai.request(server)
        .get('/sessions/new')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
  }),

  test_POST_session : describe('POST username to "session"', function() {
    it('should return 403 if username is null', function(done) {
      chai.request(server)
        .post('/sessions')
        .end(function(err, res){
          res.should.have.status(403);
          done();
        });
    });
    it('should return 200 ok if username is not null', function(done) {
      chai.request(server)
        .post('/sessions')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({user_name: 'test'})
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });
  })


}
module.exports = testCases;