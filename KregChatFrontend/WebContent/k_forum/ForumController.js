/**
 * 
 */

KregChatFrontend.controller('ForumController', [
		'$scope',
		'$http',
		function($scope, $http) {
			
			
			
			$scope.forum = {
				"title" : "",
				"description" : "",
				"email" : null,
				"category" : null
			}

			$scope.submit = function() {

				console.log($scope.forum);

				$http({
					url : BASE_URL + "addForum",
					method : "POST",
					data : JSON.stringify($scope.forum)
				}).then(
						function(resp) {

							console.log(resp);

							if (resp.data.msg == "Added") {
								swal("Forum Created", "Congratulations",
										"success")
							}

						},
						function(resp) {
							console.log(resp);

							swal("Forum Creation Failure",
									"Something went wrong!", "error")

						});

			}

			$scope.reset = function() {

				$scope.forum = {
					"title" : "",
					"description" : "",
					"email" : "",
					"category" : ""
				}

			}

			$scope.fetchAllForums = function() {

				$http({
					method : 'get',
					url : BASE_URL + 'fetchAllForums',
					headers : {
						'Content-Type' : 'application/json'
					}
				}).then(function(resp) {
					console.log(resp.data)

					$scope.AllForums = resp.data;
				}, function(resp) {

					console.log("fetchAllForums Error")
				});

			}

			$scope.fetchAllForums();

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
			/*---------------------------------------------------*/

			$scope.AllForums = [];

			$scope.AddForum = function() {
				var json = {
					"email" : $rootScope.LoginEmail,
					"title" : $scope.title.value,
					"description" : $scope.description.value,
					"category" : null

				};

				console.log(json);
				// alert(json);

				$http({
					method : 'post',
					url : BASE_URL + '/addForum',
					data : json,
					headers : {
						'Content-Type' : 'application/json'
					}
				}).then(
						function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Forum Created", "Congratulations",
										"success")

								$http({
									method : 'get',
									url : BASE_URL + '/fetchAllForums',
									headers : {
										'Content-Type' : 'application/json'
									}
								}).then(function(resp) {
									console.log(resp.data)

									$scope.AllForums = resp.data;
								}, function(resp) {

									console.log("fetchAllForums Error")
								});

								break;

							case 'Failure':
								swal("Forum Creation Failure",
										"Something went wrong!", "error")
								break;
							}

						},
						function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Forum Created", "Congratulations",
										"success")

								$http({
									method : 'get',
									url : BASE_URL + '/fetchAllForums',
									headers : {
										'Content-Type' : 'application/json'
									}
								}).then(function(resp) {
									console.log(resp.data)

									$scope.AllForums = resp.data;
								}, function(resp) {

									console.log("fetchAllForums Error")
								});

								break;

							case 'Failure':
								swal("Forum Creation Failure",
										"Something went wrong!", "error")
								break;
							}
						});
			}
			
			$scope.ETitle = 
			{ 
					value: '',
					error : false,
					touched : true,
					validate: function(){
						this.touched = true;
						var reg = /^.{2,20}$/;
						this.error = !reg.test( this.value );
						
						console.log( this.error );
						
					}
			}
			
			$scope.EDescription = 
			{ 
					value: '',
					error : false,
					touched : true,
					validate: function(){
						this.touched = true;
						var reg = /^.{2,160}$/;
						this.error = !reg.test( this.value );
					}
			}
			
			$scope.Eid = -1;
			
			$scope.EditForum = function( arg ){
				
				
				
				for( var x in $scope.AllForums )
				{
					console.log( $scope.AllForums[x] );
					console.log( arg );
					
					if( $scope.AllForums[x].id == arg )
					{
						console.log( $scope.AllForums[x].id );
						
						$scope.Eid = $scope.AllForums[x].id;
						$scope.ETitle.value = $scope.AllForums[x].title;
						$scope.EDescription.value = $scope.AllForums[x].description;
						break;
					}
					
				}
				
			}
			
			$scope.EditForumToDB = function()
			{
				var json = 
						{
						'id': $scope.Eid,
						'Title': $scope.ETitle.value,
						'Description': $scope.EDescription.value,
						
						};
				
				console.log(json);
				//alert(json);
				
				$http({method:'post',url:BASE_URL + '/editForum', data: json, headers: {'Content-Type': 'application/json'}}).then(function(data){
					console.log( data )
					
					switch( data.data.msg )
					{
					case 'Success':
						
						swal("Forum Updated", "Congratulations", "success")
						
						$http({method:'get',url:BASE_URL + '/fetchAllForums', headers: {'Content-Type': 'application/json'}})
						.then(function(resp){
							console.log( resp.data )
						
							$scope.AllForums = resp.data;
						},function(resp){
							
							console.log( "fetchAllForums Error" )
						});
						
						break;
						
					case 'Failure':
						swal("Forum Update Failure", "Something went wrong!", "error")
						break;
					}
					
				},function(data){
					console.log( data )
					
					switch( data.data.msg )
					{
					case 'Success':
						
						swal("Forum Updated", "Congratulations", "success")
						
						$http({method:'get',url:BASE_URL + '/fetchAllForums', headers: {'Content-Type': 'application/json'}})
						.then(function(resp){
							console.log( resp.data )
						
							$scope.AllForums = resp.data;
						},function(resp){
							
							console.log( "fetchAllForums Error" )
						});
						
						break;
						
					case 'Failure':
						swal("Forum Update Failure", "Something went wrong!", "error")
						break;
					}
				});
			}

			$scope.DeleteForum = function(arg) {

				var json = {
					'id' : arg
				};

				console.log(json);
				// alert(json);

				$http({
					method : 'post',
					url : BASE_URL + '/deleteForum',
					data : json,
					headers : {
						'Content-Type' : 'application/json'
					}
				}).then(
						function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Forum Deleted", "Congratulations",
										"success")

								$http({
									method : 'get',
									url : BASE_URL + '/fetchAllForums',
									headers : {
										'Content-Type' : 'application/json'
									}
								}).then(function(resp) {
									console.log(resp.data)

									$scope.AllForums = resp.data;
								}, function(resp) {

									console.log("fetchAllForums Error")
								});

								break;

							case 'Failure':
								swal("Forum Delete Failure",
										"Something went wrong!", "error")
								break;
							}

						},
						function(data) {
							console.log(data)

							switch (data.data.msg) {
							case 'Success':

								swal("Forum Deleted", "Congratulations",
										"success")

								$http({
									method : 'get',
									url : BASE_URL + '/fetchAllForums',
									headers : {
										'Content-Type' : 'application/json'
									}
								}).then(function(resp) {
									console.log(resp.data)

									$scope.AllForums = resp.data;
								}, function(resp) {

									console.log("fetchAllForums Error")
								});

								break;

							case 'Failure':
								swal("Forum Delete Failure",
										"Something went wrong!", "error")
								break;
							}
						});
			}

		} ]);