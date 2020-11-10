const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var randomstring = require("randomstring");

const Licences = require ('../models/licence');

// Get Licences 

router.get('/' , (req, res, next) =>{
    Licences
        .find()
        .exec()
        .then((licences) => { 
            return res.json(licences);
        })
        .catch((err) => {
            console.log(err);
        res.status(500).json({
            error: err
        });
        });
});


// Create Licence

router.post('/create', (req, res, next) =>{
    console.log(req.params);
    const Licence = new Licences({
        enseigne : req.body.enseigne,
        site : req.body.site,
        siret: req.body.siret,
        code_naf : req.body.code_naf,
        code_tva : req.body.code_tva,
        phone : req.body.phone,
        adress : req.body.adress,
        zip_code: req.body.zip_code,
        ville : req.body.ville,
        pays : req.body.pays,
        nb_postes: req.body.nb_postes,
        duree_utilisation: req.body.duree_utilisation,
        client_email : req.body.client_email,
        client_pwd : req.body.client_pwd,
        licence : randomstring.generate(),
        code_licence : randomstring.generate(),
        exercice: req.body.exercice,
        email: req.body.email,
    });
    Licence
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message : 'Licence Created Succefully',
                createdLicence : {
                    _id: new mongoose.Types.ObjectId(),
                    enseigne : result.enseigne,
                    site : result.site,
                    siret: result.siret,
                    code_naf : result.code_naf,
                    code_tva : result.code_tva,
                    phone : result.phone,
                    adress : result.adress,
                    zip_code: result.zip_code,
                    ville : result.ville,
                    pays : result.pays,
                    nb_postes: result.nb_postes,
                    duree_utilisation: result.duree_utilisation,
                    client_email : result.client_email,
                    client_pwd : result.client_pwd,
                    licence : result.licence,
                    code_licence : result.code_licence,
                    exercice: result.exercice,
                    email: result.email,
                    request : {
                        type : 'GET',
                        url :'http://localhost:3000/Licences/' + result._id        
                    }
                }
            })
        })
})


// GET one 

router.get('/:LicenceId', (req, res, next) => {
    const id = req.params.LicenceId;
    Licences.findById(id)
        .exec()
        .then(doc => {
            console.log("From Database",doc);
            if(doc){
                res.status(200).json({
                    product : doc ,
                    request  :{
                        type : 'GET',
                        description : 'Get all products',
                        url :'http://localhost:3000/licences/'     
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

router.patch('/:LicenceId', (req, res, next) => {
    const id = req.params.LicenceId;
    console.log("id ="+ id);
    const Licence = Licences.findById(id);
    Licences.findByIdAndUpdate(id,{ 
        enseigne : req.body.enseigne,
        site : req.body.site,
        siret: req.body.siret,
        code_naf : req.body.code_naf,
        code_tva : req.body.code_tva,
        phone : req.body.phone,
        adress : req.body.adress,
        zip_code: req.body.zip_code,
        ville : req.body.ville,
        pays : req.body.pays,
        nb_postes: req.body.nb_postes,
        duree_utilisation: req.body.duree_utilisation,
        client_email : req.body.client_email,
        client_pwd : req.body.client_pwd,
        exercice: req.body.exercice,
        email: req.body.email} 
        , function(err, result){
            if(err){
                console.log(err);
            }
            console.log("RESULT: " + result);
            res.send('Done')
        });
        

});

// DELETE one 

router.delete('/:LicenceId', (req, res, next) => {
    const id = req.params.LicenceId;
     Licences.remove({_id : id})
         .exec()
         .then(result => {
             res.status(200).json({
                 message :'Licence Deleted',
                 request  :{
                     type : 'POST',
                     url :'http://localhost:3000/licences/'   
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