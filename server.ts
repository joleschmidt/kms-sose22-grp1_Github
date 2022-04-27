import express = require("express")
import {Request} from "express";
import {Response} from "express";
import * as mysql from "mysql";
import { Connection, MysqlError } from 'mysql';


//define and start server
const app = express();
app.listen(8080, "localhost", function () {
    console.log('Server läuft! http://localhost:8080/')
})

//Verbindung zur Datenbank
const database: mysql.Connection = mysql.createConnection({
    database: "kms_sose22_grp1",
    host: "localhost",
    user: "root"
});


database.connect((err: MysqlError) => { if (err) {
    console.log('Database connection failed: ', err); } else {
    console.log('Datenbank läuft'); }
});



app.post('/aufgabe',(req:Request,res:Response)=>{
    //Aufgabe erstellen

    const aufgabe: string = req.body.aufgabe;

    //add Aufgabe
    if (aufgabe) {
        // Create new aufgabe
        let data: [string] = [aufgabe];

        let query:string= 'INSERT INTO aufgaben (aufgabe)'+ 'VALUES (?);';

        database.query(query,data,(err:MysqlError, result:any)=>{
            if (err|| result === null){
                //Query could not be executed
                res.status(500).send({
                    message:'Database request failed'+ err,
                });
            } else {
                //die Aufgabe was created
                res.status(200).send({
                    message:'Successfully aufgabe created ',
                    aufgabe:result.aufgabe
                });
            }
        });
    }else {
        res.status(400).send({
            message:'Not all mandatory fields are filled in',
        });
    }


    res.status(200).send({
        message:'Successfully Aufgabe geaddet'
    });
});

//get all Aufgaben
{/*
app.get('/aufgabe',(req:Request,res:Response)=>{

    let query: string= 'SELECT * FROM aufgaben;';

    database.query(query,(err:MysqlError, result:any)=>{
        if (err|| result === null){
            //Query could not be executed
            res.status(500).send({
                message:'Database request failed'+ err,
            });
        } else {
            //die Aufgabe was created
            res.status(200).send({
                message:'Successfully aufgabe created ',
                aufgabe: result
            });
        }
    });
});
*/}

