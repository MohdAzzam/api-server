'use strict';

const express = require('express');
const router = express.Router();
const DataCollectionModel=require('../models/data-collection-class')

const bookModel=require('../models/books');

const bookInstance=new DataCollectionModel(bookModel);

router.get('/book',async(req,res)=>{
    let books=await bookInstance.get();
    res.status(200).json(books);
});

router.get('/book/:_id',async (req,res)=>{
    let id =req.params._id;
    let book =await bookInstance.get(id);
    res.status(200).json(book);

});

router.post('/book',async (req,res)=>{
    let data=req.body;
    let newBook=await bookInstance.create(data);
    res.status(201).json(newBook);
})

router.put('/book/:id',async(req,res)=>{
    let id =req.params.id;
    const data=req.body;
    let updatedBook=await bookInstance.update(id,data);
    res.status(204).json(updatedBook);
})

router.delete('/book/:id',async(req,res)=>{
    let id =req.params.id;
    let deletedBook=await bookInstance.delete(id);
    let message=deletedBook ? 'Book deleted successfuly' : 'book not found';
    let statusCode = deletedBook ? 202 : 204;
    res.status(statusCode).json({
        msg:message,
        deletedBook:deletedBook
    })
})


module.exports=router;