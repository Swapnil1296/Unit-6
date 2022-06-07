const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    Product_Name: {type: String, required: true},
    Brand_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brand',
      required: true,
    },
    Product_Img: {type: String, required: true},
    Price: {type: Number, required: true},
    Quentity: {type: Number, required: true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model('product', productSchema);

module.exports = Product;
