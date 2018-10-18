/**
 * 
 */
var KregChatFrontend = angular.module("KregChatFrontend", [ 'ngRoute' ]);

var BASE_URL = "http://localhost:8081/KregChatBackend/"

KregChatFrontend.config(function($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl : 'home.html',
		controller : 'HomeController'
	})
	.when('/blog', {
		templateUrl : 'k_blog/blog.html',
		controller : 'BlogController'
	}).when('/blog/:otheremail', {
		templateUrl : 'k_blog/blog.html',
		controller : 'BlogController'
	}).when('/create_blog', {
		templateUrl : 'k_blog/create_blog.html',
		controller : 'BlogController'
	}).when('/create_forum', {
		templateUrl : 'k_forum/create_forum.html',
		controller : 'ForumController'
	}).when('/list_forum/:otheremail', {
		templateUrl : 'k_forum/list_forum.html',
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


});


KregChatFrontend.service('dataService', function() {

	  // private variable
	  var _dataObj = {};

	  // public API
	  this.dataObj = _dataObj;
	});

KregChatFrontend
		.controller(
				"NavigationController",
				[
						'$scope',					
						'$http',
						'$window',
						'$location',
						'dataService',
						'$rootScope',

						function($scope, 
								$http,  $window, $location, dataService, $rootScope
							) {

							console.log('Navigation Controller');

							console.log( $window.sessionStorage.getItem("currentUser") );


							if( $window.sessionStorage.getItem("currentUser") != null && $window.sessionStorage.getItem("currentUser") != undefined )
							{
								$rootScope.LogonEmail = JSON.parse( $window.sessionStorage.getItem("currentUser") ).email;
								$rootScope.LogonRole = JSON.parse( $window.sessionStorage.getItem("currentUser") ).role;
								
								$rootScope.LoginStats = true;
								
							}
							
							else
							{
								window.setTimeout(function(){
									$("#logonMod").modal('show');
								},1000);
								$rootScope.LoginStats = false;
							}
							
							
							$scope.logout = function() {
								$window.sessionStorage.clear();
								$rootScope.LoginStats = false;
								$location.path('/home');

							}

						} 
							]);
