const mongoose = require('mongoose');
const dbHost = process.env.DB_HOST;
main().then(res => console.log("mongodb connected successfully...!!!"))
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${dbHost}:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5`);
}