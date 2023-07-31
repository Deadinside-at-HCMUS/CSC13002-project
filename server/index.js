require('dotenv').config();
const express = require('express');
const connection = require('./db');

const app = express();
connection(); 

app.get('/', (req, res) => res.send(`Hello world`))

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`))

