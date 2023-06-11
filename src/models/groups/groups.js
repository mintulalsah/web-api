const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  links: [{
    gname: {
      type: String,
      required: true
    },
    glink: {
      type: String,
      required: true
    }
  }]
});

  module.exports=mongoose.model('groups',productSchema);