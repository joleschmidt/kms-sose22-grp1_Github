import express = require("express")
import {Request} from "express";
import {Response} from "express";
import * as mysql from "mysql2";
import {MysqlError} from 'mysql';
import {Aufgabe} from "./model/aufgabe";


//define and start server
const app = express();
app.use(express.json());
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
app.use('/', express.static(basedir + ''));
app.use('/src', express.static(basedir + '/src'));
app.use('/jquery', express.static(basedir + '/node_modules/jquery/dist'));
app.use('/bootstrap', express.static(basedir + '/node_modules/bootstrap/dist/'));


app.post('/aufgabe', (req: Request, res: Response) => {
    //Aufgabe erstellen
    console.log(req.body)
    let aufgabe: string = req.body.aufgabe;

    //add Aufgabe
    if (aufgabe) {
        // Create new aufgabe
        let data: string = aufgabe;
        let query: string = 'INSERT INTO aufgaben (name, prioritaet) VALUES (?, 1)';
        database.query(query, data, (err: MysqlError, result: any) => {
            if (err) {
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
});


app.get('/aufgaben', function (req: Request, res: Response) {
    let query: string = "SELECT * FROM aufgaben";
    database.query(query, (err: MysqlError, result: any) => {
        if (err) {
            //Query could not be executed
            res.status(500).send({
                message: 'Database request failed' + err,
            });
        } else {
            let aufgaben: Aufgabe[] = [];
            for (let row of result){
                aufgaben.push(row);
            }
            res.status(200).send({
                aufgaben: aufgaben,
                message: "Successfully requested todos."
            });
        }
        }
    );
    });

app.put('/aufgabe/:aufgabe_id', function (req: Request, res: Response) {

    const aufgabe_id: number = parseInt(req.params.aufgabe_id);
    const name: string = req.body.name;
    const prioritaet: number = req.body.prioritaet;

    const data: [string, number, number] = [name, prioritaet, aufgabe_id];

    const query: string = "UPDATE aufgaben SET name = ?, prioritaet = ? WHERE aufgaben_id = ?;";

    database.query(query, data, (err: MysqlError, result: any) => {
        if (err) {
            res.status(500).send({
                message: 'Databaserequest failed' + err,
            });
        } else if (result.affectedRows === 1) {
            res.status(200).send({
                message: 'Successfully updated aufgabe.',
            });
        } else {
            res.status(404).send({
                message: 'Aufgabe to update not found.'
            });
        }
    });
});

app.get('/aufgabe/:aufgabe_id', function (req: Request, res: Response) {

    const aufgabe_id: number = Number(req.params.aufgabe_id);

    const data: [number] = [aufgabe_id];

    const query: string = 'SELECT * FROM aufgaben WHERE aufgaben_id = ?;';

    database.query(query, data, (err: MysqlError, result: any) => {
        if (err) {
            res.status(500).send({
                message: 'Databaserequest failed' + err,
            });
        } else if (result.length === 1) {
            const aufgabe: Aufgabe = new Aufgabe(
                result[0].id,
                result[0].name,
                result[0].date,
                result[0].prioritaet
            );
            res.status(200).send({
                message: 'Successfully requested the aufgabe.',
                aufgabe: aufgabe,
            });
        } else {
            res.status(404).send({
                message: 'Requested aufgabe not found.'
            });
        }

    });
});
module.exports = app;
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
