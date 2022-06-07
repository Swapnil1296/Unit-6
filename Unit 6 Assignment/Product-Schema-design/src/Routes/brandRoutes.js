const express = require('express');
const Brand = require('../Models/brandModel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let brands = await Brand.find().lean().exec();

    res.status(200).send(brands);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/create', async (req, res) => {
  try {
    let brand = await Brand.create(req.body).lean().exec();
    res.status(200).send(brand);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let brand = await Brand.find({_id: {$eq: req.params.id}})
      .lean()
      .exec();
    res.status(200).send(brand);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/:id/edit', async (req, res) => {
  try {
    let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.status(200).send(brand);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
