/**
 * 
 */
KregChatFrontend
		.controller(
				'JobController',
				[
						'$scope',
						'$http',
						function($scope, $http) {

/*------------------------------------------JOB SCOPE--------------------------------------------------------*/

							$scope.job = {
								title : "",
								description : "",
								email : ""
							}
							
/*------------------------------------------SUBMIT ADD JOB--------------------------------------------------------*/


							$scope.submit = function() {

								$scope.job.title = $scope.Title.value;
								$scope.job.email = $scope.Email.value;
								$scope.job.description = $scope.Description.value;

								console.log($scope.job);

								$http({
									url : BASE_URL + "addJob",
									method : "POST",
									data : JSON.stringify($scope.job)
								}).then(
										function(resp) {

											console.log(resp);

											if (resp.data.msg == "Added") {
												swal("Job Created",
														"Congratulations",
														"success")
											}

										},
										function(resp) {
											console.log(resp);

											swal("Job Creation Failure",
													"Something went wrong!",
													"error")

										});

							}

							
/*------------------------------------------FETCH ALL JOB--------------------------------------------------------*/


							$scope.fetchAllJobs = function() {

								$http({
									method : 'get',
									url : BASE_URL + 'fetchAllJobs',
									headers : {
										'Content-Type' : 'application/json'
									}
								}).then(function(resp) {
									console.log(resp.data)

									$scope.AllJobs = resp.data;
								}, function(resp) {

									console.log("fetchAllJobs Error")
								});

							}

							$scope.fetchAllJobs();

/*------------------------------------------JOB FUNCTIONS PATTERN--------------------------------------------------------*/


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
/*------------------------------------------ALL JOB--------------------------------------------------------*/
							
							$scope.AllJobs = [];
							
/*------------------------------------------ADD JOB--------------------------------------------------------*/


							$scope.AddJob = function() {
								var json = {
									"Email" : $scope.Email.value,
									"Title" : $scope.Title.value,
									"Description" : $scope.Description.value,

								};

								console.log(json);
								// alert(json);

								$http({
									method : 'post',
									url : BASE_URL + '/addJob',
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
																"Job Created",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllJobs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllJobs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllJobs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Job Creation Failure",
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
																"Job Created",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllJobs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllJobs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllJobs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Job Creation Failure",
																"Something went wrong!",
																"error")
														break;
													}
												});
							}

/*------------------------------------------APPLY JOB-------------------------------------------------------------*/
							
							$scope.ApplyJob = function(arg) {

								for ( var x in $scope.AllJobs) {
									
									if ($scope.AllJobs[x].id == arg) {
										$scope.id = $scope.AllJobs[x].id;
										$scope.Email.value = $scope.AllJobs[x].email;
										break;
									}

								}
							}

/*------------------------------------------APPLY JOB TO DB--------------------------------------------------------*/

							$scope.ApplyJobToDB = function(id, Email) 
							{
								var json = {
										'id' : $scope.id,
										"Email" : $scope.Email.value,
								};

								console.log(json);
								// alert(json);

								$http({
									method : 'post',
									url : BASE_URL + '/applyJob',
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
																"Applied",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllJobs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllJobs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllJobs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Application Failed",
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
																"Applied",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllJobs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllJobs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllJobs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Application Failed",
																"Something went wrong!",
																"error")
														break;
													}
												});
							}

/*------------------------------------------EDIT JOB FUNCTIONS--------------------------------------------------------*/

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
									var reg = /^.{2,500}$/;
									this.error = !reg.test(this.value);

								}
							}

							$scope.Eid = -1;
							
/*------------------------------------------EDIT JOB--------------------------------------------------------*/


							$scope.EditJob = function(arg) {

								for ( var x in $scope.AllJobs) {
									console.log($scope.AllJobs[x]);
									console.log(arg);

									if ($scope.AllJobs[x].id == arg) {
										console.log($scope.AllJobs[x].id);

										$scope.Eid = $scope.AllJobs[x].id;
										$scope.ETitle.value = $scope.AllJobs[x].title;
										$scope.EDescription.value = $scope.AllJobs[x].description;
										break;
									}

								}

							}
/*------------------------------------------EDIT JOB TO DB--------------------------------------------------------*/

							$scope.EditJobToDB = function() {
								var json = {
									'id' : $scope.Eid,
									'title' : $scope.ETitle.value,
									'description' : $scope.EDescription.value,

								};

								console.log(json);
								// alert(json);

								$http({
									method : 'post',
									url : BASE_URL + '/editJob',
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
																"Job Updated",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllJobs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllJobs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllJobs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Job Update Failure",
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
																"Job Updated",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllJobs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllJobs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllJobs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Job Update Failure",
																"Something went wrong!",
																"error")
														break;
													}
												});
							}

							$scope.DeleteJob = function(arg) {

								var json = {
									'id' : arg
								};

								console.log(json);
								// alert(json);

								$http({
									method : 'post',
									url : BASE_URL + '/deleteJob',
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
																"Job Deleted",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllJobs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllJobs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllJobs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Job Delete Failure",
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
																"Job Deleted",
																"Congratulations",
																"success")

														$http(
																{
																	method : 'get',
																	url : BASE_URL
																			+ '/fetchAllJobs',
																	headers : {
																		'Content-Type' : 'application/json'
																	}
																})
																.then(
																		function(
																				resp) {
																			console
																					.log(resp.data)

																			$scope.AllJobs = resp.data;
																		},
																		function(
																				resp) {

																			console
																					.log("fetchAllJobs Error")
																		});

														break;

													case 'Failure':
														swal(
																"Job Delete Failure",
																"Something went wrong!",
																"error")
														break;
													}
												});
							}

						} ]);