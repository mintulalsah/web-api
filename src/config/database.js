const mongoose = require('mongoose');
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

console.log('db name', dbName);

async function main() {
  const uri = `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017/${dbName}?authSource=${dbName}`;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 2000,
  });

  console.log("mongodb connected successfully...!!!");
}

main().catch(err => console.log(err));
