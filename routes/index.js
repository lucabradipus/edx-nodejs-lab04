const accounts = require('./accounts')
const express = require('express')
const router = express.Router()

router.get('/accounts', accounts.getAccounts)
router.post('/accounts', accounts.addAccount)
router.put('/accounts/:id/', accounts.updateAccount)
router.delete('/accounts/:id/', accounts.removeAccount)

module.exports = router
