const mongoose = require('mongoose');
const productschema=mongoose.Schema({
    unm:String,
    mnm:String,
    pid:Number,
    isadmin:Boolean
  });
  module.exports=mongoose.model('grouptwo',productschema);