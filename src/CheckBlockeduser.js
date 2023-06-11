const grouponebusers = require('./models/blockedgroup/grouponebusers');
const groupthreebusers = require('./models/blockedgroup/groupthreebusers');
const grouptwobusers = require('./models/blockedgroup/grouptwobusers');

async function CheckBlockeduser(cname,ftoken){
//cnma emeans collection name
console.log("mintu parameter",cname);
let collectionModel;
if(cname==="grouponebusers"){
  collectionModel=grouponebusers
}
else if(cname==="groupthreebusers"){
collectionModel=groupthreebusers
}
else if(cname==="grouptwobusers"){
  collectionModel=grouptwobusers
}

if (!collectionModel) {
  return false;
}
let requestdoc = await collectionModel.findOne({ bfcmtoken: ftoken });
console.log("doc is",requestdoc)
if (requestdoc != null) {
return true;
}
return false;
}
module.exports ={
    CheckBlockeduser
}