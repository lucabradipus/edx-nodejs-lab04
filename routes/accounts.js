const Account = require('../models/account')


module.exports = {
  getAccounts(req, res) {
    const callback = (err, result) => {
      if (err) return res.status(400).send()
      if (result) {
        return res.status(200).send(result)
      } else {
        return res.status(404).send(result)
      }
    }

    if (req.query.accountId) {
      Account.findById(req.query.accountId, callback)
    } else {
      Account.find({}, callback)
    }
  },
  addAccount(req, res) {
    let newAccount = new Account(req.body)
    newAccount.save((err, account) => {
      if (err) {
        return res.status(406).send(err)
      }
      res.status(201).send(account)

    })
  },
  updateAccount(req, res) {
    Account.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) => {
      if (err) return res.status(406).send(err)
      res.status(200).send(result)

    })

  },
  removeAccount(req, res) {
    Account.findByIdAndRemove(req.params.id, (err, result) => {
      if (err) return res.status(406).send(err)
      if (result === null)
        return res.status(404).send()
      else
        return res.status(204).send()

    })

  }
}
