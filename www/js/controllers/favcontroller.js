angular.module('recipesApp')

.controller('myFavoritesCtrl', function ($scope, Authentication, MyFavRecipes, $ionicLoading, $http, $localStorage) {
  var pageId = 0;
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  $scope.favoriteFunc = function () {
    if (Authentication.user) {
      $scope.authentication = Authentication;
      $ionicLoading.show({
        templateUrl: "templates/loading.html",
      });
      MyFavRecipes.query({
        pageId: pageId,
        userId: Authentication.user._id
      }, function (res) {
        $ionicLoading.hide();
        $scope.recipes = res;
        pageId++;
      })
    } else {
      //console.log('User is not logged in please create an account or login');
    }
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
      });
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  };

  $scope.changeClass = function (recipe) {
    if ($scope.selectedIndex === recipe._id) {
      $scope.selectedIndex = true;
    } else {
      $scope.selectedIndex = recipe._id;
    }
  };
});
