//wrap socket.io as a service
angular.module('technodeApp').factory('socket', function ($rootScope){
	var socket = io.connect('/');
	return {
		on: function (eventName, callback){
			socket.on(eventName, function (){
				var args = arguments;
				$rootScope.$apply(function (){
					callback.apply(socket, args);
				});
			});
		},
		emit: function (eventName, data, callback){
			socket.emit(eventName, data, function (){
				var args = arguments;
				$rootScope.$apply(function (){
					if (callback){
						callback.apply(socket, args);
					}
				});
			});
		},
		once: function (eventName, callback){
			socket.once(eventName, function (){
				var args = arguments;
				$rootScope.$apply(function (){
					callback.apply(socket, args);
				});
			});
		},
		removeEventListener: function(eventList){
			eventList.forEach(function(eventName){
				socket.removeEventListener(eventName);
			});
		}
	};
});