require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Db = require('./config/config');

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

//connection
const rSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: 'Point',
    },
    coordinates: {
      type: [Number],
    },
  },
  name: {type: String},
});

const Restaurant = mongoose.model('restaurants', rSchema);

const lat = 32.732998;
const long = 74.864273;

app.get('/nearme', async (req, res) => {
  try {
    var METERS_PER_MILE = 1609.34;
    const restaurants = await Restaurant.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [long, lat],
          },
          $maxDistance: 1 * METERS_PER_MILE,
        },
      },
    });
    return res.status(200).send({restaurants});
  } catch (error) {
    console.log('error:', error);
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});