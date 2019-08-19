const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/97d689cc5b4936bae5e1a455c18c52a0/' + latitude + ',' + longitude

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

module.exports = forecast
