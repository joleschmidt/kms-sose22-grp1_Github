var chai = require('chai');
let chaiHttp = require('chai-http')
//var testDir = require('../src/client');
let should = chai.should();
var serverDir = require('../server');

chai.use(chaiHttp);

describe('/POST', ()=>{
    it('Create message should succeed', (done) => {
        chai.request(serverDir)
            .post('/aufgabe')
            .set('content-type', 'application/json')
            .send('Test Aufgabe')
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                done();
            })
    })
})

describe('/GET', () => {
    it('successfully receives a task', (done) => {
        chai.request(serverDir)
            .get('/aufgabe/1')
            .end((err,res) => {
                res.should.have.status(200);
                done();
            })
    })
})