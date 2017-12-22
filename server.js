const config = require('./_config');
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/', routes);

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(config.mongoURI[app.settings.env], {useMongoClient:true})
const server = app.listen(config.port[app.settings.env])
module.exports =  server // for testing
