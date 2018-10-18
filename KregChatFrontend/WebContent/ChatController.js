/**
 * 
 */
KregChatFrontend
		.controller(
				'ChatController',
				[
						'$scope',
						'$location',
						'$window',
						'$http',
						'$rootScope',
						function($scope, $location, $window, $http, $rootScope) {

							console.log('Chat Controller')
							
							if ($window.sessionStorage.getItem("currentUser") == null
									|| $window.sessionStorage
											.getItem("currentUser") == undefined) {

								$('.modal').modal('hide');
								$('.modal-backdrop').remove();
								$location.path("/");
							}

							console.log($rootScope)

							$scope.Email = {
								value : '',
								error : true,
								touched : false,
								validate : function() {
									this.touched = true;
									var reg = /\S+@\S+\.\S+/;
									this.error = !reg.test(this.value);
								}
							}

							$scope.EMessage = {
								value : '',
								error : true,
								touched : false,
								validate : function() {
									this.touched = true;
									var reg = /^.{2,160}$/;
									this.error = !reg.test(this.value);
								}
							}

							var socket = new WebSocket(
									"ws://localhost:8081/KregChatBackend/chat");

							// $scope.onConnectClick = function() {
							// var socket = new WebSocket(
							// "ws://localhost:8081/KregChatBackend/chat");

							/*------------------------- SOCKET OPEN-------------------------*/

							socket.onopen = function() {

								console.log(socket)

								var json = {
									"from" : $rootScope.LogonEmail,
									"msg" : "connect:" + $rootScope.LogonEmail
								}

								socket.send(JSON.stringify(json))

								socket.onmessage = function(data) {

									if (data.data.startsWith("disconnect")) {

										console.log("disconnect");

										console.log(data.data.split(":")[1]);

										$scope
												.$apply($scope.AllOnliners
														.splice(
																$scope.AllOnliners
																		.indexOf(data.data
																				.split(":")[1]),
																1));

									} else if (data.data.startsWith("connect")) {

										console.log("connect");
										console.log(data.data.split(":")[1]);

										$scope.$apply($scope.AllOnliners
												.push(data.data.split(":")[1]));

									} else {

										$scope.$apply($scope.messages.push(JSON
												.parse(data.data)));

									}

								}

								window.setTimeout(function() {

									$scope.$apply($scope.fetchAllOnliners());

								}, 2000);

							}

							/*------------------------- SOCKET CLOSE-------------------------*/

							socket.onclose = function() {
								if (socket.readyState === WebSocket.OPEN) {
									socket.close();
									console.log("WebSocket: Disconnected");

								}

							}

							$scope.EMessage = {
								value : '',
								error : true,
								touched : false,
								validate : function() {
									this.touched = true;
									var reg = /^.{2,160}$/;
									this.error = !reg.test(this.value);
								}
							}

							$scope.messages = [];

							$scope.AllOnliners = [];

							/*-----------------------------------------------*/

							$scope.fetchAllOnliners = function() {

								$http(
										{
											method : 'get',
											url : BASE_URL
													+ 'fetchAllOnliners?myemail='
													+ $rootScope.LogonEmail,
											headers : {
												'Content-Type' : 'application/json'
											}
										}).then(function(resp) {
									console.log(resp.data)

									$scope.AllOnliners = resp.data;
								}, function(resp) {

									console.log("fetchAllOnliners Error")
								});

							}

							$scope.fetchAllOnliners();

							/*-----------------------------------------------*/

							$scope.sendMessage = function() {

								if (WebSocket.readyState != WebSocket.OPEN) {

									var json = {
										"from" : $rootScope.LogonEmail,
										"msg" : $scope.EMessage.value
									}

									console.log(json);
									($scope.messages.push(json));

									socket.send(JSON.stringify(json));

								}
							}
							//			}

							$scope.currentChatHeads = []

							$scope.addChatHead = function(arg) {

								if ($scope.currentChatHeads.indexOf(arg) == -1)
									$scope.currentChatHeads.push(arg);

								console.log($scope.currentChatHeads)

							}

							$scope.closeChatHead = function(arg) {

								if ($scope.currentChatHeads.indexOf(arg) != -1)
									$scope.currentChatHeads.splice(
											$scope.currentChatHeads
													.indexOf(arg), 1);

								console.log($scope.currentChatHeads)

							}

						} ]);