require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Db = require('./src/config/config');
const List = require('../JobDetails.json');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());



app.get('/', async (req, res) => {
  try {
    return res.status(200).send(List);
  } catch (error) {
    return res.status(400).send({error});
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
