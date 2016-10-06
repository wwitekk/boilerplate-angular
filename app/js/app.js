var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: './app/views/list.html',
			controller: 'ListCtrl as lc'
		})
		.when('/season/:year', {
			templateUrl: './app/views/seasonDetails.html',
			controller: 'DetailsCtrl as dc'
		})
		.otherwise({redirectTo: '/'});
}]);