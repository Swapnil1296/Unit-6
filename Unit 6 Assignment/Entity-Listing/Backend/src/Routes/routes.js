const express = require('express');
const router = new express.Router();
const Products = require('../models/producSchema');
// get the products data

router.get('/getproducts', async (req, res) => {
  try {
    let page = req.query.page || 1;
    let pagesize = req.query.pagesize || 5;
    let filter = req.query.filter;
    let sort = req.query.sort;
    const skip = (page - 1) * pagesize;
    if (filter !== 'all') {
      const products = await Products.find({Type: {$eq: filter}})
        .skip(skip)
        .limit(pagesize)
        .sort({price: sort})
        .lean()
        .exec();
      const total_pages = Math.ceil(
        (await Products.find({Type: {$eq: filter}}).countDocuments()) / pagesize
      );
      return res.send({total_pages, products});
    } else {
      const products = await Products.find()
        .skip(skip)
        .limit(pagesize)
        .sort({price: sort})
        .lean()
        .exec();
      const total_pages = Math.ceil(
        (await Products.find().sort({price: sort}).countDocuments()) / pagesize
      );

      return res.send({total_pages, products});
    }
  } catch (error) {
    res.send(error);
  }
});

// for posing data
router.post('/getproducts', async (req, res) => {
  try {
    const products = await Products.create(req.body);
    return res.status(201).send(products);
  } catch (error) {
    return res.status(500).send(error);
  }
});
// getindividual

router.get('/getproducts/:id', async (req, res) => {
  try {
    const {id} = req.params;
    // console.log(id);

    const individual = await Products.findOne({id: id});
    // console.log(individual + "ind mila hai");

    res.status(201).json(individual);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
