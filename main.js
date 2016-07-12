var app = angular.module('angularPalindrome', ['ngRoute']);
app.service('sharedProperties', function () {
    var text = '';
    return {
        reverseText: function(text) {
            return text.split("").reverse().join("");
        }
    }
});
app.controller('HomePageController', ['$scope', '$location', '$rootScope', 'sharedProperties', function($scope, $location, $rootScope, sharedProperties) {
    $scope.submit = function() {
        if ($scope.mainInput === null | $scope.mainInput === '' | $scope.mainInput === undefined) {
            alert('Please enter a valid word for review.');
        } else {
            $location.path('/result/'+ $scope.mainInput);
        }
    }
}]);
app.controller('ResultPageController', ['$scope', '$location', '$rootScope', 'sharedProperties', '$routeParams', function($scope, $location, $rootScope, sharedProperties, $routeParams) {
    var newtext = $routeParams.Word;
    var lowercase = newtext.toLowerCase();
    var reverse = sharedProperties.reverseText(newtext);
    var lowerReverse = reverse.toLowerCase();
    if (lowercase === '') {
        $scope.statement = 'Please return to homepage and submit a word.';
    } else if (lowercase === lowerReverse) {
        $scope.statement = newtext + ' is a palindrome!';
    } else {
        $scope.statement = newtext + ' is NOT a palindrome!';
    }
}]);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomePageController'
    })
    .when('/result/:Word', {
        templateUrl: 'views/result.html',
        controller: 'ResultPageController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);