angular.module('translator', [])

angular.module('translator').controller('simpleTrans', ['$scope', '$http', function($scope, $http) {

	$scope.translate = function() {
		console.log('posting: ', $scope.text)
		$http.post('/api/translate', $scope.text)
			.then(function(returnData) {
				console.log('returned: ', returnData.data)
				$scope.text = returnData.data
			})
	}

}])

angular.module('translator').controller('quizMode', ['$scope', '$http', function($scope, $http) {

	var questionNum = 1
	var incorrectAnswers = 0

	$scope.setLanguages = function() {
		$scope.pair = {}
		$scope.pair.langA = $scope.inputLangA
		$scope.pair.langB = $scope.inputLangB
		$scope.nextQuestion()
		// no language validation
			// if not valid: set to empty, show error message
	}

	$scope.submitAnswer = function() {
		if ($scope.answer.toLowerCase() == $scope.pair.wordB) {
			$scope.isCorrect   = true
		} else {
			$scope.isIncorrect = true
			incorrectAnswers += 1
			if (incorrectAnswers == 3) {
				failQuiz()
			}
		}
		if ($scope.questionNum == 10) {
			completeQuiz()
		}
	}

	$scope.nextQuestion = function() {
		questionNum += 1
		$scope.isCorrect   = false
		$scope.isIncorrect = false
		$scope.pair = loadNextQuestion()
	}

	var loadNextQuestion = function() {
		$http.post('/api/loadNext', $scope.pair)
			.then(function(returnData) {
				console.log('returnData: ', returnData)
				$scope.pair = returnData.data  // returns Pair model
			})
	}

	var completeQuiz = function() {
		'hooray!'
		var numCorrect = 10 - incorrectAnswers
	}

	var failQuiz = function() {
		'oh no! you\'re a bad person.'
	}

}])