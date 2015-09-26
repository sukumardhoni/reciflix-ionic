angular.module('recipesApp')

.controller('subCatsCtrl', function ($scope, Authentication, $http, $localStorage, $stateParams, SubCats, $ionicLoading, CatByRank, CatMap, $timeout, RecipesByCategory, $rootScope) {
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  $scope.userDetails = Authentication;
  var subCatsPageId = 999;
  var recipesPageId = 0;
  $scope.subCats = function () {
    console.log('subCats fun. is called');
    $scope.catId = $stateParams.catId;
    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });
    SubCats.query({
      catId: $stateParams.catId,
      pageId: subCatsPageId,
      activeFilter: 1 // get only active sub cats
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

  $scope.onSwipeLeft = function () {
    $scope.animateShow = false;
    //subCatsPageId = 0;
    console.log('Swipe left function in subCatsCtrl :' + $scope.subcategories.rank);
    //Increament Rank and fetch cat and subcats
    $rootScope.rescatId = CatMap.getCatId(1, $scope.subcategories.catId)
    console.log('Res cat id details : ' + $rootScope.rescatId);
    SubCats.query({
      catId: $rootScope.rescatId,
      pageId: subCatsPageId,
      activeFilter: 1 // get only active sub cats
    }).$promise.then(function (res) {
      $scope.subcategories = res;
      //subCatsPageId++;
      //console.log('Successfully fetched subcats with cat object: ' + JSON.stringify(res));
      $ionicLoading.hide();
    }).catch(function (err) {
      console.log('Error happened : ' + JSON.stringify(err));
      $ionicLoading.hide();
      $scope.reuseAlert('Looks like there is an issue with your connectivity, Please check your network connection or Please try after sometime!', 'Connectivity Issue', 'Done', null);
    });
  };

  $scope.onSwipeRight = function () {
    $scope.animateShow = false;
    //subCatsPageId = 0;
    console.log('Swipe right function in subCatsCtrl :' + $scope.subcategories.rank);
    //Decreament Rank and fetch cat and subcats
    //if ($scope.subcategories.rank !== 1) {
    $rootScope.rescatId = CatMap.getCatId(-1, $scope.subcategories.catId)
    console.log('Res cat id details : ' + $rootScope.rescatId);
    SubCats.query({
      catId: $rootScope.rescatId,
      pageId: subCatsPageId,
      activeFilter: 1 // get only active sub cats
    }).$promise.then(function (res) {
      $scope.subcategories = res;
      //console.log('Successfully fetched subcats with cat object: ' + JSON.stringify(res));
      $ionicLoading.hide();
    }).catch(function (err) {
      console.log('Error happened : ' + JSON.stringify(err));
      $ionicLoading.hide();
      $scope.reuseAlert('Looks like there is an issue with your connectivity, Please check your network connection or Please try after sometime!', 'Connectivity Issue', 'Done', null);
    });
    //}
  };

})
