angular.module('recipesApp')
  .controller('allCategoriesCtrl', function ($scope, $state, $stateParams, Categories, $ionicPopover, $timeout, $rootScope, Authentication, $ionicLoading, $http, $localStorage, $ionicHistory) {

    //$http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;

    $scope.userDetails = Authentication;
    //console.log('User details from window service is : ' + JSON.stringify($scope.userDetails));
    $scope.oModal1 = $rootScope.modal1;
    $scope.oModal2 = $rootScope.modal2;
    $scope.oModal1.hide();
    $scope.oModal2.hide();

    $scope.uesrId = $stateParams.userId;
    var pageId = 0;


    $ionicLoading.show({
      templateUrl: "templates/loading.html",
    });

    Categories.query({
      pageId: pageId
    }, function (res) {
      $scope.categories = res;
      console.log('Categories collection is:' + JSON.stringify(res))
      $ionicLoading.hide();
      pageId++;
      //$scope.loadMore();
    });

    //make sure the history is reset for Backbutton

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = false;
      $ionicHistory.clearHistory();
    });

    $ionicPopover.fromTemplateUrl('templates/dropdownmenu.html', {
      scope: $scope,
    }).then(function (popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
      $scope.popover.show($event);
    };

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
          $scope.$broadcast('scroll.resize'); //TODO see if required or not
          console.log('On Scroll Content recipes : ' + JSON.stringify(onScroll));
        });
      }, 100);
    }

  })
