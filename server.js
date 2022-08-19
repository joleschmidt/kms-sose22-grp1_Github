"use strict";
exports.__esModule = true;
var express = require("express");
var mysql = require("mysql2");
var aufgabe_1 = require("./model/aufgabe");
//define and start server
var app = express();
app.use(express.json());
app.listen(8080, "localhost", function () {
    console.log('Server läuft! http://localhost:8080/index.html');
});
//Verbindung zur Datenbank
var database = mysql.createConnection({
    database: "kms_sose22_grp1",
    host: "localhost",
    user: "root"
});
database.connect(function (err) {
    if (err) {
        console.log('Database connection failed: ', err);
    }
    else {
        console.log('Datenbank läuft');
    }
});
//statische Routen
var basedir = __dirname;
app.use('/', express.static(basedir + ''));
app.use('/src', express.static(basedir + '/src'));
app.use('/jquery', express.static(basedir + '/node_modules/jquery/dist'));
app.use('/bootstrap', express.static(basedir + '/node_modules/bootstrap/dist/'));
app.post('/aufgabe', function (req, res) {
    //Aufgabe erstellen
    var aufgabe = req.body.aufgabe;
    //add Aufgabe
    if (aufgabe) {
        // Create new aufgabe
        var data = aufgabe;
        var query = 'INSERT INTO aufgaben (name, prioritaet) VALUES (?, 1)';
        database.query(query, data, function (err, result) {
            if (err) {
                //Query could not be executed
                res.status(500).send({
                    message: 'Database request failed' + err
                });
            }
            else {
                //die Aufgabe was created
                res.status(200).send({
                    message: 'Successfully aufgabe created ',
                    aufgabe: result.aufgabe
                });
            }
        });
    }
    else {
        res.status(400).send({
            message: 'Not all mandatory fields are filled in'
        });
    }
});
app.get('/aufgaben', function (req, res) {
    var query = "SELECT * FROM aufgaben";
    database.query(query, function (err, result) {
        if (err) {
            //Query could not be executed
            res.status(500).send({
                message: 'Database request failed' + err
            });
        }
        else {
            var aufgaben = [];
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var row = result_1[_i];
                aufgaben.push(row);
            }
            res.status(200).send({
                aufgaben: aufgaben,
                message: "Successfully requested todos."
            });
        }
    });
});
app.put('/aufgabe/:aufgabe_id', function (req, res) {
    var aufgabe_id = Number(req.params.aufgabe_id);
    var name = req.body.name;
    var prioritaet = req.body.priority;
    var data = [name, prioritaet, aufgabe_id];
    var query = "UPDATE aufgaben SET name = ?, prioritaet = ? WHERE aufgaben_id = ?;";
    database.query(query, data, function (err, result) {
        if (err) {
            res.status(500).send({
                message: 'Databaserequest failed' + err
            });
        }
        else if (result.affectedRows === 1) {
            res.status(200).send({
                message: 'Successfully updated aufgabe.',
                aufgabe: result
            });
        }
        else {
            res.status(404).send({
                message: 'Aufgabe to update not found.'
            });
        }
    });
});
app.get('/aufgabe/:aufgabe_id', function (req, res) {
    var aufgabe_id = Number(req.params.aufgabe_id);
    var data = [aufgabe_id];
    var query = 'SELECT * FROM aufgaben WHERE aufgaben_id = ?;';
    database.query(query, data, function (err, result) {
        if (err) {
            res.status(500).send({
                message: 'Databaserequest failed' + err
            });
        }
        else if (result.length === 1) {
            var aufgabe = new aufgabe_1.Aufgabe(result[0].id, result[0].name, result[0].date, result[0].prioritaet);
            res.status(200).send({
                message: 'Successfully requested the aufgabe.',
                aufgabe: aufgabe
            });
        }
        else {
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
//# sourceMappingURL=server.js.map