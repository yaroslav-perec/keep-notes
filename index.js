const express = require('express');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection(db);

con.connect(err => {
  if (err) {
    console.log(err);
  }
  require('./server')(app, con);
  app.listen(port, () => console.log('We are live on ' + port));
});
