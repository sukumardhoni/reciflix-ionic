angular.module('recipesApp')
.controller('myFavoritesCtrl', function ($scope, $stateParams, Authentication, MyFavRecipes, $ionicLoading) {
	if (Authentication.user) {
		console.log('User fav ids : ' + Authentication.user.favorites)
		$scope.authentication = Authentication;
		var pageId = 0;
		$ionicLoading.show({
			templateUrl: "templates/loading.html",
		});
		MyFavRecipes.query({
			pageId: pageId,
			userId: Authentication.user._id
		}, function (res) {
			$ionicLoading.hide();
			console.log('Callback response on myfav successfuuly');
			console.log('Callback response on myfav successfuuly' + JSON.stringify(res));
			$scope.recipes = res;
			pageId++;

		})

	} else {
		console.log('User is not logged in please create an account or login');
		$scope.notLoggedIn = 'User is not logged in please create an account or login';
	}

	Array.prototype.unique = function () {
		console.log('Console at unique')
		var a = this.concat();
		for (var i = 0; i < a.length; ++i) {
			for (var j = i + 1; j < a.length; ++j) {
				if (a[i]._id === a[j]._id)
					a.splice(j--, 1);
			}
		}
		return a;
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
				console.log('Previous recipes on scrool is : ' + $scope.recipes.length);
				var oldRecipes = $scope.recipes;
				$scope.recipes = oldRecipes.concat(onScroll).unique();
				console.log('On Scroll Content recipes : ' + JSON.stringify(onScroll));
			});
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}
	};

  	$scope.changeClass = function (recipe) {
	//	console.log('allRecipesCtrl controller')
		if ($scope.selectedIndex === recipe._id) {
			$scope.selectedIndex = true;
		} else {
			$scope.selectedIndex = recipe._id;
		}
	};
})
