angular.module('recipesApp')
	.controller('allRecipesCtrl', function ($scope, $state, $stateParams, $ionicPopover, $timeout, $ionicLoading, RecipesByCategory, SingleRecipe, UserFavorites, Authentication) {

		var item = $stateParams.categorieName;
		//console.log('Catgory obj : ' + JSON.stringify(item))

		//$scope.currentDate = d.getFullYear();
		console.log('allRecipesCtrl controller')
		$scope.singleRecipe = function () {
			console.log('singleRecipe fun. allRecipesCtrl controller')
			SingleRecipe.get({
				recipeId: $stateParams.recipeId
			}, function (res) {
				$ionicLoading.hide();
				$scope.recipe = res;
				//console.log('Single Recipe is : ' + JSON.stringify(res));
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
		$scope.CatName = $stateParams.catName;
		var pageId = 0;


		/*		RecipesByCategory.query({
					pageId: pageId,
					CategoryName: $stateParams.categorieName
				}, function (res) {
					console.log('Success cb on RecipesByCategory');
					$scope.recipes = res;
					$ionicLoading.hide();
					pageId++;
				});*/



		$scope.initialQueryRecipes = function () {
		console.log('initialQueryRecipes fun. in allRecipesCtrl controller')
		RecipesByCategory.query({
			pageId: pageId,
			CategoryName: $stateParams.categorieName
		}, function (res) {
			//console.log('Success cb on RecipesByCategory');
			$scope.recipes = res;
			$ionicLoading.hide();
			pageId++;
		});
	};


		$scope.loadMore = function () {

			$timeout(function () {
				var onScroll = {};
				RecipesByCategory.query({
					pageId: pageId,
					CategoryName: $stateParams.categorieName
				}, function (res) {
					$scope.$broadcast('scroll.infiniteScrollComplete');
					onScroll = res;
					pageId++;
					if (res.length == 0) {
						$scope.noMoreItemsAvailable = true;
					}
					var oldRecipes = $scope.recipes;
					$scope.recipes = oldRecipes.concat(onScroll);

					$scope.$broadcast('scroll.resize');
					//console.log('On Scroll Content recipes : ' + JSON.stringify(onScroll));
				});
				//$scope.$broadcast('scroll.infiniteScrollComplete');
				//	$scope.$broadcast('scroll.resize');
				//$scope.$broadcast('scroll.resize')
			}, 1000);
		}

	})
