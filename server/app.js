//importing secrets from secret file
const {geocodingApi, darkskyApi} = require('../secret')

//importing predefined modules in node
const path = require('path');


//importing installed modules
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser');



//creating a express server
const app = express()

//configuring app to use handelbars view-engine
app.set('view engine', 'hbs')

//configuring the views
const __staticpath = path.join(__dirname , '../views')
app.set('views', __staticpath)

//configuring static path for js and css
app.use(express.static(__staticpath))

// for parsing application/json
app.use(bodyParser.json()); 

//importing the routers and using them in express
const viewsRouter = require('./routes/viewsRouter')
app.use(viewsRouter)





// axios.post(`https://us1.locationiq.com/v1/search.php?key=da9e1ca0b70c11&q=Dehradun&format=json`)
// .then(res=>{
//     console.log(res.data)
// })
// .catch(err=>{
//     console.log("Error Occured")
//     console.log(err)
// })

// axios.get(`https://api.darksky.net/forecast/97d689cc5b4936bae5e1a455c18c52a0/37.8267,-122.4233`)
// .then(res=>{
//     console.log(res.data)
// })
// .catch(err=>{
//     console.log("Error Occured")
//     console.log(err)
// })


const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Started at ${port}`)
})