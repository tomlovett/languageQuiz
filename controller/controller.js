var googleTranslate = require('google-translate')('AIzaSyCXxjsWkyGpQxo4WZjWVxi-734NYycQB4M')

var simpleTranslate = function(req, res) {
	var text = req.body
	console.log('text: ', text)
	googleTranslate.translate(text.word, text.from, text.to, function(err, translation) {
		console.log('err: ', err)
		console.log('translation: ', translation)
		res.send(translation)
	})
}

module.exports = {
	simpleTranslate : simpleTranslate
}