const mongoose = require('mongoose');
const productschema=mongoose.Schema({
    bdocid:String,
    chatId:String,
    gname:String,
    msg:String, 
    sname:String,
  });
  module.exports=mongoose.model('listofgroups',productschema);