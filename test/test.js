"use strict";
exports.__esModule = true;
require("mocha");
var chai = require("chai");
var chaiHTTP = require("chai-http");
var server = require("../server.js");
var aufgabe_1 = require("../model/aufgabe");
var chai_1 = require("chai");
chai.should();
chai.use(chaiHTTP);
describe('"Task"', function () {
    //alle Tests hier einfügen
    //Post-Routen Test
    //Das ist der Post Test
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
    describe('PUT', function () {
        it('should send the success message', function (done) {
            chai.request('http://localhost:8080')
                .put('/aufgabe/1')
                .set('content-type', 'application/json')
                .send({
                'name': 'KMS machen',
                'priority': 1
            })
                .end(function (err, res) {
                (0, chai_1.expect)(res).to.have.status(200);
                done();
            });
        });
    });
    describe('Aufgabe class', function () {
        var aufgabe = new aufgabe_1.Aufgabe(1, 'Einkaufen', new Date(), 1);
        it('should creates an new instance', function () {
            (0, chai_1.expect)(aufgabe.id).to.equal(1);
            (0, chai_1.expect)(aufgabe.name).to.equal('Einkaufen');
            (0, chai_1.expect)(aufgabe.prioritaet).to.equal(1);
        });
        it('should be an instance of Aufgabe', function () {
            (0, chai_1.expect)(aufgabe).to.be.an["instanceof"](aufgabe_1.Aufgabe);
        });
        it('should be an object', function () {
            (0, chai_1.expect)(aufgabe).to.be.an("object");
        });
    });
    describe("Put /aufgabe/:aufgaben_id", function () {
        it("Aufgabe bearbeiten", function (done) {
            var aufgabe = {
                name: "Die Welt nicht retten",
                prioritaet: 2
            };
            chai.request(server)
                .put("/aufgabe/1")
                .send(aufgabe)
                .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
        });
        it("Put kann nicht bearbeitet werden da es die ID nicht gibt", function (done) {
            var idput = 12;
            var aufgabe = {
                name: "Servus Deutschland",
                prioritaet: 1
            };
            chai.request(server)
                .put("/aufgabe/" + idput)
                .send(aufgabe)
                .end(function (err, res) {
                res.should.have.status(404);
                done();
            });
        });
    });
});
//# sourceMappingURL=test.js.map