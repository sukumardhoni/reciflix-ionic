angular.module('recipesApp')

.controller('subCatsCtrl', function ($scope, Authentication, $http, $localStorage, $stateParams, SubCats, $ionicLoading) {
  $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  $scope.userDetails = Authentication;
  $scope.subCats = function () {
    console.log('subCats fun. is called');
    $scope.catId = $stateParams.catId;
    $scope.catName = $stateParams.catName;
    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });
    SubCats.query({
      catId: '55c04f96aa1abd2424393a91'
    }).$promise.then(function (res) {
      $scope.subcategories = res;
      $ionicLoading.hide();
    }).catch(function (err) {
      console.log('Error happened : ' + JSON.stringify(err));
      $ionicLoading.hide();
      $scope.reuseAlert('Looks like there is an issue with your connectivity, Please check your network connection or Please try after sometime!', 'Connectivity Issue', 'Done', null);
    });
  };
});
