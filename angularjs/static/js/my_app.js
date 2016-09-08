var myApp = angular.module('myApp',[]);

myApp.controller('myController', function($scope, $http){
	$http.get('/user/profile').success(function(data, status, headers, config){
		$scope.user = data;
		$scope.error = '';
	}).error(function(data, status, headers, config){
		$scope.error = data;
		$scope.user = {};
	});
});