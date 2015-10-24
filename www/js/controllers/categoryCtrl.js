angular.module('recipesApp')

.controller('allCategoriesCtrl', function ($scope, Categories, $timeout, $rootScope, Authentication, $ionicLoading, $http, $localStorage, $ionicHistory, $state, NewCategories) {
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  $scope.userDetails = Authentication;
  var pageId = 0;
  $ionicLoading.show({
    templateUrl: "templates/loading.html",
  });
  Categories.query({
    pageId: pageId
  }).$promise.then(function (res) {
    $scope.categories = res;
    $ionicLoading.hide();
    pageId++;
  }).catch(function (err) {
    console.log('Error happened : ' + JSON.stringify(err));
    $ionicLoading.hide();
    $scope.reuseAlert('Looks like there is an issue with your connectivity, Please check your network connection or Please try after sometime!', 'Connectivity Issue', 'Done', null);
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
        $scope.categories = oldCategories.concat(onScroll);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');
      });
    }, 100);
  }
})


.controller('NewCategoriesCtrl', function ($scope, Categories, $timeout, $rootScope, Authentication, $ionicLoading, $http, $localStorage, $ionicHistory, $state, NewCategories, CatMap) {
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  $scope.userDetails = Authentication;
  var pageId = 0;
  $ionicLoading.show({
    templateUrl: "templates/loading.html",
  });
  $scope.getNewCats = function () {
    NewCategories.query({
      pageId: pageId,
      activeFilter: 1
    }).$promise.then(function (res) {
      $scope.categories = res;
      CatMap.refreshCats($scope.categories);
      $ionicLoading.hide();
      pageId++;
    }).catch(function (err) {
      console.log('Error happened : ' + JSON.stringify(err));
      $ionicLoading.hide();
      $scope.reuseAlert('Looks like there is an issue with your connectivity, Please check your network connection or Please try after sometime!', 'Connectivity Issue', 'Done', null);
    });
  };

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $ionicHistory.clearHistory();
  });
  $scope.loadMoreNewCats = function () {
    console.log('Console at load more new cats function');

    $timeout(function () {
      var onScroll = {};
      //activeFilter 1= Active, 2=InActive, 3=All
      NewCategories.query({
        pageId: pageId,
        activeFilter: 1
      }, function (res) {
        onScroll = res;
        pageId++;
        if (res.length == 0) {
          $scope.noMoreItemsAvailable = true;
        }
        var oldCategories = $scope.categories;
        var concatArray = oldCategories.concat(onScroll);
        /* $scope.categories = concatArray.filter(function (item, pos) {
           return concatArray.indexOf(item) == pos
         });*/
        $scope.categories = concatArray;
        CatMap.refreshCats($scope.categories);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');
      });
    }, 100);
  }
})
