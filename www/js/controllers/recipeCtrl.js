angular.module('recipesApp')

.controller('allRecipesCtrl', function ($scope, $stateParams, $timeout, $ionicLoading, RecipesByCategory, SingleRecipe, Authentication, $http, $localStorage) {
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
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
})

.controller('subCatRecipesCtrl', function ($scope, $stateParams, $timeout, $ionicLoading, RecipesBySubCat, SingleRecipe, Authentication, $http, $localStorage) {
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  var item = $stateParams.subCatId;
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
  $scope.subCatName = $stateParams.subCatName;
  var pageId = 0;
  $scope.initialQueryRecipes = function () {
    RecipesBySubCat.query({
      pageId: pageId,
      subCatId: $stateParams.subCatId
    }, function (res) {
      $scope.recipes = res.recipes;
      $ionicLoading.hide();
      pageId++;
    });
  };
  $scope.loadMore = function () {
    $timeout(function () {
      var onScroll = {};
      RecipesBySubCat.query({
        pageId: pageId,
        subCatId: $stateParams.subCatId
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
