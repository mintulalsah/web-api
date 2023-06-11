const mongoose = require('mongoose');

main().then(res=> console.log("mongodb connected successfully...!!!"))
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://mintu:mintu@serverlessinstance0.duup3.mongodb.net/chat');
}