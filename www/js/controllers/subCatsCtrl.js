angular.module('recipesApp')

.controller('subCatsCtrl', function ($scope, Authentication, $http, $localStorage, $stateParams, SubCats, $ionicLoading, CatByRank) {
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  $scope.userDetails = Authentication;
  var pageId = 0;
  $scope.subCats = function () {
    console.log('subCats fun. is called');
    $scope.catId = $stateParams.catId;
    $scope.catName = $stateParams.catName;
    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });
    SubCats.query({
      catId: $stateParams.catId,
      pageId: pageId
    }).$promise.then(function (res) {
      $scope.subcategories = res;
      //console.log('Successfully fetched subcats with cat object: ' + JSON.stringify(res));
      $ionicLoading.hide();
    }).catch(function (err) {
      console.log('Error happened : ' + JSON.stringify(err));
      $ionicLoading.hide();
      $scope.reuseAlert('Looks like there is an issue with your connectivity, Please check your network connection or Please try after sometime!', 'Connectivity Issue', 'Done', null);
    });
  };


  $scope.loadMore = function () {
    $timeout(function () {
      var onScroll = {};
      SubCats.query({
        catId: $stateParams.catId,
        pageId: pageId
      }, function (res) {
        onScroll = res;
        pageId++;
        if (res.length == 0) {
          $scope.noMoreItemsAvailable = true;
        }
        var oldsubcategories = $scope.subcategories;
        $scope.subcategories = oldsubcategories.concat(onScroll).unique();
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');
      });
    }, 100);
  }


  $scope.onSwipeLeft = function () {
    console.log('Swipe left function in subCatsCtrl :' + $scope.subcategories.rank);
    //Increament Rank and fetch cat and subcats

    CatByRank.query({
      rank: ($scope.subcategories.rank + 1)
    }).$promise.then(function (res) {
      $scope.subcategories = res;
      console.log('Successfully fetched subcats with cat object: ' + JSON.stringify(res));
      $ionicLoading.hide();
    }).catch(function (err) {
      console.log('Error happened : ' + JSON.stringify(err));
      $ionicLoading.hide();
      $scope.reuseAlert('Looks like there is an issue with your connectivity, Please check your network connection or Please try after sometime!', 'Connectivity Issue', 'Done', null);
    });

  };

  $scope.onSwipeRight = function () {
    console.log('Swipe right function in subCatsCtrl :' + $scope.subcategories.rank);
    //Decreament Rank and fetch cat and subcats

    if ($scope.subcategories.rank !== 1) {
      CatByRank.query({
        rank: ($scope.subcategories.rank - 1)
      }).$promise.then(function (res) {
        $scope.subcategories = res;
        console.log('Successfully fetched subcats with cat object: ' + JSON.stringify(res));
        $ionicLoading.hide();
      }).catch(function (err) {
        console.log('Error happened : ' + JSON.stringify(err));
        $ionicLoading.hide();
        $scope.reuseAlert('Looks like there is an issue with your connectivity, Please check your network connection or Please try after sometime!', 'Connectivity Issue', 'Done', null);
      });
    }

  };



});
