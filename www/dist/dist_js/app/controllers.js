angular.module('recipesApp')


.controller('walkthroughCtrl', ['$scope', '$state', 'User', '$ionicModal', '$ionicLoading', '$rootScope', function ($scope, $state, User, $ionicModal, $ionicLoading, $rootScope) {


	$scope.skip = function () {
		console.log('skip function in walkthroughCtrl controller')
		var Id = '1111';
		$state.go('app.allCategories', {
			userId: Id
		});
	};

	$ionicModal.fromTemplateUrl('templates/login.html', {
		id: '1', // We need to use and ID to identify the modal that is firing the event!
		scope: $scope,
		backdropClickToClose: false,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.oModal1 = modal;
		$rootScope.modal = modal;

		$scope.user = {};

		$scope.user.email = "t1@t1.com";
		//$scope.user.pin = "12345";

		$scope.Login = function () {
			console.log('Login function');
			$ionicLoading.show({
				templateUrl: "templates/loading.html",
			});
			User.Signin.create(this.user, function (res) {
				console.log("Success callback from the user login");

				if (res.type === false) {
					$scope.errMsg = res.data;
				} else {
					$ionicLoading.hide();
					$state.go('app.allCategories', {
						userId: res._id
					});
					console.log('Successfully created user');
					console.log('Result after created user : ' + JSON.stringify(res));
				}
			})
		};

		$ionicModal.fromTemplateUrl('templates/signup.html', {
			id: '1', // We need to use and ID to identify the modal that is firing the event!
			scope: $scope,
			backdropClickToClose: false,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.oModal2 = modal;
		});

	});


	$scope.closeModal = function (index) {
		if (index == 1) $scope.oModal1.hide();
		else $scope.oModal2.hide();
	};


	$scope.login = function () {
		console.log('login function in walkthroughCtrl controller')
		$scope.oModal1.show();
		$scope.oModal2.hide();
	};









}])

.controller('loginCtrl', ['$scope', '$state', 'User', '$ionicLoading', function ($scope, $state, User, $ionicLoading) {

	// We need this for the form validation
	$scope.selected_tab = "";

	$scope.$on('my-tabs-changed', function (event, data) {
		$scope.selected_tab = data.title;
	});


	$scope.user = {};

	$scope.user.email = "t1@t1.com";
	//$scope.user.pin = "12345";

	$scope.Login = function () {
		console.log('Login function');
		$ionicLoading.show({
			templateUrl: "templates/loading.html",
		});
		User.Signin.create(this.user, function (res) {
			console.log("Success callback from the user login");
			$ionicLoading.hide();
			if (res.type === false) {
				$scope.errMsg = res.data;
			} else {
				$state.go('app.allCategories', {
					userId: res._id
				});
				console.log('Successfully created user');
				console.log('Result after created user : ' + JSON.stringify(res));
			}
		})
	};

	$scope.fbLogin = function () {
		console.log('Facebook login ');
		openFB.login(
			function (response) {
				if (response.status === 'connected') {
					console.log('Facebook login succeeded');
					openFB.api({
						path: '/me',
						params: {
							fields: 'id,name,email'
						},
						success: function (user) {
							console.log('Profile from FACEBOOK : ' + JSON.stringify(user));
							User.Signup.create(user, function (res) {
								if (res.type === false) {
									$scope.errMsg = res.data;
								} else {
									$state.go('allRecipes', {
										userId: res._id
									});
									console.log('Successfully created user');
									console.log('Result after created user : ' + JSON.stringify(res));
								}
							})
							$scope.$apply(function () {
								$scope.user = user;
							});
						},
						error: function (error) {
							alert('Facebook error: ' + error.error_description);
						}
					});
				} else {
					alert('Facebook login failed');
				}
			}, {
				scope: 'email,publish_actions'
			});
	}



}])

.controller('signupCtrl', ['$scope', '$state', 'User', function ($scope, $state, User) {
		console.log('signupCtrl controller')

		$scope.signup = function () {
			console.log('User details from form is : ' + JSON.stringify(this.user));
			User.Signup.create(this.user, function (res) {
				if (res.type === false) {
					$scope.errMsg = res.data;
				} else {
					$state.go('app.allCategories', {
						userId: res._id
					});
					console.log('Successfully created user');
					console.log('Result after created user : ' + JSON.stringify(res));
				}
			})

		};


	}])
	.controller('ContentCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
		console.log('ContentCtrl controller');
		console.log('ContentCtrl categorieName : ' + $stateParams.categorieName);

		$scope.item = $stateParams.categorieName;


	}])



.controller('allRecipesCtrl', ['$scope', '$state', '$stateParams', 'Recipes', '$ionicPopover', '$timeout', 'RecipesOnScroll', '$ionicLoading', function ($scope, $state, $stateParams, Recipes, $ionicPopover, $timeout, RecipesOnScroll, $ionicLoading) {
	console.log('allRecipesCtrl controller')

	/*$ionicLoading.show({
	templateUrl: "templates/loading.html",
});*/

	$scope.uesrId = $stateParams.userId;
	$scope.CatName = $stateParams.categorieName;
	var pageId = 0;

	/*Recipes.query({
		catgyName: $stateParams.videoCategorie
	}, function (res) {
		$scope.recipes = res;
		$ionicLoading.hide();
		pageId++;
	});*/

	$ionicPopover.fromTemplateUrl('templates/dropdownmenu.html', {
		scope: $scope,
	}).then(function (popover) {
		$scope.popover = popover;
	});

	$scope.openPopover = function ($event) {
		$scope.popover.show($event);
	};

	/*$scope.loadMore = function () {

	$timeout(function () {
		var onScroll = {};
		RecipesOnScroll.query({
			pageId: pageId,
			catgyName: $stateParams.categorieName
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
}*/
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

}])

.controller('AppCtrl', ['$scope', function ($scope) {

}])

.controller('allCategoriesCtrl', ['$scope', '$state', '$stateParams', 'Categories', '$ionicPopover', '$timeout', '$rootScope', function ($scope, $state, $stateParams, Categories, $ionicPopover, $timeout, $rootScope) {
	$scope.oModal1 = $rootScope.modal;
	$scope.oModal1.hide();

	$scope.uesrId = $stateParams.userId;
	var pageId = 0;

	Categories.query({
		pageId: pageId
	}, function (res) {
		$scope.categories = res;
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

}])

.controller('showRecipesCtrl', ['$scope', '$state', '$stateParams', 'Recipes', '$ionicPopover', function ($scope, $state, $stateParams, Recipes, $ionicPopover) {
		console.log('showRecipesCtrl controller')
			//$scope.uesrId = $stateParams.userId;
		$scope.recipes = [{
			"videoId": "xaeJMJQKxto"
		}];

		$ionicPopover.fromTemplateUrl('templates/dropdownmenu.html', {
			scope: $scope,
		}).then(function (popover) {
			$scope.popover = popover;
		});

		$scope.openPopover = function ($event) {
			$scope.popover.show($event);
		};

	}])
	.controller('singleRecipeCtrl', ['$scope', '$state', '$stateParams', 'Recipes', function ($scope, $state, $stateParams, Recipes) {

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





	}])

.controller('newRecipeCtrl', ['$scope', '$state', '$stateParams', 'Recipes', function ($scope, $state, $stateParams, Recipes) {
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

}])
