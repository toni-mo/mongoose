// Router agencies module
const express = require('express');

const router = express.Router();

const Agency = require('./models/agency');

router.get('/', function(req, res){
    
    // Needs to be looked through
    Agency.find().exec().then(function(docs){
        console.log(docs);
        res.render('agencies', {agencies: docs});    
    });

    

});

module.exports = router;