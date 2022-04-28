import express = require("express")
import {Request} from "express";
import {Response} from "express";
import * as mysql from "mysql";
import {MysqlError} from 'mysql';


//define and start server
const app = express();
app.listen(8080, "localhost", function () {
    console.log('Server läuft! http://localhost:8080/index.html')
})

//Verbindung zur Datenbank
const database: mysql.Connection = mysql.createConnection({
    database: "kms_sose22_grp1",
    host: "localhost",
    user: "root"
});

database.connect((err: MysqlError) => {
    if (err) {
        console.log('Database connection failed: ', err);
    } else {
        console.log('Datenbank läuft');
    }
});


//statische Routen
const basedir: string = __dirname;
app.use('/', express.static(basedir + '/html'));
app.use('/src', express.static(basedir + '/src'));
app.use('/jquery', express.static(basedir + '/node_modules/jquery/dist'));
app.use('/bootstrap', express.static(basedir + '/node_modules/bootstrap/dist'));


app.post('/aufgabe', (req: Request, res: Response) => {
    //Aufgabe erstellen

    const aufgabe: string = req.body.aufgabe;

    //add Aufgabe
    if (aufgabe) {
        // Create new aufgabe
        let data: [string] = [aufgabe];

        let query: string = 'INSERT INTO aufgaben (aufgabe)' + 'VALUES (?);';
        /*SQL Aufgabe erstellen:
            INSERT INTO aufgaben (name, prioritaet) VALUES (?, 1)
        -Erwartet Name als String
        */


        database.query(query, data, (err: MysqlError, result: any) => {
            if (err || result === null) {
                //Query could not be executed
                res.status(500).send({
                    message: 'Database request failed' + err,
                });
            } else {
                //die Aufgabe was created
                res.status(200).send({
                    message: 'Successfully aufgabe created ',
                    aufgabe: result.aufgabe
                });
            }
        });
    } else {
        res.status(400).send({
            message: 'Not all mandatory fields are filled in',
        });
    }


    res.status(200).send({
        message: 'Successfully Aufgabe geaddet'
    });
});


app.get('/aufgaben', function (req: Request, res: Response) {
    let query: string = "SELECT * FROM aufgaben";
    database.query(query, (err: MysqlError, result: any) => {
        if (err) {
            //Query could not be executed
            res.status(500).send({
                message: 'Database request failed' + err,
            })
        } else {
            //let aufgaben : Aufgabe[] = []
            for (let row of result){
                /*
                let aufgabe = new Aufgabe(row.name, row.prioritaet)
                aufgaben.push(aufgabe)
                )
                 */
            }
            res.status(200).send({
                //aufgaben: aufgaben
            })
        }
        }
    )
    })

/*
SQL Queries

Aufgabe erstellen:
INSERT INTO aufgaben (name, prioritaet) VALUES (?, 1)
-Erwartet Name als String

Eine bestimmte Aufgabe abfragen:
SELECT * FROM aufgaben WHERE aufgaben_id = ?
-Erwartet AufgabenId als Int

Eine bestimmte Aufgabe bearbeiten:
UPDATE aufgaben SET name = ?, prioritaet = ? WHERE aufgaben_id = ?
-Erwartet Name als String, Priorität als Int und Aufgaben_id als Int

Alle Aufgaben abrufen:
SELECT * FROM aufgaben

Eine bestimmte Aufgabe löschen:
DELETE FROM aufgaben WHERE aufgaben_id = ?
 */




