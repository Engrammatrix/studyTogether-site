//imported from tutorial 7 and modified by Nafiz Mazumder - B00811858
const express = require("express");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

//CORS enabling code
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(uri, {
    useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB connected")
});

const userRoute = require("./api/routes/userRoute");

app.use("/", userRoute);

module.exports = app; 