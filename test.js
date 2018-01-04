const mongodb = require('mongodb')

const MongoClient = {connect: mongodb.connect}
mongoose.connect('mongodb://localhost:27017/edx-course-db', {useMongoClient: true})
// const {MongoClient} = mongodb
// const MongoClient = mongodb
// const MongoClient = mongodb.client
MongoClient.connect('mongodb://localhost:27017/edx-course-db', (err, db) => {
  if (err) return process.exit(1)
  console.log('Kudos. Connected successfully to server')
  db.close()
})

