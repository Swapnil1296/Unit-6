const express = require('express');
const router = new express.Router();

// get the products data

router.get('/getproducts', async (req, res) => {
  try {
    const producstdata = await products.find();
    // console.log(producstdata + "data mila hain");
    res.status(201).json(producstdata);
  } catch (error) {
    console.log('error' + error.message);
  }
});
// getindividual

router.get('/getproducts/:id', async (req, res) => {
  try {
    const {id} = req.params;
    // console.log(id);

    const individual = await products.findOne({id: id});
    // console.log(individual + "ind mila hai");

    res.status(201).json(individual);
  } catch (error) {
    res.status(400).json(error);
  }
});
