var Pair = require('../models/models.js')
var googleTranslate = require('google-translate')('AIzaSyCXxjsWkyGpQxo4WZjWVxi-734NYycQB4M')

var loadNextQuestion = function(req, res) {
	var req.body.word = callRandomWord()
	var pairObj = pullFromDatabase(req.body)
	if (pairObj) {
		res.send(pairObj)
	} else {
		pairObj = new Pair({
			wordA : req.body.word,
			langA : req.body.langA,
			langB : req.body.langB
		pair.wordB = apiTranslate(pairObj)
	}
	if (pair.wordB) { 		
		pair.save(function(err, storedPair) {
			res.send(storedPair)
		}
	} else { // restarts search on API failure
		loadNextQuestion(req, res) 
	}
}

var callRandomWord = function() {
	return 'randomWordAPI'

}

var pullFromDatabase = function(bodyObj) {
	// bodyObj = {question: '', from: '', to: ''}
	// wordPairObj = {wordA, langA, wordB, langB}
	// a = look (wordA : bodyObj., langA, langB)
	// b = look (wordB, langB, langA)
	// if (a = {Pair}.findOne(a)) return a
	// else return {Pair}.findOne(b)
	return
	// the biggest pain point, contemplating using another data structure, or simply accepting that this function will be ugly
	// doubling up the database? space on the database VS. concise code
}

var apiTranslate = function(pair) {  // not pretty, but good to go
	googleTranslate.translate(pair.wordA, pair.langA, pair.langB, function(err, translation) {
		console.log('err: ', err)
		console.log('translation: ', translation)
		if (err) { return } 
		else     { return translation}
	}) 
}


module.exports = {
	simpleTranslate : simpleTranslate,

}