import "mocha";

import chai = require("chai");
import chaiHTTP = require("chai-http");
import server = require("../server");

chai.should();
chai.use(chaiHTTP);

describe('"Task"', () => {
    //alle Tests hier einfügen
    
    // Get-Route Test
    describe('GET /aufgaben', () => {
        it('Alle Aufgaben zurückgeben', (done) => {
            chai.request(server)
                .get('/aufgaben')
                .end((err: any, res: any) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it("Nicht alle Aufgaben ausgeben", (done) => {
            chai.request(server)
                .post("/aufgab") //Fehlerhafte URL
                .end((err: any, res: any) => {
                    res.should.have.status(404);
                    done();
                })
        })
    })
    
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
})
