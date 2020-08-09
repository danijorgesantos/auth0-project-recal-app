const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  points:{
    type:Number,
    required:true,
    default:0
  },
  returned:{
    type:Number,
    required:true,
    default:0
  },
  collected:{
    type:Number,
    required:true,
    default:0
  },
});

module.exports = User = mongoose.model("user", UserSchema);
