angular.module('recipesApp')


.controller('walkthroughCtrl', function ($scope, $state, User, $ionicModal, $ionicLoading, $rootScope, Authentication) {

	$scope.authentication = Authentication;
	$scope.skip = function () {
		console.log('skip function in walkthroughCtrl controller')
		var Id = '1111';
		$state.go('app.allCategories', {
			userId: Id
		});
	};

	$ionicModal.fromTemplateUrl('templates/login.html', {
		id: '1',
		scope: $scope,
		backdropClickToClose: false,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.oModal1 = modal;
		$rootScope.modal1 = modal;
		$scope.user = {};
		$scope.user.email = "t4@test.com";
		//$scope.user.pin = "12345";
		$scope.Login = function () {
			console.log('Login function');
			$ionicLoading.show({
				templateUrl: "templates/loading.html",
			});
			User.Signin.create(this.user, function (res) {
				if (res.type === false) {
					$scope.errMsg = res.data;
					$ionicLoading.hide();
				} else {
					$scope.authentication.user = res;
					$ionicLoading.hide();
					$state.go('app.allCategories', {
						userId: res._id
					});
					console.log('Successfully created user');
					console.log('Result after created user : ' + JSON.stringify(res));
				}
			})
		};


		$scope.fbLogin = function () {
			console.log('Facebook login');
			console.log('Token is : ' + window.sessionStorage['fbtoken']);
			openFB.login(
				function (response) {
					if (response.status === 'connected') {
						console.log('Facebook login succeeded');
						console.log('Connection details..... : ' + JSON.stringify(response));
						console.log('Making a call for FB profile API to get id,name,email,first_name,last_name');
						openFB.api({
							path: '/me',
							params: {
								fields: 'id,name,email,first_name,last_name'
							},
							success: function (user) {
								console.log('in Success of Profile from FACEBOOK : user returned is  ' + JSON.stringify(user));
								if (user.email) {
									var fbUser = {
										firstName: user.first_name,
										lastName: user.last_name,
										email: user.email
									};
									console.log('constructed a local user from FACEBOOK User details created as : ' + JSON.stringify(fbUser));
									User.Signup.create(fbUser, function (res) {
										//$ionicLoading.hide();
										if (res.type === 'error') {
											console.log('Error happened: ' + res.data);
											$state.go('walkthrough');
										} else if (res.type === 'exists') {
											//$scope.errMsg = res.data;
											console.log('User already exists, message is  : ' + res.data);
											console.log('User details from SERVER is : ' + JSON.stringify(res.user));
											if (res.user) {
												$scope.authentication.user = res.user;
												$state.go('app.allCategories', {
													userId: res.user._id
												});
											}
										} else {
											console.log('Successfully created user');
											console.log('Result after created user : ' + JSON.stringify(res));
											$scope.authentication.user = res;

											$state.go('app.allCategories', {
												userId: res._id
											});
										}
									})
								} else {
									openFB.logout(
										function (response) {
											console.log('Email didnt come for now sending the user back to login');
											console.log('Successfully logout fb user');
											$state.go('walkthrough');
										})
								}
								/*	$scope.$apply(function () {
		$scope.user = user;
	});*/
							},
							error: function (error) {
								alert('Facebook error: ' + error.error_description);
							}
						});

					} else {
						alert('Facebook login failed');
					}
					//console.log('FB login profile email address is: ' + scope.email)
				}, {
					scope: 'email,publish_actions'
						//					console.log('FB login profile email address is: ' + scope.email)
				});
		}
	});

	$scope.closeModal = function (index) {
		console.log('Close modal ' + index);
		if (index == 2) $scope.oModal2.hide();
		else if (index == 1) $scope.oModal1.hide();
	};

	$scope.login = function () {
		console.log('login function in walkthroughCtrl controller');
		$scope.oModal1.show();
		$scope.oModal2.hide();
	};

	$ionicModal.fromTemplateUrl('templates/signup.html', {
		id: '1',
		scope: $scope,
		backdropClickToClose: false,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.oModal2 = modal;
		$rootScope.modal2 = modal;
		$scope.doSignUp = function () {
			console.log('doSignUp function');
			$ionicLoading.show({
				templateUrl: "templates/loading.html",
			});
			console.log('SignUp User details : ' + JSON.stringify(this.user))
			User.Signup.create(this.user, function (res) {
				if (res.type === false) {
					$scope.errMsg = res.data;
				} else {
					$scope.authentication.user = res;
					$ionicLoading.hide();
					$state.go('app.allCategories', {
						userId: res._id
					});
					console.log('Successfully created user');
					console.log('Result after created user : ' + JSON.stringify(res));
				}
			})
		};
	});

	$scope.signup = function () {
		console.log('signup function in walkthroughCtrl controller');
		$scope.oModal2.show();
		$scope.oModal1.hide();
	};

})
