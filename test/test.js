"use strict";
exports.__esModule = true;
require("mocha");
var chai = require("chai");
var chaiHTTP = require("chai-http");
var server = require("../server.js");
chai.should();
chai.use(chaiHTTP);
describe('"Task"', function () {
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
        });
    });
    //hallo1
});
//# sourceMappingURL=test.js.map