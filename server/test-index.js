var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/index');
var should = chai.should();

chai.use(chaiHttp);
const expect = chai.expect;

const testCases = {
  
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