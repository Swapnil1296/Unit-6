const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  mail: {type: String, required: true},
  website: {type: String, required: true},
  bio: {type: String, required: true},
  location: {type: String, required: true},
  profileImage: {type: String, required: true},
  bannerImage: {type: String, required: true},
  joinedDate: {type: Date, default: Date.now},
  following: [{type: Schema.Types.ObjectId, ref: "user"}],
  followers: [{type: Schema.Types.ObjectId, ref: "user"}],
  likedTweets: [{type: Schema.Types.ObjectId, ref: "tweet"}],
  tweets: [{type: Schema.Types.ObjectId, ref: "tweet"}],
  bookmarks: [{type: Schema.Types.ObjectId, ref: "tweet"}],
});

var user = mongoose.model("user", userSchema);

module.exports = user;
