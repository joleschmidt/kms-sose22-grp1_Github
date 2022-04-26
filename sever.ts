import express = require("express")
import {Request} from "express";
import {Response} from "express";
import * as mysql from "mysql";


//define and start server
const app = express();
app.listen(8080, "localhost", function () {
    console.log('Server läuft! http://localhost:8080/')
})

//Verbindung zur Datenbank
const connection: mysql.Connection = mysql.createConnection({
    database: "second chance merchandise",
    host: "localhost",
    user: "root"
});

