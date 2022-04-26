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

    const Aufgabe: string = req.body.aufgabe;



    res.status(200).send({
        message:'Successfully Aufgabe geaddet'
    });
});


