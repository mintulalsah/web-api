const mongoose = require('mongoose');

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
console.log('db name',dbName);
main().then(res => console.log("mongodb connected successfully...!!!"))
main().catch(err => console.log(err));
async function main() {
  const uri = `mongodb://${dbHost}:27017/${dbName}`;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 2000,
  });
}