angular.module('recipesApp')

.controller('loginCtrl', function ($scope, $state, User) {


	$scope.Login = function () {
		console.log('Login function');

		User.Signin.create(this.user, function (res) {
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



})

.controller('signupCtrl', function ($scope, $state, User) {
	console.log('signupCtrl controller')

	$scope.signup = function () {
		console.log('User details from form is : ' + JSON.stringify(this.user));
		User.Signup.create(this.user, function (res) {
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

	};


})


.controller('allRecipesCtrl', function ($scope, $state, $stateParams, Recipes) {
	console.log('allRecipesCtrl controller')
	$scope.uesrId = $stateParams.userId;
	$scope.recipes = Recipes.query();
})

.controller('showRecipesCtrl', function ($scope, $state, $stateParams, Recipes) {
	console.log('showRecipesCtrl controller')
	//$scope.uesrId = $stateParams.userId;
	$scope.recipes = [{"videoId":"xaeJMJQKxto"}, {"videoId":"9Be9LHPracE"}, {"videoId":"CdT6kmzDDgM"}, {"videoId":"pdSb2Ian-G8"}, {"videoId":"o_0Xy6o8WJ4"}];
})
.controller('singleRecipeCtrl', function ($scope, $state, $stateParams, Recipes) {
	$scope.recipe = Recipes.get({
		recipeId: $stateParams.recipeId
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
