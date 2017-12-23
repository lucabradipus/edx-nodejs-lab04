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

//put here
// accountSchema.static({
//   getZeroInventoryReport: function(callback) {
//     //run a query on all books and get the ones with zero inventory
//     console.log('getZeroInventoryReport - id: ', this)
//     return callback()
//   },
//   getCountOfBooksById: function(bookId, callback){
//     //run a query and get the number of books left for a given book
//     console.log('getCountOfBooksById - id: ', this)
//     return callback()
//   }
// })
// accountSchema.pre('save', function(next) {
//   //prepare for saving
//   //upload PDF
//   console.log('pre save: ', this)
//   return next()
// })
// accountSchema.pre('remove', function(next) {
//   //prepare for removing
//   console.log('pre remove: ', this)
//   return next(e)
// })
//
// accountSchema.virtual('fullName').get(function () {
//   return this.name.first + ' ' + this.name.last;
// })



module.exports = mongoose.model('Account', accountSchema)
