import "mocha";

import chai = require("chai");
import chaiHTTP = require("chai-http");
import server = require("../server.js");
import {expect} from "chai";

chai.should();
chai.use(chaiHTTP);

    //alle Tests hier einfügen
    describe('"Post /aufgabe"', () => {
        it("Aufgabe erstellen", (done) => {
            const aufgabe = {
                aufgabe: "Die Welt retten"
            }
            chai.request(server)
                .post("/aufgabe")
                .send(aufgabe)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
            it("In der Post-Route wurden nicht alle Felder ausgefühlt", (done) => {
                chai.request(server)
                    .post("/aufgabe")
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    })
            })
        })
    });

describe('GET /aufgaben', ()=> {
    it('should send the success message and a list of aufgaben', (done) => {
        chai.request(server)
            .get('/aufgaben')
            .set('dataType', 'json')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                res.body.should.have.property('aufgaben');
                done();
            });
    });
});
