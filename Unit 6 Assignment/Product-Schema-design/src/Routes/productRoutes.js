const express = require('express');
const Product = require('../Models/productModels');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let products = await Product.find().lean().exec();

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/create', async (req, res) => {
  try {
    let products = await Product.create(req.body).lean().exec();

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let product = await Product.find({_id: {$eq: req.params.id}})
      .lean()
      .exec();

    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/:id/edit', async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
