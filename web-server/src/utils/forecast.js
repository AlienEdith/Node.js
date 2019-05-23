const request = require('request')

const forecast = (coordinate, callback) => {

    const url = `https://api.darksky.net/forecast/12067da30240acdb2f71fecf8a1e5f9a/${coordinate.lat},${coordinate.lng}`

    request({url, json: true},
             (error, { body }) => {
                if(error){
                    callback("Unable to connect to weather service",undefined)
                } else if (body.error){
                    callback("Unable to find location",undefined)
                } else {
                    callback(undefined, body.currently.temperature)
                }
            })
}

module.exports = forecast