 const express = require('express');
 const router = express.Router();
 const  databaseFile = require('../database.js')
 var ObjectId = require('mongodb').ObjectId;
 


 router.get('/', async (req, res) => {
    const options = {
        // sort returned documents in ascending order by title (A->Z)
        sort: { title: 1 }
      };
    var tasks = []
    const cursor = databaseFile.collection.find({}, options);
    for await(const task of cursor){
        console.log(task)
        tasks.push(task)
    }
    
    res.json(tasks);
 });

 router.post('/', async(req, res) => {
    const {title, description } = req.body;
    await databaseFile.collection.insertOne({
        title: title,
        description: description
    })
    res.json('received');
 });

 router.get('/:id', async(req, res) => {
    const filter = {"_id": new ObjectId(req.params.id)}
    const result = await databaseFile.collection.findOne(filter);
    res.json(result);
 })

 router.put('/:id', async(req, res) => {
    const { title, description } = req.body;
    const filter = {"_id": new ObjectId(req.params.id)}
    const updateDoc = {
        $set: {
          title: title,
          description: description
        },
      };
    const result = await databaseFile.collection.updateOne(filter, updateDoc);
    res.json(`${result.matchedCount} document(s) matched the filters, updated ${result.modifiedCount} document(s)`);
 })

 router.delete('/:id', async(req, res) => {
    const filter = {"_id": new ObjectId(req.params.id)}
    const result = await databaseFile.collection.deleteOne(filter);
    res.json(`${result.deletedCount} document(s) deleted`);
 })
 module.exports = router;