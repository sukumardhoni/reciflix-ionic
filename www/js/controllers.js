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
		$scope.user.email = "t1@t1.com";
		//$scope.user.pin = "12345";
		$scope.Login = function () {
			console.log('Login function');
			$ionicLoading.show({
				templateUrl: "templates/loading.html",
			});
			User.Signin.create(this.user, function (res) {
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


		$scope.fbLogin = function () {
			console.log('Facebook login');
			console.log('Token is : ' + window.sessionStorage['fbtoken']);
			openFB.login(
				function (response) {
					if (response.status === 'connected') {
						console.log('Facebook login succeeded');
						console.log('Connection details..... : ' + JSON.stringify(response));
						console.log('Making a call for FB profile API to get id,name,email,first_name,last_name');
						//$state.go('app.sessions');
						//$scope.closeLogin();
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
											//$scope.authentication.user = res.user;
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

.controller('ContentCtrl', function ($scope, $stateParams, SingleRecipe) {
	SingleRecipe.get({
		recipeId: $stateParams.recipeId
	}, function (res) {
		$scope.recipe = res;
		console.log('Single Recipe is : ' + JSON.stringify(res));
	});
})

.controller('allRecipesCtrl', function ($scope, $state, $stateParams, $ionicPopover, $timeout, $ionicLoading, RecipesByCategory, SingleRecipe, UserFavorites, Authentication) {
	console.log('allRecipesCtrl controller')
	if ($stateParams.recipeId) {
		SingleRecipe.get({
			recipeId: $stateParams.recipeId
		}, function (res) {
			$ionicLoading.hide();
			$scope.recipe = res;
			console.log('Single Recipe is : ' + JSON.stringify(res));
		});
	}

	$scope.changeClass = function (recipe) {
		console.log('allRecipesCtrl controller')
		if ($scope.selectedIndex === recipe._id) {
			$scope.selectedIndex = true;
		} else {
			$scope.selectedIndex = recipe._id;
		}
	};

	$ionicLoading.show({
		templateUrl: "templates/loading.html",
	});

	$scope.uesrId = $stateParams.userId;
	$scope.CatName = $stateParams.categorieName;
	var pageId = 0;

	$scope.initialQueryRecipes = function () {
		RecipesByCategory.query({
			pageId: pageId,
			CategoryName: $stateParams.categorieName
		}, function (res) {
			console.log('Success cb on RecipesByCategory');
			$scope.recipes = res;
			$ionicLoading.hide();
			pageId++;
		});
	};
	$ionicPopover.fromTemplateUrl('templates/dropdownmenu.html', {
		scope: $scope,
	}).then(function (popover) {
		$scope.popover = popover;
	});

	$scope.openPopover = function ($event) {
		$scope.popover.show($event);
	};

	$scope.loadMore = function () {

		$timeout(function () {
			var onScroll = {};
			RecipesByCategory.query({
				pageId: pageId,
				CategoryName: $stateParams.categorieName
			}, function (res) {
				onScroll = res;
				pageId++;
				if (res.length == 0) {
					$scope.noMoreItemsAvailable = true;
				}
				var oldRecipes = $scope.recipes;
				$scope.recipes = oldRecipes.concat(onScroll);
				console.log('On Scroll Content recipes : ' + JSON.stringify(onScroll));
			});
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.$broadcast('scroll.resize');
			$scope.$broadcast('scroll.resize')
		}, 1000);
	}
	$scope.sendMail = function () {
		console.log('sendMail is called');
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				// alert('Service is not available') unless isAvailable;
				cordova.plugins.email.open({
					to: 'vinodhko@globaltechminds.com',
					cc: '',
					// bcc:     ['john@doe.com', 'jane@doe.com'],
					subject: 'ReciFlixApp Testing',
					body: 'How are you? Nice greetings from ReciFlixApp'
				});
			}
		);
	};


	$scope.sharePost = function () {
		console.log('Share Post is called');

		window.plugins.socialsharing.share('Check this post here: ', null, null, null);
	};
})

.controller('AppCtrl', function ($scope, SearchedRecipes, $stateParams, $ionicLoading, $timeout, Authentication, $state) {

	$scope.authentication = Authentication.user;

	$scope.signout = function () {
		console.log('signout');
		$scope.authentication = '';
		openFB.logout(
				function (response) {
					console.log('Successfully logout fb user');
					$state.go('walkthrough');
				})
			//	$state.go('walkthrough');
	}

	if ($stateParams.searchQuery) {
		$ionicLoading.show({
			templateUrl: "templates/loading.html",
		});
		var pageId = 0;

		SearchedRecipes.query({
			pageId: pageId,
			searchQuery: $stateParams.searchQuery
		}, function (res) {
			$ionicLoading.hide();
			console.log('Callback response on searched successfuuly');
			console.log('Callback response on searched successfuuly' + JSON.stringify(res));
			$scope.recipes = res;
			pageId++;
		})
	}

	$scope.loadMore = function () {

		$timeout(function () {
			var onScroll = {};
			SearchedRecipes.query({
				pageId: pageId,
				searchQuery: $stateParams.searchQuery
			}, function (res) {
				onScroll = res;
				pageId++;
				if (res.length == 0) {
					$scope.noMoreItemsAvailable = true;
				}
				var oldRecipes = $scope.recipes;
				$scope.recipes = oldRecipes.concat(onScroll).unique();
				console.log('On Scroll Content recipes : ' + JSON.stringify(onScroll));
			});
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.$broadcast('scroll.resize');
			$scope.$broadcast('scroll.resize')
		}, 1000);
	}



	$scope.sendMail = function () {
		console.log('sendMail is called');
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				// alert('Service is not available') unless isAvailable;
				cordova.plugins.email.open({
					to: 'vinodhko@globaltechminds.com',
					cc: '',
					// bcc:     ['john@doe.com', 'jane@doe.com'],
					subject: 'ReciFlixApp Testing',
					body: 'How are you? Nice greetings from ReciFlixApp'
				});
			}
		);
	};


	$scope.sharePost = function () {
		console.log('Share Post is called');

		window.plugins.socialsharing.share('Check this post here: ', null, null, null);
		//window.plugins.socialsharing.share('Message and image', null, 'https://www.google.nl/images/srpr/logo4w.png', null);
		/*Message,Subject,Image,Link these are the four arguments in share*/
	};









})

.controller('myFavoritesCtrl', function ($scope, $stateParams, Authentication, MyFavRecipes, $timeout) {
	if (Authentication.user) {
		$scope.authentication = Authentication;
		var pageId = 0;
		MyFavRecipes.query({
			pageId: pageId,
			userId: Authentication.user._id
		}, function (res) {
			console.log('Callback response on myfav successfuuly');
			console.log('Callback response on myfav successfuuly' + JSON.stringify(res));
			$scope.recipes = res;
			pageId++;
		})

	} else {
		console.log('User is not logged in please create an account or login');
		$scope.notLoggedIn = 'User is not logged in please create an account or login';
	}

	$scope.loadMore = function () {
		if (Authentication.user) {
			$scope.noMoreItemsAvailable = false;
			var onScroll = {};
			MyFavRecipes.query({
				pageId: pageId,
				userId: Authentication.user._id
			}, function (res) {
				onScroll = res;
				pageId++;
				if (res.length == 0) {
					$scope.noMoreItemsAvailable = true;
				}
				var oldRecipes = $scope.recipes;
				$scope.recipes = oldRecipes.concat(onScroll).unique();
				console.log('On Scroll Content recipes : ' + JSON.stringify(onScroll));
			});
			$scope.$broadcast('scroll.infiniteScrollComplete');
			/*$scope.$broadcast('scroll.resize');
$scope.$broadcast('scroll.resize')*/

		}
	}



})

.controller('allCategoriesCtrl', function ($scope, $state, $stateParams, Categories, $ionicPopover, $timeout, $rootScope, Authentication, $ionicLoading) {

	$scope.userDetails = Authentication;
	console.log('User details from window service is : ' + JSON.stringify($scope.userDetails));
	$scope.oModal1 = $rootScope.modal1;
	$scope.oModal2 = $rootScope.modal2;
	$scope.oModal1.hide();
	$scope.oModal2.hide();

	$scope.uesrId = $stateParams.userId;
	var pageId = 0;


	$ionicLoading.show({
		templateUrl: "templates/loading.html",
	});

	Categories.query({
		pageId: pageId
	}, function (res) {
		$scope.categories = res;
		$ionicLoading.hide();
		pageId++;
		//$scope.loadMore();
	});

	$ionicPopover.fromTemplateUrl('templates/dropdownmenu.html', {
		scope: $scope,
	}).then(function (popover) {
		$scope.popover = popover;
	});

	$scope.openPopover = function ($event) {
		$scope.popover.show($event);
	};



	Array.prototype.unique = function () {
		console.log('Console at unique')
		var a = this.concat();
		for (var i = 0; i < a.length; ++i) {
			for (var j = i + 1; j < a.length; ++j) {
				if (a[i] === a[j])
					a.splice(j--, 1);
			}
		}
		return a;
	}

	$scope.loadMore = function () {
		$timeout(function () {
			var onScroll = {};
			Categories.query({
				pageId: pageId
			}, function (res) {
				onScroll = res;
				pageId++;
				if (res.length == 0) {
					$scope.noMoreItemsAvailable = true;
				}
				var oldCategories = $scope.categories;
				$scope.categories = oldCategories.concat(onScroll).unique();
				console.log('On Scroll Content recipes : ' + JSON.stringify(onScroll));
			});
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.$broadcast('scroll.resize');
			$scope.$broadcast('scroll.resize')
		}, 1000);
	}

})

.controller('showRecipesCtrl', function ($scope, $stateParams) {
	console.log('showRecipesCtrl controller')
	$scope.videoId = $stateParams.videoId;
})

.controller('singleRecipeCtrl', function ($scope, $state, $stateParams, Recipes) {

	Recipes.get({
		recipeId: $stateParams.recipeId
	}, function (res) {
		$scope.recipe = res;
		console.log('Single Recipe is : ' + JSON.stringify(res));
	});

	$scope.editRecipe = function (recipe) {
		console.log('Edit Single Recipe Details : ' + JSON.stringify(recipe));
		$state.go('editRecipe', {
			recipeId: $stateParams.recipeId
		});
	};

	$scope.updateRecipe = function (recipe) {
		console.log('Update Recipe Details : ' + JSON.stringify(recipe));

		recipe.$update(function (response) {
			console.log('Successfully updated the recipe');
			$state.go('allRecipes', {
				userId: $stateParams.userId
			});
		}, function (err) {
			console.log('Error While updating the recipe');
		})

	};

	$scope.trashRecipe = function (recipeId) {
		console.log('Delete Single Recipe Details : ' + recipeId);
		var recipeDelete = $scope.recipe;
		recipeDelete.$remove(function () {
			console.log('Successfully Deleted');
			$state.go('allRecipes', {
				userId: $stateParams.userId
			});
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
			console.log('Error while deleting' + $scope.error);
		})
	};

	$scope.share = function (event) {
		console.log('Event coming to share function : ' + event)
		console.log('$scope.session.subject coming to share function : ' + $scope.session.subject)
		console.log('$scope.session.category coming to share function : ' + $scope.session.category)
		openFB.api({
			method: 'POST',
			path: '/me/feed',
			params: {
				message: $scope.recipe.title + "', Here is the video :  " +
					$scope.recipe.videoId
			},
			success: function () {
				//alert('The session was shared on Facebook');
			},
			error: function () {
				alert('An error occurred while sharing this session on Facebook');
			}
		});
	};





})

.controller('newRecipeCtrl', function ($scope, $state, $stateParams, Recipes) {
	$scope.create = function () {

		var recipe = new Recipes({
			'title': this.recipe.title,
			'videoId': this.recipe.videoId,
			'recipeNotes': this.recipe.recipeNotes,
		});
		recipe.$save(function (response) {
			$state.go('allRecipes', {
				userId: $stateParams.userId
			});
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});

	};

})
