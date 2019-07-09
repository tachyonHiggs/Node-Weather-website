const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Tori Polda"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'about me',
        name: 'victoria'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'this is the help page',
        name: 'Tori P'
    })
})

app.get('/weather', (req,res) => {
    
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: 404,
        text: 'Help article not found',
        name: 'Tori P'
    })
})

app.get('*', (req,res) => {
    res.render('notFound', {
        title: 404,
        text: 'Page not found',
        name: 'Tori P'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})