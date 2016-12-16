 angular.module("coffee-time", ['ui.router'])
 
 .controller("HelloController", function ($scope) {
 	$scope.helloTo = {};
 	$scope.helloTo.title = "AngularJS";

 	console.log("im working");
 })

 .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
 	$urlRouterProvider.otherwise('/');

 	$stateProvider
 		
		.state('root', {
			url: '',
			views: {
				'trending':{
					url: '/',
 					templateUrl: 'App/trendingV.html',
					controller: 'HelloController'
				},
				'transaction': {
					url: '/',
 					templateUrl: 'App/transactionV.html'
				},
				'calendar':{
					url: '/',
 					templateUrl: 'App/trendingV.html'
				}
			}
	})

 }]);

 
 
 