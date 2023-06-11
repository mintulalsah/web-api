const mongoose = require('mongoose');
const productschema=mongoose.Schema({
  bfcmtoken:String,
  });
  module.exports=mongoose.model('groupthreebusers',productschema);