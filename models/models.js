var mongoose = require('mongoose')

var pairSchema = mongoose.Schema({
	wordA : String,
	langA : String,
	wordB : String,
	langB : String
})

module.exports = mongoose.model('wordPair', pairSchema)