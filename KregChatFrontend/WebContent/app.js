/**
 * 
 */
var KregChatFrontend = angular.module("KregChatFrontend", [ 'ngRoute' ]);

var BASE_URL = "http://localhost:8081/KregChatBackend/"

KregChatFrontend.config(function($routeProvider) {
	$routeProvider

	.when('/blog', {
		templateUrl : 'k_blog/blog.html',
		controller : 'BlogController'
	}).when('/create_blog', {
		templateUrl : 'k_blog/create_blog.html',
		controller : 'BlogController'
	}).when('/create_forum', {
		templateUrl : 'k_forum/create_forum.html',
		controller : 'ForumController'
	}).when('/list_forum', {
		templateUrl : 'k_forum/list_forum.html',
		controller : 'ForumController'
	}).when('/home', {
		templateUrl : 'home.html',
		controller : 'HomeController'
	}).when('/job', {
		templateUrl : 'k_job/job.html',
		controller : 'JobController'
	}).when('/list_job', {
		templateUrl : 'k_job/list_job.html',
		controller : 'JobController'
	}).when('/chats', {
		templateUrl : 'chats.html',
		controller : 'ChatController'
	})
	.when('/friends', {
		templateUrl : 'friends.html',
		controller : 'FriendsController'
	})
	// .otherwise('/home', {
	// templateUrl : 'home.html',
	// controller : 'HomeController'
	// })

});

KregChatFrontend
		.controller(
				"navController",
				[
						'$scope',
//						'$location',
//						'$window',
						'$http',
//						'dataService',
//						'$rootScope',
						function($scope, 
//								$location, $window, 
								$http
//							,dataService, $rootScope
							) {

							console.log('navController');

//							console.log($window.sessionStorage
//									.getItem("currentUser"));
//
//							$rootScope.LoginStatus = false;
//
//							if ($window.sessionStorage.getItem("currentUser") != null
//									&& $window.sessionStorage
//											.getItem("currentUser") != undefined) {
//								$rootScope.LoginEmail = JSON
//										.parse($window.sessionStorage
//												.getItem("currentUser")).email;
//								$rootScope.LoginRole = JSON
//										.parse($window.sessionStorage
//												.getItem("currentUser")).role;

								// dataService.dataObj.LoginStatus = true;
//
//								$rootScope.LoginStatus = true;
//
//							} else {
//								window.setTimeout(function() {
//									$("#loginModal").modal('show');
//								}, 1000);
//								$rootScope.LoginStatus = false;
//							}

							$scope.logout = function() {
								$window.sessionStorage.clear();
								$rootScope.LoginStatus = false;

								$location.path('/home');

							}

						} 
							]);
