var express = require('express');
var router = express.Router();

router.get('',(req, res)=>{
    res.render('index.hbs')
})

router.get('/home', (req, res)=>{
    res.render('home.hbs')
})

module.exports = router