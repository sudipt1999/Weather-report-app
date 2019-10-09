# Weather App
A app that will give you the current weather report of a given location

This app uses the Mapbox Geolocation API along with

## Getting Started

### Required API Keys
This application uses the [Mapbox](https://www.mapbox.com/) geolocation API to determine the precise lattitude and longitude of a given location.

1. Register for a [Mapbox account](https://account.mapbox.com/auth/signin/)
2. Navigate to the [Tokens dashboard](https://account.mapbox.com/access-tokens/) and create a new public token.


The latitude and longitute are fed into the [Dark Sky](https://darksky.net/dev) weather API, which retrieves an accurate forecast for the selected location.
1. Sign up for the [Dark Sky API](https://darksky.net/dev/register)
2. After signing in, you will get a secret key

Both Mapbox and Dark Sky are paid services that allow for up to 1000 calls a day for free. If you wish to host this application publicly, you may need to upgrade your API access.

### Configure the application with your API keys
1. Create a ```secret.js``` file in root dir
2. Add your Api key from Darksky Api and Mapbox
```
let apiKey  =  {
    geocodingApi: YOUR API KEY,
    darkskyApi: YOUR API KEY,
};

module.exports = apiKey
```


### Running the Project
1. run ```npm install``` in the root dir
2. run ```npm start``` in terminal to start the server
3. point your browser to ```localhost:3000``` (default)
4. Enjoy the project

### Resources
- [Mapbox Geolocation API](https://docs.mapbox.com/api/search/)
- [Dark Sky Weather API](https://darksky.net/dev/docs)