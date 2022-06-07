const express = require('express');
const User = require('../Models/userModel')
const router = express.Router();


//implementing the crud opration for user

// get
router.get('/', async (req, res) => {
  try {
    let users = await User.find({}).lean().exec();
    res.status(200).send(users);
  } catch (error) {
    res.send(400).send(error);
  }
});

// post
router.post('/create', async (req, res) => {
  try {
    let user = await User.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get by id
router.get('/:id', async (req, res) => {
  try {
    let user = await User.find({_id: {$eq: req.params.id}})
      .lean()
      .exec();
    res.status(200).send(user);
  } catch (error) {
    res.send(400).send(error);
  }
});


//pathc or edit
router.patch('/:id/edit', async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.status(200).send(user);
  } catch (error) {
    res.send(400).send(error);
  }
});

router.get('/:id/addresses', async (req, res) => {
  try {
    let user = await User.find({_id: {$eq: req.params.id}})
      .lean()
      .exec();
    res.status(200).send(user.Address);
  } catch (error) {
    res.send(400).send(error);
  }
});

router.post('/:id/addresses/create', async (req, res) => {
  try {
    let user = await User.find({_id: {$eq: req.params.id}})
      .lean()
      .exec();
    user.Address.push(req.body);
    let Updated = await User.findByIdAndUpdate(req.params.id, user, {new: true})
      .lean()
      .exec();
    res.status(200).send(Updated);
  } catch (error) {
    res.send(400).send(error);
  }
});

router.post('/:id/addresses/idx/edit', async (req, res) => {
  try {
    let user = await User.find({_id: {$eq: req.params.id}})
      .lean()
      .exec();
  } catch (error) {
    res.send(400).send(error);
  }
});

module.exports = router;
