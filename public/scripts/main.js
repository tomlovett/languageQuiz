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

	var incorrectAnswers = 0

	$scope.newRound = function() {
		$scope.questionNum = 0
		incorrectAnswers   = 0

		$scope.failed = false
		$scope.winner = false

		$scope.pair = {}
		$scope.pair.langA = $scope.inputLangA
		$scope.pair.langB = $scope.inputLangB

		$scope.nextQuestion()
		// no language validation
			// if not valid: set to empty, show error message
	}

	$scope.submitAnswer = function() {
		if ($scope.isIncorrect || $scope.isCorrect) { return}
		if ($scope.failed || $scope.winner) { return }
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
		$scope.questionNum += 1
		$scope.isCorrect   = false
		$scope.isIncorrect = false
		$scope.pair = loadNextQuestion()
	}

	var loadNextQuestion = function() {
		$scope.answer = ''
		$http.post('/api/loadNext', $scope.pair)
			.then(function(returnData) {
				console.log('returnData: ', returnData)
				$scope.pair = returnData.data  // returns Pair model
			})
		console.log('isCorrect, isIncorrect: ', $scope.isCorrect, $scope.isIncorrect)
		console.log('winner, failed: ', $scope.winner, $scope.failed)
	}

	var completeQuiz = function() {
		var numCorrect = 10 - incorrectAnswers
		$scope.questionNum = 0
	}

	var failQuiz = function() {
		$scope.failed = true
		// $scope.questionNum = 0
		$scope.pair = {}
	}

}])