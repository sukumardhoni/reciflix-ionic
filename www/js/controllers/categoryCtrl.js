angular.module('recipesApp')

.controller('allCategoriesCtrl', function ($scope, Categories, $timeout, $rootScope, Authentication, $ionicLoading, $http, $localStorage, $ionicHistory) {
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  $scope.userDetails = Authentication;
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
  });
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $ionicHistory.clearHistory();
  });
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
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');
      });
    }, 100);
  }
});
