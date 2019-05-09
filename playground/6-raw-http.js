// HTTP request without library

const https = require('https');

const url = "https://api.darksky.net/forecast/12067da30240acdb2f71fecf8a1e5f9a/40,-75"

const request = https.request(url, response => {
    
    let data = ''

    // http response sent in stream, listen to the 'data', could be multiple time
    response.on('data', chunk => {
        data = data + chunk.toString();
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body.currently.temperature)
    })
})

request.on('error', (error) => {
    console.log("Error: ", error)
})

request.end()   //actually send to request
