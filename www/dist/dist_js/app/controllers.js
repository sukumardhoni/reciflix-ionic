angular.module('recipesApp')
/*	.controller('ContentCtrl', function ($scope, $stateParams, SingleRecipe) {
		SingleRecipe.get({
			recipeId: $stateParams.recipeId
		}, function (res) {
			$scope.recipe = res;
			console.log('Single Recipe is : ' + JSON.stringify(res));
		});
	})*/


.controller('showRecipesCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
	console.log('showRecipesCtrl controller')
	$scope.videoId = $stateParams.videoId;
}])


/*SHARE Function on FB*/
/*	$scope.share = function (event) {
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
		};*/



/*
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

})*/
