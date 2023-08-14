// Importing mongo Packages
const mongodb = require('mongodb')
// Connect our client (node application) with mongo packages
const MongoClient = mongodb.MongoClient;

// underscore variable name points that this variable is actually works inside this file
let _db;

// function to execute or connect Database with node app
const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://wm401238:Nv7XPCYvD0yA0P83@cluster0.7lptiej.mongodb.net/?retryWrites=true&w=majority')
.then((client) => {
  console.log('CONNECTED')
  _db = client.db() // we can override the database and we can write database name in ()
  callback(client)
})
.catch((err) => {
  console.log(err)
})
}

const getDb = () => {
  if(_db){
    return _db
  }
  throw 'No Database Found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
