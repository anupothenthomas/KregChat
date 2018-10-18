/**
 * 
 */

KregChatFrontend.controller('FriendsController', [
				'$scope',
				'$location',
				'$window',
				'$http',
				'$rootScope',
				function($scope , $location, $window , $http, $rootScope) {

					console.log('Friend Controller')
					
	if( $window.sessionStorage.getItem("currentUser") == null || $window.sessionStorage.getItem("currentUser") == undefined )
	{
		
		$('.modal').modal('hide');
		$('.modal-backdrop').remove();
		$location.path("/");
	}
					
					console.log($rootScope)
					
					
						$scope.Email = {
						value : $rootScope.LogonEmail,
						error : true,
						touched : false,
						validate : function() {
							this.touched = true;
							var reg = /\S+@\S+\.\S+/;
							this.error = !reg.test(this.value);
						}
					}

//					$scope.Connecteros = function() {
						console.log("This is friends connector")

						var json = {
							"myemail" : $scope.Email.value,
						}

						console.log(json);

						$http({
							method : 'post',
							url : BASE_URL + 'getAllUsersExceptMe',
							data : json,
							headers : {
								'Content-Type' : 'application/json'
							}
						}).then(function(data) {
							
							console.log("getAllUsersExceptMe Success Response:")
							
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								console.log( data.data )
								
								$scope.AllFriends = data.data.list;
								
								break;

							case 'Failure':
								swal("Failed", "Something went wrong!", "error")
								break;
							}

						}, function(data) {
							swal("Failed", "Something went wrong!", "error")
						});
//					}

					/*-----------------------------------------ALL FRIENDS ARRAY--------------------------------------------*/

					$scope.AllFriends = [];
					/*-----------------------------------------FETCH ALL FRIENDS--------------------------------------------*/

					$scope.fetchAllFriends = function() {

						$http(
								{
									method : 'get',
									url : BASE_URL + 'fetchAllFriends?myemail='
											+ $scope.Email.value,
									headers : {
										'Content-Type' : 'application/json'
									}
								}).then(function(resp) {
							console.log(resp.data)

							$scope.AllFriends = resp.data;
						}, function(resp) {

							console.log("fetchAllFriends Error")
						});

					}

//					$scope.fetchAllFriends();
					/*-----------------------------------------ADD FRIEND--------------------------------------------*/

					$scope.AddFriend = function(arg1, arg2) {
						var json = {
							'alphaEmail' : arg1,
							'omegaEmail' : arg2
						};

						console.log(json);
						// alert(json);

						$http({
							method : 'post',
							url : BASE_URL + '/addFriend',
							data : json,
							headers : {
								'Content-Type' : 'application/json'
							}
						}).then(function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Friend Request Sent", "", "success")

								$scope.Connecteros();

								break;

							case 'Failure':
								swal("Failed", "Something went wrong!", "error")
								break;
							}

						}, function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Friend Request Sent", "", "success")

								$scope.fetchAllFriends();

								break;

							case 'Failure':
								swal("Failed", "Something went wrong!", "error")
								break;
							}
						});
					}

					/*-----------------------------------------UN-FRIEND--------------------------------------------*/

					$scope.UnFriend = function(arg1, arg2) {
						var json = {
							'alphaEmail' : arg1,
							'omegaEmail' : arg2
						};

						console.log(json);
						// alert(json);

						$http({
							method : 'post',
							url : BASE_URL + '/unFriend',
							data : json,
							headers : {
								'Content-Type' : 'application/json'
							}
						}).then(function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Friend Removed", "", "success")

								$scope.fetchAllFriends();

								break;

							case 'Failure':
								swal("Failed", "Something went wrong!", "error")
								break;
							}

						}, function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Friend Removed", "", "success")

								$scope.fetchAllFriends();

								break;

							case 'Failure':
								swal("Failed", "Something went wrong!", "error")
								break;
							}
						});
					}

					/*-----------------------------------------UNDO-FRIEND-REQUEST-------------------------------------------*/

					$scope.UndoFriend = function(arg1, arg2) {
						var json = {
							'alphaEmail' : arg1,
							'omegaEmail' : arg2
						};

						console.log(json);
						// alert(json);

						$http({
							method : 'post',
							url : BASE_URL + '/undoFriend',
							data : json,
							headers : {
								'Content-Type' : 'application/json'
							}
						}).then(function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Friend Request Undone", "", "success")

								$scope.Connecteros();

								break;

							case 'Failure':
								swal("Failed", "Something went wrong!", "error")
								break;
							}

						}, function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Friend Request Undone", "", "success")

								$scope.Connecteros();

								break;

							case 'Failure':
								swal("Failed", "Something went wrong!", "error")
								break;
							}
						});
					}

					/*-----------------------------------------ACCEPT-FRIEND-REQUEST-------------------------------------------*/

					$scope.AcceptFriend = function(arg1, arg2) {
						var json = {
							'alphaEmail' : arg1,
							'omegaEmail' : arg2
						};

						console.log(json);
						// alert(json);

						$http({
							method : 'post',
							url : BASE_URL + '/acceptFriend',
							data : json,
							headers : {
								'Content-Type' : 'application/json'
							}
						}).then(function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Friend Request Accepted", "", "success")

								$scope.Connecteros();

								break;

							case 'Failure':
								swal("Failed", "Something went wrong!", "error")
								break;
							}

						}, function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Friend Request Accepted", "", "success")

								$scope.Connecteros();

								break;

							case 'Failure':
								swal("Failed", "Something went wrong!", "error")
								break;
							}
						});
					}

				} ]);