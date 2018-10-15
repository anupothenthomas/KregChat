/**
 * 
 */
KregChatFrontend
		.controller(
				'HomeController',
				[
						'$scope',
						'$http',
						'$window',
						'$location',
						'$rootScope',
						'dataService',

						function($scope, $http, $window, $location, dataService, $rootScope) {		
							console.log('HomeController');
							
							
							
							if( $window.sessionStorage.getItem("currentUser") != null && $window.sessionStorage.getItem("currentUser") != undefined )
							{
								$rootScope.LogonEmail = JSON.parse( $window.sessionStorage.getItem("currentUser") ).email;
								$rootScope.LogonRole = JSON.parse( $window.sessionStorage.getItem("currentUser") ).role;
								
								console.log( $rootScope.LogonRole );
								
								$rootScope.LoginStats = true;
								$location.path("/blog");
							}
							else
							{
								window.setTimeout(function(){
									$("#logonMod").modal('show');
								},1000);
							}
							
							$scope.home = {
									'Username' : "",
									'Email' : "",
									'Password' : "",
									'Confirm Password' : "",
									'Phone' : "",
									'Gender' : ""
								}
							
							$scope.submit = function() {

								console.log($scope.home);

								$http({
									url : BASE_URL + "addUser",
									method : "POST",
									data : JSON.stringify($scope.home)
								}).then(
										function(resp) {

											console.log(resp);

											if (resp.data.msg == "Added") {
												swal("User Created", "Congratulations",
														"success")
											}

										},
										function(resp) {
											console.log(resp);

											swal("User Creation Failure",
													"Something went wrong!", "error")

										});

							}
							
							$scope.LoginStats = false;
							
							$scope.Loggon = function()
							{
								var json = 
										{
										'Email': $scope.LogonEmail.value,
										'Password': $scope.LogonPassword.value
										};
								
								console.log(json);
								
								
								$http({method:'post',url:BASE_URL + '/loginner', data: json, headers: {'Content-Type': 'application/json'}}).then(function(data){
									console.log( data )
									
									switch( data.data.msg )
									{
									default:
										
										var ember = data.data;
									
										delete ember.id;
										delete ember.password;
										
										$window.sessionStorage.setItem("currentUser",JSON.stringify(ember));
										
										$("#logonMod").modal('hide');
									
										
										$rootScope.LogonEmail = JSON.parse( $window.sessionStorage.getItem("currentUser") ).email;
										
										$rootScope.LogonRole = JSON.parse( $window.sessionStorage.getItem("currentUser") ).role;
										
										window.setTimeout(function(){
//											$scope.$apply( $location.path('/blog') );
											$scope.$apply( $scope.LoginStats = dataService.dataObj.LoginStats = true );
											$scope.$apply( $rootScope.LoginStats = true );
											
										},500);
										swal({
											title: "User Login Success",   
										      text: "Please enter correct credentials!",   
										      type: "Success" });
										
										break;
										
									case 'Failure':
										swal("User Login Failure", "Please enter correct credentials!", "error")
										break;
									}
									
								},function(data){
									console.log( data )
									
									switch( data.data.msg )
									{
									default:
										
										$("#logonMod").modal('hide');
										$rootScope.LogonEmail = JSON.parse( $window.sessionStorage.getItem("currentUser") );
										$location.path('/blog');
										$scope.$apply( $scope.LoginStats = dataService.dataObj.LoginStats = true );
										break;
										
									case 'Failure':
										swal("User Login Failure", "Please enter correct credentials!", "error")
										break;
									}
								});
							}
						

							$scope.Username = {
								value : '',
								error : true,
								touched : false,
								validate : function() {
									this.touched = true;
									var reg = /^$/;
									$scope.Username.error = reg
											.test($scope.Username.value);
								}
							}
							
							$scope.LogonEmail = 
							{ 
									value: '',
									error : true,
									touched : false,
									validate: function(){
										this.touched = true;
										var reg = /^$/;
										this.error = reg.test( this.value );
									}
							}
							
							$scope.LogonPassword = 
							{ 
									value: '',
									error : true,
									touched : false,
									validate: function(){
										this.touched = true;
										var reg = /^$/;
										this.error = reg.test( this.value );
									}
							}

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

							$scope.Password = {
								value : '',
								error : true,
								touched : false,
								validate : function() {
									this.touched = true;
									var reg = /^.{8,20}$/;
									this.error = !reg.test(this.value);
								}
							}

							$scope.ConfirmPassword = {
								value : '',
								error : true,
								touched : false,
								validate : function() {
									this.touched = true;
									this.error = (this.value != $scope.Password.value);
								}
							}

							$scope.Phone = {
								value : '',
								error : true,
								touched : false,
								validate : function() {
									this.touched = true;
									var reg = /^[7-9]{1}[0-9]{9}$/;
									this.error = !reg.test(this.value);
								}
							}

							$scope.RegisterUser = function() {
								var json = {
									'Username' : $scope.Username.value,
									'Email' : $scope.Email.value,
									'Password' : $scope.Password.value,
									'Phone' : $scope.Phone.value,
									'Gender' : $scope.Gender
								};

								console.log(json);
								// alert(json);

								$http({
									method : 'post',
									url : BASE_URL + '/addUser',
									data : json,
									headers : {
										'Content-Type' : 'application/json'
									}
								})
										.then(
												function(data) {
													console.log(data)

													switch (data.data.msg) {
													case 'Success':

														swal(
																"User Created",
																"Login to continue",
																"success")

														break;

													case 'Failure':
														swal(
																"User Creation Failure",
																"Something went wrong!",
																"error")
														break;
													}

												},
												function(data) {
													console.log(data)

													switch (data.data.msg) {
													case 'Success':

														swal(
																"User Created",
																"Login to continue",
																"success")

														break;

													case 'Failure':
														swal(
																"User Creation Failure",
																"Something went wrong!",
																"error")
														break;
													}
												});
							}

						} ]);