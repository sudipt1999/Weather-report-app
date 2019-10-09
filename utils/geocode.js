const request = require('request')
let geocodingApi = false;

const geocode = {
    registerAPIKey(key) {
        if (key) {
            geocodingApi = key;
            console.log('registering geolocation API with key', key);
        }
    },
    doRequest(address, callback) {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + geocodingApi +'&limit=1'

        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to location services!', { latitude: undefined, longitude: undefined, location: undefined })
            } else if (body.features.length === 0) {
                callback('Unable to find location. Try another search.', { latitude: undefined, longitude: undefined, location: undefined })
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
    }
}

module.exports = geocode
