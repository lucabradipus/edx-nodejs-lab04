const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
  name: {
    type:String,
    required: 'name is required',

  },
  balance: {
    type: Number,
    required: 'balance is required'
  },
  author: {
    firstName : String,
    lastName : String,
    myobj: mongoose.Schema.Types.Mixed
}

})


// console.log("__dirname",__dirname)
accountSchema.virtual('authorFullName')
    .get(function(){
      if (this.author && this.author.firstName && this.author.lastName)
        return `${this.author.firstName}  ${this.author.lastName}`
      else return 'N/A'
    })




module.exports = mongoose.model('Account', accountSchema)
