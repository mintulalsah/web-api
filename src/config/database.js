const mongoose = require('mongoose');
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

console.log('db name', dbName);

async function main() {
  // Default to production if NODE_ENV is not set
  const nodeEnv = process.env.NODE_ENV || 'production';

  let uri;
  if (nodeEnv === 'development') {
    // Local environment
    uri = `mongodb://localhost:27017/${dbName}`;
  } else {
    // Production environment
    uri = `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017/${dbName}?authSource=${dbName}`;
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 2000,
  });

  console.log("mongodb connected successfully...!!!");
}

main().catch(err => console.log(err));