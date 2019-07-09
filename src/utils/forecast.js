const request = require('request')
const darkskyToken = '917a20392a20eb18c26fdbc57640620b'

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + darkskyToken + '/' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast