const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/user');

// GET router

router.get('/', (req, res, next) => {
  Product.find()
    .select('username password _id')
    .exec()
    .then(docs => {
        const response = {
            User : docs.map(doc =>{
                return {
                    name : doc.username,
                    psw : doc.password,
                    _id: doc._id,
                }
            })
        }
       // if(docs.length >= 0){
            res.status(200).json(response);
        //}else {
          //      res.status(404).json({
            //        message : 'No entries found'
             //   });
        //};
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

});

// POST router 

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.nom,
        username : req.body.username,
        password: req.body.password,
        email : req.body.email,
        adress : req.body.adress,
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json ({
                message : 'Created Succesfully',
                createdProduct: {
                    name: result.nom,
                    price : result.username,
                    password: result.password,
                    email : result.email,
                    adress : result.adress,
                    _id : result._id ,
                    request : {
                        type : 'GET',
                        url :'http://localhost:3000/Users/' + result._id        
                    }
                }
            });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json( {
                error: err
            })});
  

});

// GET one 

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    Product.findById(id)
        .select('username password _id')
        .exec()
        .then(doc => {
            console.log("From Database",doc);
            if(doc){
                res.status(200).json({
                    product : doc ,
                    request  :{
                        type : 'GET',
                        description : 'Get all products',
                        url :'http://localhost:3000/Users/'     
                    }
                });
            } else {
                res.status(404).json({ message:'No valid ID for provided Id'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
            });
});

// PATCH one 

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateOps =  {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id : id},{$set:updateOps})
        .exec()
        .then( result => {
            res.status(200).json({
                message : 'User Updated',
                request  :{
                    type : 'GET',
                    url :'http://localhost:3000/Users/' + id     
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json ({
                error: err
            });
        });

});

// DELETE one 

router.delete('/:userId', (req, res, next) => {
   const id = req.params.userId;
    Product.remove({_id : id})
        .exec()
        .then(result => {
            res.status(200).json({
                message :'user Deleted',
                request  :{
                    type : 'POST',
                    url :'http://localhost:3000/Users/',     
                    data : { name: 'String' , price : 'Number' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

module.exports = router;