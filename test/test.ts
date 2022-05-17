import "mocha";

const chai = require("chai");
const chaiHTTP = require("chai-http");
const server = require("../server");

chai.should();
chai.use(chaiHTTP);

describe('"Task"', () => {
    //alle Tests hier einfügen
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
    });



});
