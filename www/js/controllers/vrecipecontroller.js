angular.module('recipesApp')

.controller('allRecipesCtrl', function ($scope, $state, $stateParams, $ionicPopover, $timeout, $ionicLoading, RecipesByCategory, SingleRecipe, UserFavorites, Authentication, HardwareBackButtonManager) {
  HardwareBackButtonManager.enable();
  var item = $stateParams.categorieName;
  $scope.singleRecipe = function () {
    SingleRecipe.get({
      recipeId: $stateParams.recipeId
    }, function (res) {
      $ionicLoading.hide();
      $scope.recipe = res;
    });
  }
  $ionicLoading.show({
    templateUrl: "templates/loading.html",
  });
  $scope.CatName = $stateParams.catName;
  var pageId = 0;
  $scope.initialQueryRecipes = function () {
    RecipesByCategory.query({
      pageId: pageId,
      CategoryName: $stateParams.categorieName
    }, function (res) {
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
      });
    }, 1000);
  }
});
