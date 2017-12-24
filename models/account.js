const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
  name: {
    type:String,
    required: 'name is required',

  },
  balance: {
    type: Number,
    required: 'balance is required'
  }
})



module.exports = mongoose.model('Account', accountSchema)
