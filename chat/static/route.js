
angular.module('technodeApp').config(function($routeProvider, $locationProvider){
	
	$routeProvider.when('/room/:_roomId', {
		templateUrl: '/pages/room.html',
		controller: 'RoomCtrl'
	}).when('/login', {
		templateUrl: '/pages/login.html',
		controller: 'LoginCtrl'
	}).when('/rooms', {
		templateUrl: '/pages/rooms.html',
		controller: 'RoomsCtrl'
	}).otherwise({
		redirectTo: '/login'
	}); 
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});