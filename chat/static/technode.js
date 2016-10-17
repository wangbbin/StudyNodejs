
angular.module('technodeApp', ['ngRoute', 'angularMoment'])
.run(function ($window, $rootScope, $http, $location){
	$window.moment.locale('zh-cn');
	$http({
		url: '/api/validate',
		method: 'get'
	}).success(function (user){
		$rootScope.me = user;
		$location.path('/');
	}).error(function (data){
		$location.path('/login');
	});

	$rootScope.logout = function (){
		$http({
			url: '/api/logout',
			method: 'get'
		}).success(function (){
			$rootScope.me = null;
			$location.path('/login');
		}).error(function (){
			$rootScope.me = null;
		});
	};

	$rootScope.$on('login', function (evt, me){
		$rootScope.me = me;
	});
});

