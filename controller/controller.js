var Pair = require('../models/models.js')
var googleTranslate = require('google-translate')('AIzaSyCXxjsWkyGpQxo4WZjWVxi-734NYycQB4M')

// operates under the assumption that calls to the database are more efficient/desirable than calls to the API
// data format doubles the potential size of the database but simplifies code
	// stores A-B and B-A Pairs in database

var nextQuestion = function(req, res) {
	req.body.wordA = callRandomWord()
	Pair.findOne(req.body, function(err, doc) {
		if (doc) { res.send(doc) }
	})
	var newPair = new Pair(req.body)
	newPair.wordB = apiTranslate(newPair)
	if (!newPair.wordB) {
		nextQuestion(req, res) // restarts search on API failure
	} else { 		
		newPair.save(function(err, storedPair) {
			invertPair(newPair).save(function(err, doc) {
				console.log('inverted pair saved')
			})
			res.send(storedPair) // no error catching
		})
	}
}

var callRandomWord = function() {
	return 'random'.toLowerCase()
	// connect random word generator API
}

var apiTranslate = function(pair) {  // ugly formatting but functional
	// googleTranslate.translate(pair.wordA, pair.langA, pair.langB, function(err, translation) {
	// 	if (err) { return } 
	// 	else     { return translation}
	// }) 
		// code fails; daily calls exceeded
		// is known error at school
	return 'translated'
}

var invertPair = function(pair) {
	return new Pair({
		wordA : pair.wordB,
		wordB : pair.wordA,
		langA : pair.langB,
		langB : pair.langA
	})
}

module.exports = {
	nextQuestion : nextQuestion,
	apiTranslate : apiTranslate
}