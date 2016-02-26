angular.module('translator', [])

angular.module('translator').controller('simpleTrans', ['$scope', '$http', simpleTrans])

function simpleTrans($scope, $http) {

	$scope.translate = function() {
		console.log('posting: ', $scope.text)
		$http.post('/api/translate', $scope.text)
			.then(function(returnData) {
				console.log('returned: ', returnData.data)
				$scope.translatedText = returnData.data
			})
	}

}

angular.module('translator').controller('quizMode', ['$scope', '$https', quizMode])

// operates under the assumption that calls to the database are more efficient/more desirable than calls to the API

function quizMode($scope, $http) {

	$scope.setLanguage = function() {
		$scope.langSet = true
	}

	$scope.submitAnswer = function() {
		// check answer: $scope.answer
			// check database
			// get answer from $http post
		// set true/false response

	}

	var getCorrect = function() {
		// check database first
			// return
		// call to server,
			// question, from, to
		// store to database
	}

	$scope.nextQuestion = function() {
		$scope.correct = false
		$scope.incorrect = false
		// call next
		$liveQuestion = "set me"
	}

}