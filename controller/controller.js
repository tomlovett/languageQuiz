var googleTranslate = require('google-translate')('AIzaSyCXxjsWkyGpQxo4WZjWVxi-734NYycQB4M')


var simpleTranslate = function(req, res) {
	var text = req.body
	console.log('text: ', text)
	res.send(apiTranslate(text.word, text. from, to))
}

var apiTranslate = function(word, from, to) {
	googleTranslate.translate(word, from, to, function(err, translation) {
		console.log('err: ', err)
		console.log('translation: ', translation)
		if (err) { return err } 
		else     { return translation}
	}) 
}

// getCorrect
// storeOne
// store to

var quizTranslate = function(req, res) {
	// passing full objects back and forth
	// {word, from, to, answer, is}
	// check DB
	// else, translate through API
	googleTranslate.translate, 
}

var pullFromDatabase = function(db, word, from, )


var storeToDatabase = function(db, word, into, is) {
	// load db
	// store {into, is}
}

module.exports = {
	simpleTranslate : simpleTranslate
}