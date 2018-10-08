/**
 * 
 */

KregChatFrontend.controller('FriendsController', [ '$scope', '$http',
		function($scope, $http) {
			console.log('Friend Controller')

			/*-----------------------------------------ALL FRIENDS ARRAY--------------------------------------------*/

			// $scope.AllFriends = [];
			/*-----------------------------------------FETCH ALL FRIENDS--------------------------------------------*/

			$scope.fetchAllFriends = function() {

				 $http({
				 method : 'get',
				 url : BASE_URL + 'fetchAllFriends',
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
				
				 $scope.fetchAllFriends();

//				$http({
//					method : 'get',
//					url : BASE_URL + '/fetchAllFriends',
//					headers : {
//						'Content-Type' : 'application/json'
//					}
//				}).then(function(resp) {
//					console.log(resp.data)
//					// console.log( resp.data )
//
//					$scope.AllFriends = resp.data;
//
//					for (var i = 0; i < $scope.AllFriends.length; i++) {
//						if ($scope.AllFriends[i].email) {
//							$scope.userData = $scope.AllFriends[i];
//							break;
//						}
//					}
//
//					console.log($scope.userData);
//
//				}, function(resp) {
//
//					console.log("fetchAllFriends Error")
//				});
//
//			}
//
//			$scope.fetchAllFriends();

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

			
			$scope.UnFriend = function(arg1,arg2)
			{
				var json = 
						{
						'alphaEmail': arg1,
						'omegaEmail': arg2
						};
				
				console.log(json);
				//alert(json);
				
				$http({method:'post',url:BASE_URL + '/unFriend', data: json, headers: {'Content-Type': 'application/json'}}).then(function(data){
					console.log( data )
					
					switch( data.data.msg )
					{
					case 'Success':
						
						swal("Friend Removed", "", "success")
						
						$scope.fetchAllFriends();
						
						break;
						
					case 'Failure':
						swal("Failed", "Something went wrong!", "error")
						break;
					}
					
				},function(data){
					console.log( data )
					
					switch( data.data.msg )
					{
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
			
			$scope.UndoFriend = function(arg1,arg2)
			{
				var json = 
						{
						'alphaEmail': arg1,
						'omegaEmail': arg2
						};
				
				console.log(json);
				//alert(json);
				
				$http({method:'post',url:BASE_URL + '/undoFriend', data: json, headers: {'Content-Type': 'application/json'}}).then(function(data){
					console.log( data )
					
					switch( data.data.msg )
					{
					case 'Success':
						
						swal("Friend Request Undone", "", "success")
						
						$scope.fetchAllFriends();
						
						break;
						
					case 'Failure':
						swal("Failed", "Something went wrong!", "error")
						break;
					}
					
				},function(data){
					console.log( data )
					
					switch( data.data.msg )
					{
					case 'Success':
						
						swal("Friend Request Undone", "", "success")
						
						$scope.fetchAllFriends();
						
						break;
						
					case 'Failure':
						swal("Failed", "Something went wrong!", "error")
						break;
					}
				});
			}
			
			/*-----------------------------------------UNDO-FRIEND-REQUEST-------------------------------------------*/

			
			$scope.AcceptFriend = function(arg1,arg2)
			{
				var json = 
						{
						'alphaEmail': arg1,
						'omegaEmail': arg2
						};
				
				console.log(json);
				//alert(json);
				
				$http({method:'post',url:BASE_URL + '/acceptFriend', data: json, headers: {'Content-Type': 'application/json'}}).then(function(data){
					console.log( data )
					
					switch( data.data.msg )
					{
					case 'Success':
						
						swal("Friend Request Accepted", "", "success")
						
						$scope.fetchAllFriends();
						
						break;
						
					case 'Failure':
						swal("Failed", "Something went wrong!", "error")
						break;
					}
					
				},function(data){
					console.log( data )
					
					switch( data.data.msg )
					{
					case 'Success':
						
						swal("Friend Request Accepted", "", "success")
						
						$scope.fetchAllFriends();
						
						break;
						
					case 'Failure':
						swal("Failed", "Something went wrong!", "error")
						break;
					}
				});
			}

			
			

		} ]);