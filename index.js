require("dotenv").config();
const express = require('express');
const server = require('http');
const routes = require('./routes/routes');
require('./Connection/mongoose')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(routes);

server.createServer(app).listen(process.env.APP_PORT, (error) => {
    if (error) {
        throw error
    }
    console.log('Server is listening on',process.env.APP_PORT);
});