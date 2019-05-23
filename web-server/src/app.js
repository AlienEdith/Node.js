const path = require('path')
const express = require('express'); // return a function
const hbs = require('hbs')
// start the express
const app = express();

// set up template engine and view folders
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'));
// set up partials directory
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//customize the serverF
// set up the static folder, automatically render the index.html first
app.use(express.static(path.join(__dirname, '../public')))



// the order of route important. Express match the url in order, once matches, don't look down
app.get('', (req, res)=>{
    context = {
        title: "title"
    }
    res.render('index', context)
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/help', (req, res) => {
    res.send("Hello help")
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        name: "Help Article"
    })
})

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.get('/weather', (req, res) => {
    // parse query string (url parameters)
    if(!req.query.address){
        res.send({
            error: "Address must be provided"
        })
        return
        // can only send response once. need return
    }

    geocode(req.query.address, (error, coordinate) => {
        if(error){
            res.send({error})
            return
        }

        forecast(coordinate, (error, forcast) => {
            if(error){
                res.send(error)
                return
            }
            res.send({
                location: req.query.address,
                temperature: forcast
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        name: "Page"
    })
})

// port
app.listen(3000, () => {
    console.log("The server is running")
})