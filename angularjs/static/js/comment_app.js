var myApp = angular.module('myApp', []);

myApp.service('commentSrv', ['$http', CommentObj]);
function CommentObj($http){
	this.getComment = function (commentId, callback){
		$http.get('/comments/get', {params: {commentId: commentId}})
				.success(function ( data, status, headers, config){
					callback(null, data);
				})
				.error(function ( data, status, headers, config){
					callback(data, {});
				});
	};

	this.addComment = function ( rootCommentId, parentId, newComment, callback){
		$http.post('/comments/add', {rootCommentId: rootCommentId,
																 parentCommentId: parentId,
																 newComment: newComment})
				.success(function ( data, status, headers, config){
					callback(null, data);
				})
				.error(function ( data, status, headers, config){
					//callback(data, {});
				});
	};
}

myApp.controller('photoController', function ($scope, $http, commentSrv){
	$http.get('/photos')
			.success(function (data, status, headers, config){
				$scope.photos = data;
				$scope.photo = data[0];
				$scope.loadComments();
			})
			.error( function ( data, status, headers, config){
				$scope.photos = [];
			});

	$scope.loadComments = function (){
		if ($scope.photo){
			commentSrv.getComment($scope.photo.commentId, function (err, comment){
				if (err){
					$scope.commentThread = {};
				} else {
					$scope.commentThread = comment;
				}
			});
		}
	};

	$scope.addReply = function (parentCommentId, subject, body){
		var newComment = { subject: subject, body: body};
		commentSrv.addComment($scope.commentThread._id, parentCommentId, newComment, function (err, comment){
			$scope.loadComments();
		});
	};

	$scope.setPhoto = function (photoId){
		$http.get('/photo', {params: { photoId, photoId}})
				.success(function (data, status, headers, config){
					$scope.photo = data;
					$scope.loadComments();
				})
				.error(function ( data, status, headers, config){
					$scope.photo = {};
				});
	};
});

myApp.controller('pageController', function ($scope, $http, commentSrv){
	$http.get('page', {params: { pageName: 'Photos Page'}})
			.success(function (data, status, headers, config){
				$scope.page = data;
				$scope.loadComments();
			})
			.error(function ( data, status, headers, config){
				$scope.page = {};
			});

		$scope.loadComments = function (){
		if ($scope.page){
			commentSrv.getComment($scope.page.commentId, function (err, comment){
				if (err){
					$scope.commentThread = {};
				} else {
					$scope.commentThread = comment;
				}
			});
		}
	};

	$scope.addReply = function (parentCommentId, subject, body){
		var newComment = { subject: subject, body: body};
		commentSrv.addComment($scope.commentThread._id, parentCommentId, newComment, function (err, comment){
			$scope.loadComments();
		});
	};

});