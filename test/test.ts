import "mocha";

import chai = require("chai");
import chaiHTTP = require("chai-http");
import server = require("../server.js");
import {Aufgabe} from "../model/aufgabe";
import {expect} from "chai";

chai.should();
chai.use(chaiHTTP);

describe('"Task"', () => {
    //alle Tests hier einfügen

    //Post-Routen Test
    //Das ist der Post Test
    describe('"Post /aufgabe"', () => {
        it("Aufgabe erstellen", (done) => {
            const aufgabe = {
                aufgabe: "Die Welt retten"
            }
            chai.request(server)
                .post("/aufgabe")
                .send(aufgabe)
                .end((err: any, res: any) => {
                    res.should.have.status(200);
                    done();
                })
        })
        it("In der Post-Route wurden nicht alle Felder ausgefühlt", (done) => {
            chai.request(server)
                .post("/aufgabe")
                .end((err: any, res: any) => {
                    res.should.have.status(400);
                    done();
                })
        })
    })

    describe('PUT', ()=> {
        it('should send the success message', function (done) {
            chai.request('http://localhost:8080')
                .put('/aufgabe/1')
                .set('content-type', 'application/json')
                .send({
                    'name':'KMS machen',
                    'priority': 1
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                })
        });
    });

    describe('Aufgabe class', () => {

        const aufgabe = new Aufgabe(1, 'Einkaufen', new Date(), 1);

        it('should creates an new instance', () => {
            expect(aufgabe.id).to.equal(1);
            expect(aufgabe.name).to.equal('Einkaufen');
            expect(aufgabe.prioritaet).to.equal(1);
        });

        it('should be an instance of Aufgabe', () => {
            expect(aufgabe).to.be.an.instanceof(Aufgabe);
        });

        it('should be an object', () => {
            expect(aufgabe).to.be.an("object");
        });
    });

    describe("Put Error /aufgabe/:aufgaben_id", () => {
        it("Put kann nicht bearbeitet werden da es die ID nicht gibt", (done) => {
            const idput = 12;
            const aufgabe = {
                name: "Servus Deutschland",
                prioritaet: 1
            }
            chai.request(server)
                .put("/aufgabe/" + idput)
                .send(aufgabe)
                .end((err: any, res: any) => {
                    res.should.have.status(404);
                    done();
                })
        })
    });

})
