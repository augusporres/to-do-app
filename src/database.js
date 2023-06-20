const { MongoClient } = require('mongodb')

const uri = process.env.CONNECTION_STRING
const client = new MongoClient(uri);

// client.connect()
//     .then(client => console.log('Database Connected'));

// const myDb = client.db("mern-tasks")

// const myColl = myDb.collection("tasks")
// const first = myColl.find();
// console.log(first);
// module.exports = myColl;


client.connect()
    .then(client => console.log('Db connected'));
const db = client.db('mern-tasks');
const collection = db.collection('tasks');

const getName = () => {
    return 'Jim';
};

exports.collection = collection;
