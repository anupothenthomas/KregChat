/**
 * 
 */
KregChatFrontend
		.controller(
				'HomeController',
				[
						'$scope',
						'$http',

						function($scope, $http ) {		
							console.log('HomeController');
							
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