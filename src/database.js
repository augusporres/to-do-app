const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://augusporres:WLNL19P7HIfmg3Eb@cluster0.lp1wmcu.mongodb.net/"
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
