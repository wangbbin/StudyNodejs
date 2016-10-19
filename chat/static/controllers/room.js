//Room Controller
angular.module('technodeApp').controller('RoomCtrl', function ($scope, $routeParams, socket){

	//socket.emit('getRoom');
	var _roomId = $routeParams._roomId;
	socket.on('roomData.' + _roomId, function (room){
		$scope.room = room;
	});

	socket.on('messageAdded', function (message){
		$scope.room.messages.push(message);
	});

	socket.emit('getAllRooms', {
		_roomId: _roomId
	});

	socket.on('joinRoom', function (join){
		$scope.room.users.push(join.user);
	});

	// socket.on('online', function (user){
	// 	$scope.room.users.push(user);
	// })

	// socket.on('offline', function (user){
	// 	var _userId = user._id;
	// 	$scope.room.users = $scope.room.users.filter(function (user){
	// 		return user._id != _userId;
	// 	});
	// });
	
	socket.on('leaveRoom', function (leave){
		var _userId = leave.user._id;
		$scope.room.users = $scope.room.users.filter(function (user){
			return user._id != _userId;
		});
	});

	$scope.$on('$routeChangeStart', function (){
		socket.emit('leaveRoom', {
			user: $scope.me,
			room: $scope.room
		});
	});
	$scope.$on('$destroy', function(){
		socket.removeEventListener(['roomData.' + _roomId, 'messageAdded', 'joinRoom']);
	});
});