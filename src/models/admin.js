const mongoose = require('mongoose');
const listschema=mongoose.Schema({
  mnm:String,
  url:String
  });
  module.exports=mongoose.model('lists',listschema);