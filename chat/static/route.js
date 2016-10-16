
angular.module('technodeApp').config(function($routeProvider, $locationProvider){
	
	$routeProvider.when('/', {
		templateUrl: '/pages/room.html',
		controller: 'RoomCtrl'
	}).when('/login', {
		templateUrl: '/pages/login.html',
		controller: 'LoginCtrl'
	}).otherwise({
		redirectTo: '/login'
	}); 
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});