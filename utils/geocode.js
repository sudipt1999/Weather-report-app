const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3VkaXB0MTk5OSIsImEiOiJjanpmeTg3cnYwZzQ1M25sajB3MmttMGxxIn0.53ajhtfoqkRgRJgvyJVCZA&limit=1'

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

module.exports = geocode
