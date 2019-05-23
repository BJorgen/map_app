var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/index');
var should = chai.should();

chai.use(chaiHttp);


const test_server = describe('Get hello world', function() {
    it('should list ALL blobs on /blobs GET', function(done) {
        chai.request(server)
          .get('/')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
      });
      it('should get error 404 for unexisting route', function(done) {
        chai.request(server)
          .get('/randomstring')
          .end(function(err, res){
            res.should.have.status(404);
            done();
          });
      });
});

module.exports = test_server;