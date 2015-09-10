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
      pageId: subCatsPageId
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

  $scope.loadMoreSubCats = function () {
    $timeout(function () {
      var onScroll = {};
      SubCats.query({
        catId: $rootScope.rescatId,
        pageId: subCatsPageId
      }, function (res) {
        onScroll = res;
        //subCatsPageId++;
        if (res.length == 0) {
          $scope.noMoreItemsAvailable = true;
        }
        var oldsubcategories = $scope.subcategories.subCats;
        $scope.subcategories.subCats = oldsubcategories.concat(onScroll).unique();
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');
      });
    }, 100);
  }


  $scope.onSwipeLeft = function () {
    //subCatsPageId = 0;
    console.log('Swipe left function in subCatsCtrl :' + $scope.subcategories.rank);
    //Increament Rank and fetch cat and subcats
    $rootScope.rescatId = CatMap.getCatId(1, $scope.subcategories.catId)
    console.log('Res cat id details : ' + $rootScope.rescatId);
    SubCats.query({
      catId: $rootScope.rescatId,
      pageId: subCatsPageId
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
    //subCatsPageId = 0;
    console.log('Swipe right function in subCatsCtrl :' + $scope.subcategories.rank);
    //Decreament Rank and fetch cat and subcats
    if ($scope.subcategories.rank !== 1) {
      $rootScope.rescatId = CatMap.getCatId(-1, $scope.subcategories.catId)
      console.log('Res cat id details : ' + $rootScope.rescatId);
      SubCats.query({
        catId: $rootScope.rescatId,
        pageId: subCatsPageId
      }).$promise.then(function (res) {
        $scope.subcategories = res;
        //console.log('Successfully fetched subcats with cat object: ' + JSON.stringify(res));
        $ionicLoading.hide();
      }).catch(function (err) {
        console.log('Error happened : ' + JSON.stringify(err));
        $ionicLoading.hide();
        $scope.reuseAlert('Looks like there is an issue with your connectivity, Please check your network connection or Please try after sometime!', 'Connectivity Issue', 'Done', null);
      });
    }
  };


  /*  $scope.loadMoreRecipes = function () {
      console.log('Load more cipes is called')
      $timeout(function () {
        var onScroll = {};
        RecipesByCategory.query({
          pageId: recipesPageId,
          CategoryName: $rootScope.rescatId
        }, function (res) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          onScroll = res;
          recipesPageId++;
          if (res.length == 0) {
            $scope.noMoreItemsAvailable = true;
          }
          var oldRecipes = $scope.subcategories.recipes;
          $scope.subcategories.recipes = oldRecipes.concat(onScroll);
          $scope.$broadcast('scroll.resize');
        });
      }, 1000);
    }*/



});
