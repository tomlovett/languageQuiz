var googleTranslate = require('google-translate')('AIzaSyCXxjsWkyGpQxo4WZjWVxi-734NYycQB4M')

// passing wordPair back and forth
var wordpair = {
	langA : '',
	langB : '',
	wordA : '',
	wordB : ''
}

var loadNextQuestion = function(req, res) {
	req.body.question = callRandomWord()
	// does not account for API failure
		// if failed would pull random word from db
			// if db empty, well...
	req.body.answer = pullFromDatabase(req.body)
	if (req.body.answer) {
		res.send(req.body)
	} else {
		req.body.answer = apiTranslate()
	}
	if (req.body.answer) { 		// restarts search on API failure
		storeToDatabase(req.body)
		res.send(req.body)
	} else {
		loadNextQuestion(req, res) 
	}
}

var callRandomWord = function() {
	return 'randomWordAPI'

}

var pullFromDatabase = function(wordPair) {
	// a = look (word, langA, langB)
	// b =look (word, langB, langA)
	// if (a) return a
	// else return b
	return
	// the biggest pain point, contemplating using another data structure, or simply accepting that this function will be ugly
}

var apiTranslate = function(wordPair) {
	var wordPair = quest
	googleTranslate.translate(word, from, to, function(err, translation) {
		console.log('err: ', err)
		console.log('translation: ', translation)
		if (err) { return } 
		else     { return translation}
	}) 
}

var storeToDatabase = function(wordPair) {
	// langFrom, langTo, wordFrom, wordTo
	// storeOne
	// store to
	// nested functions?
}

module.exports = {
	simpleTranslate : simpleTranslate
}