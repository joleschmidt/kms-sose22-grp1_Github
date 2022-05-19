import "mocha";

import chai = require("chai");
import chaiHTTP = require("chai-http");
import server = require("../server.js");
import {Aufgabe} from "../model/aufgabe";

chai.should();
chai.use(chaiHTTP);

describe('"Task"', () => {
    //alle Tests hier einfügen
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
