// http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.WjzRnyOh3xU
let config = {}

config.mongoURI = {
  development: 'mongodb://localhost/node-testing',
  test: 'mongodb://localhost/node-test'
}

config.port = {
  development: 3000,
  test: 3010
}

module.exports = config
