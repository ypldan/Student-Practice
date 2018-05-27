const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// установка схемы
const postSchema = new Schema({
  description: String,
  createdAt: Date,
  author: String,
  photoLink: String,
  hashTags: [String],
  likes: [String],
});


module.exports = mongoose.model("Post", postSchema);
