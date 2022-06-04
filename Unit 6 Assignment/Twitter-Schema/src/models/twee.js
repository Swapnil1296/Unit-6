const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new mongoose.Schema({
  text: {type: String, required: true},
  createdDate: {type: Date, default: Date.now},
  tweetImage: {type: String, required: true},
  isReply: {type: Boolean, required: true},
  author: {type: Schema.Types.ObjectId, ref: "user"},
  likedUsers: [{type: Schema.Types.ObjectId, ref: "user"}],
  replies: [{type: Schema.Types.ObjectId, ref: "tweet"}],
  child: {type: Schema.Types.ObjectId, ref: "tweet"},
  parent: {type: Schema.Types.ObjectId, ref: "tweet"},
  retweeters: [{type: Schema.Types.ObjectId, ref: "user"}],
});

var tweet = mongoose.model("tweet", tweetSchema);

module.exports = tweet;
