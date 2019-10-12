const request = require('request');
var moment = require('moment');
var timezone = require('moment-timezone');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/97d689cc5b4936bae5e1a455c18c52a0/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            body.daily.data[0].timezone = body.timezone;
            Object.keys(body.daily.data[0]).forEach( (val, ind) => {
                if(val.toString().toLowerCase().includes('time') && val != 'timezone'){
                    let ununix = moment.unix(body.daily.data[0][val]).tz(body.timezone).format('LLL');
                    body.daily.data[0][val] = ununix;
                }
            });
            callback(undefined, body.daily.data[0]);
        }
    })
}

module.exports = forecast;
