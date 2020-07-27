var cors = require('cors')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

const app = express();
//firebase data base
const db = 'https://weather-app-777ac.firebaseio.com/accounts.json'

app.get('/login', cors(), (req, res) => {
    if(!req.query) {
        return res.send({
            error: 'Something went wrong!'
        })
    }
    request.get(db, (error, response, body) => {
        let user = JSON.parse(body);
        if(user.login === req.query.login && user.password === req.query.password) {
            res.send({
                result: 'successful'
            })
        } else {
            res.send({
                result: 'error'
            })
        }
      });
})
app.get('/weather', cors(), (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
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


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})