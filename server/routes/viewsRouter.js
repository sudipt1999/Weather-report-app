var express = require('express');
var router = express.Router();

//importing methods from utils
const geocode = require('../../utils/geocode')
const forecast = require('../../utils/forecast')

//importing secrets from secret file
const {geocodingApi, darkskyApi} = require('../../secret')

geocode.registerAPIKey(geocodingApi);
forecast.registerAPIKey(darkskyApi);


router.get('',(req, res)=>{
    res.render('index.hbs')
})

router.post('',(req, res)=>{
    const address = req.body.address
    if(!address){
        res.send(400)
        return
    }

    geocode.doRequest(address, (error, { latitude, longitude, location }) => {
        if (error) {
            res.send(error).status(400)
            return
        }

        forecast.doRequest(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send(error).status(400)
                return
            }

            const data = {
                location, forecastData
            }
            res.json(data).status(200)
            console.log(location)
            console.log(forecastData)
        })
    })
})


module.exports = router