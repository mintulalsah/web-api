const mongoose = require('mongoose');
const dbHost = process.env.DB_HOST;
main().then(res => console.log("mongodb connected successfully...!!!"))
main().catch(err => console.log(err));

async function main() {
  //mongodb://13.200.170.240:27017/?directConnection=true&appName=mongosh+2.2.6
  //await mongoose.connect(`mongodb://${dbHost}:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5`);
  await mongoose.connect(`mongodb+srv://mintu:mintu@cluster0.duup3.mongodb.net/chat`);
}