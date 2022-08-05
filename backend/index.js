//imported from tutorial 7 by Nafiz Mazumder - B00811858
const express = require("express");
const http = require("http");

const app = require("./app");

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, () => {
    console.log("Server started on port " + port);
});