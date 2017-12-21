const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/lab4', {useMongoClient:true})
const express = require('express')

const logger = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./routes')



const app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/', routes);

const server = app.listen(3000)
module.exports = {app: app, server: server} // for testing
