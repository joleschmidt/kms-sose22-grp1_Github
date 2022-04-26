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
const connection: mysql.Connection = mysql.createConnection({
    database: "kms_sose22_grp1",
    host: "localhost",
    user: "root"
});


database.connect((err: MysqlError) => { if (err) {
    console.log('Database connection failed: ', err); } else {
    console.log('Database is connected'); }
});
