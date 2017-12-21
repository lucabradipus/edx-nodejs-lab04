const Account = require('../models/account')

module.exports = {
  getAccounts(req, res) {
    //retrive all or retrieve ID
    // data = util.retrievePost(req.query.postId)
    //retrieve data
    Account.find({}, (err, results) => {
      if (err) return res.status(400).send()
      return res.status(200).send(results)

    })
  },
  addAccount(req, res) {
    //validate using mongoose
    // if (!validation.success) return res.status(406).send(validation.response)
    //create account
    let newAccount = createAccount(req.body)
//save and in the callback return result or error
//     res.status(201).send({id: id})
  },
  updateAccount(req, res) {
    //validate using mongoose
    // if (!validation.success) return res.status(406).send(validation.response)
    //retrive and updateAccount account
    updateAccount(req.body)
//save and in the callback return result or error
    res.status(200).send(result)

  },
  removeAccount(req, res) {
    //here the code
    res.status(204).send()

  }
}
