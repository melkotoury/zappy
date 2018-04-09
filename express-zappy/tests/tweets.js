const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server');
const should = chai.should();

chai.use(chaiHttp);


describe('Tweets', function() {
    it('should list aLL tweets on /tweets ');
});

it('should list aLL tweets on /tweets ', function(done) {
    chai.request(server)
        .get('/tweets')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        });
});
