import express = require("express")
import {Request} from "express"
import {Response} from "express";


//define and start server
const app = express();
app.listen(8080, "localhost", function () {
    console.log('Server läuft! http://localhost:8080/')
})

