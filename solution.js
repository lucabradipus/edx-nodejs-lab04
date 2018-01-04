const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/edx-course-db', {useMongoClient: true})

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')

let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

const Account = mongoose.model('Account', { name: String,
  name: String,
  balance: Number
})

app.get('/accounts', (req, res, next) => {
  Account.find({}, null, {sort: {_id: -1}}, (error, accounts) => {
    if (error) return next(error)
    res.send(accounts)
  })
})

app.param('id', (req, res, next) => { // OPTIONALLY: you can use middleware to fetch account object
  Account.findById(req.params.id, (error, account) => {
    req.account = account
    next()
  })
})

app.get('/accounts/:id', (req, res, next) => {
  Account.findById(req.params.id, (error, account) => {
    if (error) return next(error)
    res.send(account.toJSON())
  })
})

app.post('/accounts', (req, res, next) => {
  let newAccount = new Account(req.body)
  newAccount.save((error, results) => {
    if (error) return next(error)
    res.send(results)
  })
})

app.put('/accounts/:id', (req, res, next) => {
  Account.findById(req.params.id, (error, account) => {
    if (error) return next(error)
    if (req.body.name) account.name = req.body.name
    if (req.body.balance) account.balance = req.body.balance
    account.save((error, results) => {
      res.send(results)
    })
  })
})

app.delete('/accounts/:id', (req, res, next) => {
  Account.findById(req.params.id, (error, account) => {
    if (error) return next(error)
    account.remove((error, results) => {
      if (error) return next(error)
      res.send(results)
    })
  })
})

app.use(errorhandler())

app.listen(3000)
