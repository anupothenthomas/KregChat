/**
 * 
 */

/*----------------MAIN-------------------*/
KregChatFrontend
		.controller(
				'BlogController',
				[
						'$scope',
						'$http',
						function($scope, $http) {

							console.log('BlogController');

							$scope.blog = {
								"title" : "",
								"description" : "",
								"date" : "",
								"email" : null
							}

							/*----------------ADD BLOG SUBMIT-------------------*/

							$scope.submit = function() {

								console.log($scope.blog);

								$http({
									url : BASE_URL + "addBlog",
									method : "POST",
									data : JSON.stringify($scope.blog)
								}).then(
										function(resp) {

											console.log(resp);

											if (resp.data.msg == "Success") {
												swal("Blog Created",
														"Congratulations",
														"success")
											}

										},
										function(resp) {
											console.log(resp);

											swal("Blog Creation Failure",
													"Something went wrong!",
													"error")

										});

							}

							/*----------------RESET-------------------*/

							$scope.reset = function() {

								$scope.blog = {
									"title" : "",
									"description" : "",
									"date" : ""
								}

							}

							/*----------------EDIT BLOG-------------------*/

							$scope.Eid = -1;

							$scope.ETitle = {
								value : '',
								error : false,
								touched : true,
								validate : function() {
									this.touched = true;
									var reg = /^.{2,20}$/;
									this.error = !reg.test(this.value);

									console.log(this.error);

								}
							}

							$scope.EDescription = {
								value : '',
								error : false,
								touched : true,
								validate : function() {
									this.touched = true;
									var reg = /^.{2,160}$/;
									this.error = !reg.test(this.value);
								}
							}

							$scope.EditBlog = function(arg) {

								for ( var x in $scope.AllBlogs) {
									console.log($scope.AllBlogs[x]);
									console.log(arg);

									if ($scope.AllBlogs[x].id == arg) {
										console.log($scope.AllBlogs[x].id);

										$scope.Eid = $scope.AllBlogs[x].id;
										$scope.ETitle.value = $scope.AllBlogs[x].title;
										$scope.EDescription.value = $scope.AllBlogs[x].description;
										break;
									}

								}

							}

							/*----------------EDIT BLOG TO DATABASE-------------------*/

							$scope.EditBlogToDB = function() {
								var json = {
									'id' : $scope.Eid,
									'Title' : $scope.ETitle.value,
									'Description' : $scope.EDescription.value,

								};

								console.log(json);
								// alert(json);

								$http({
									method : 'post',
									url : BASE_URL + '/editBlog',
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

														swal("Blog Updated",
																"Congo",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllBlogs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllBlogs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllBlogs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Blog Update Failure",
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
																"Blog Updated",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllBlogs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllBlogs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllBlogs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Blog Update Failure",
																"Something went wrong!",
																"error")
														break;
													}
												});
							}

							/*----------------ALL BLOGS ARRAY-------------------*/

							$scope.AllBlogs = [];

							/*----------------FETCH ALL BLOGS-------------------*/

							$scope.fetchAllBlogs = function() {

								$http({
									method : 'get',
									url : BASE_URL + 'fetchAllBlogs',
									headers : {
										'Content-Type' : 'application/json'
									}
								}).then(function(resp) {
									console.log(resp.data)

									$scope.AllBlogs = resp.data;
								}, function(resp) {

									console.log("fetchAllBlogs Error")
								});

							}

							$scope.fetchAllBlogs();

							/*----------------TITLE DEFINED-------------------*/

							$scope.Title = {
								value : '',
								error : true,
								touched : false,
								validate : function() {
									this.touched = true;
									var reg = /^.{2,20}$/;
									this.error = !reg.test(this.value);

									console.log(this.error);

								}
							}

							/*----------------DESCRIPTION DEFINED-------------------*/

							$scope.Description = {
								value : '',
								error : true,
								touched : false,
								validate : function() {
									this.touched = true;
									var reg = /^.{2,160}$/;
									this.error = !reg.test(this.value);
								}
							}

							/*----------------ADD BLOG-------------------*/

							$scope.AddBlog = function() {
								var json = {
									'Email' : $rootScope.LoginEmail,
									'Title' : $scope.Title.value,
									'Description' : $scope.Description.value,
								};

								console.log(json);

								$http({
									method : 'post',
									url : BASE_URL + '/addBlog',
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
																"Blog Created",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllBlogs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllBlogs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllBlogs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Blog Creation Failure",
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
																"Blog Created",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllBlogs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllBlogs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllBlogs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Blog Creation Failure",
																"Something went wrong!",
																"error")
														break;
													}
												});
							}

							/*----------------DELETE BLOG-------------------*/

							$scope.DeleteBlog = function(arg) {

								var json = {
									'id' : arg
								};

								console.log(json);
								$http({
									method : 'post',
									url : BASE_URL + '/deleteBlog',
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
																"Blog Deleted",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllBlogs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllBlogs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllBlogs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Blog Delete Failure",
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
																"Blog Deleted",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllBlogs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllBlogs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllBlogs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Blog Delete Failure",
																"Something went wrong!",
																"error")
														break;
													}
												});
							}
						} ]);