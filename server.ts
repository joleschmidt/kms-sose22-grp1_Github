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
    database: "aufgaben",
    host: "localhost",
    user: "root"
});


connection.connect((err: MysqlError) => { if (err) {
    console.log('Database connection failed: ', err); } else {
    console.log('Database is connected'); }
});

app.post('/aufgabe',(req:Request,res:Response)=>{
    //Aufgabe erstellen
    delete req.session.user;  //Delete user from session
    res.status(200).send({
        message:'Successfully logged out'
    });
});


