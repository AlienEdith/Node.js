const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if(!address){
    console.log("Please provide a address")
} else {
    geocode(address, (error, coordinate) => {
        if(error){
            console.log(error)
            return;
        }
        
        forecast(coordinate, (error, weather) => {
            if(error){
                console.log(error)
                return;
            }
            console.log(coordinate.location)
            console.log('Data', weather)
        })
    })
}

