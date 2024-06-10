const mongoose = require('mongoose');
require('dotenv').config()
main().then(res=> console.log("mongodb connected successfully...!!!"))
main().catch(err => console.log(err));

async function main() {
  console.log("process.env.MONGODB_URL",process.env.DEV_MONGODB_URL);
  await mongoose.connect(process.env.DEV_MONGODB_URL);
}