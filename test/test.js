"use strict";
exports.__esModule = true;
require("mocha");
var chai = require("chai");
var chaiHTTP = require("chai-http");
var server = require("../server.js");
var chai_1 = require("chai");
chai.should();
chai.use(chaiHTTP);
describe('Task', function () {
    //alle Tests hier einfügen
    describe('"Post /aufgabe"', function () {
        it("Aufgabe erstellen", function (done) {
            var aufgabe = {
                aufgabe: "Die Welt retten"
            };
            chai.request(server)
                .post("/aufgabe")
                .send(aufgabe)
                .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
            it("In der Post-Route wurden nicht alle Felder ausgefühlt", function (done) {
                chai.request(server)
                    .post("/aufgabe")
                    .end(function (err, res) {
                    res.should.have.status(400);
                    done();
                });
            });
        });
    });
    describe('GET /aufgaben', function () {
        it('should get all aufgaben', function (done) {
            chai.request(server)
                .get('/aufgaben')
                .set('dataType', 'json')
                .end(function (err, res) {
                (0, chai_1.expect)(res).to.have.status(200);
                res.body.should.have.property('aufgaben');
                done();
            });
        });
    });
});
//# sourceMappingURL=test.js.map