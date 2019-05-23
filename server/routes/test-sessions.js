/* a way to test methods inside the endpoints 
var chai = require('chai');
var chaiHttp = require('chai-http');
var sessions = require('./sessions');
var sinon = require('sinon');
const sinonChai = require('sinon-chai');
var should = chai.should();

chai.use(chaiHttp);
// Allows us to use expect syntax with sinon
chai.use(sinonChai);


const res = {
  render : (a) => true
}

const test_get_sessionNew =  describe('Get sessions/new', function() {
  it('should call res.render with an arg value of "login"', function(done) {
    var spy = sinon.spy(res, "render");
    sessions().methods.get_new(null,res);
    spy.should.have.been.calledWith('login');
    done();
  });
})

module.exports = test_get_sessionNew;

*/