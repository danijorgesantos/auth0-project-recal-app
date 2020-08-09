const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  location:{
    type:{type:String},
    coordinates:[]
  },
  users:[{
    username:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
    },
    password:{
      type:String,
      required:true,
    }
  }],
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

module.exports = Station = mongoose.model("station", StationSchema);
