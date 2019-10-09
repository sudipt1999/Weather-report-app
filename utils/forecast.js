const request = require('request')
let darkSkyApiKey = false;

const forecast = {
    registerAPIKey(key) {
        if (key) {
            darkSkyApiKey = key;
            console.log('registering forecast with key', key);
        }
    },

    doRequest(latitude, longitude, callback) {
        const url = `https://api.darksky.net/forecast/${darkSkyApiKey}/${latitude}, ${longitude}`;

        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } else {
                console.log(body)
                callback(undefined, body.daily.data[0])
            }
        })
    }
}

module.exports = forecast
