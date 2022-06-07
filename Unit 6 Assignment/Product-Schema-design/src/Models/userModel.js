const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    Name: {type: String, required: true},
    Email: {type: String, required: true},
    Password: {type: String, required: true},
    Address: {type: Array, required: true},
    Usertype: {type: String, required: true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model('user', userSchema);
module.exports = User;
