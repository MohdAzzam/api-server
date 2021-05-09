'use strict';

const express = require('express');
const router = express.Router();
const DataCollectionModel=require('../models/data-collection-class')


const actorModel = require('../models/actors');
const actor = new DataCollectionModel(actorModel);

router.get('/actor',async (req, res) => {
    let actors =await actor.get();
    res.status(200).json(actors);
});

router.get('/actor/:_id',async (req, res) => {
    let id =req.params._id;
    let actorz =await actor.get(id);
    res.status(200).json(actorz);



});

router.post('/actor',async (req, res) => {
    let data = req.body;
    let newactor =await actor.create(data);
    res.status(201).json(newactor);
})

router.put('/actor/:_id',async (req, res) => {
    let id = req.params._id;
    const data = req.body;
    let updatedactor =await actor.update(id, data);
    res.status(204).json(updatedactor);
})

router.delete('/actor/:_id',async (req, res) => {
    let id = req.params._id;
    let deletedactor =await actor.delete(id);
    let message = deletedactor ? 'actor deleted successfuly' : 'actor not found';
    let statusCode = deletedactor ? 202 : 204;
    res.status(statusCode).json({
        msg: message,
        deletedactor: deletedactor
    })
})


module.exports = router;