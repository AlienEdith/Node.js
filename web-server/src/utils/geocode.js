const request = require('request')

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieWl4aW5nd2FuZyIsImEiOiJjanVkMDgzNXMwYzFrNGR0Y2lqdTZwcDBrIn0.t0T8WI4tP5uWWWlpmILvow&limit=1`
    
    request({ url,json:true}, 
        (error, { body }) => {
        if(error){
            callback('Undable to connect to location service', undefined)
        } else if(body.features.length === 0){
            callback('Unable to match the address', undefined)
        }else {
            coordinate = {
                location: address,
                lat: body.features[0].center[1],
                lng: body.features[0].center[0]
            }
            callback(undefined, coordinate)
        }
    });
    // request({ url: geoCodingUrl,json:true}, 
    //     (error, response) => {
    //     if(error){
    //         callback('Undable to connect to location service', undefined)
    //     } else if(response.body.features.length === 0){
    //         callback('Unable to match the address', undefined)
    //     }else {
    //         coordinate = {
    //             location: address,
    //             lat: response.body.features[0].center[1],
    //             lng: response.body.features[0].center[0]
    //         }
    //         callback(undefined, coordinate)
    //     }
    // });
}

module.exports = geocode