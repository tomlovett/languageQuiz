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
		if ($scope.answer )
		// check answer: $scope.answer
		// question, answer, 'en'
		// wordA, langA, landB
		// check database

			// get answer from $http post
		// set true/false response
	}

	$scope.nextQuestion = function() {
		$scope.isCorrect     = false
		$scope.isIncorrect   = false
		$scope.pairObj = loadNextQuestion()
	}

	var loadNextQuestion = function() {
		// posts { langA : '', langB: ''}
		var langObj = {
			langA : $scope.pairObj.langA,
			langB : $scope.pairObj.langB
		}
		$http.post('/loadNext', langObj).then(function(err, returnData) {
			$scope.pairObj = returnData.data  // Pair model
		}
	}

}