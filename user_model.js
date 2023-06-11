const { readFileSync } = require('fs');
let loaduser=()=> JSON.parse(readFileSync('user.json'));
module.exports={loaduser};