const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productschema=mongoose.Schema({
    unm:String,
    mnm:String,
    pid:Number,
    isadmin:Boolean
  });
  module.exports=mongoose.model('coolmessages',productschema);