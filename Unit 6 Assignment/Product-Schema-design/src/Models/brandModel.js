const mongoose = require('mongoose');

const brandsShema = new mongoose.Schema(
  {
    Brand_Name: {type: String, required: true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Brand = mongoose.model('brand', brandsShema);
module.exports = Brand;
