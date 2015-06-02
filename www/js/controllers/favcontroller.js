angular.module('recipesApp')
  .controller('myFavoritesCtrl', function ($scope, $stateParams, Authentication, MyFavRecipes, $ionicLoading) {
    var pageId = 0;
    $scope.favoriteFunc = function () {
      if (Authentication.user) {
        console.log('User fav ids : ' + Authentication.user.favorites)
        $scope.authentication = Authentication;

        $ionicLoading.show({
          templateUrl: "templates/loading.html",
        });
        MyFavRecipes.query({
          pageId: pageId,
          userId: Authentication.user._id
        }, function (res) {
          $ionicLoading.hide();
          console.log('Callback response on myfav successfuuly');
          $scope.recipes = res;
          pageId++;
        })
      } else {
        console.log('User is not logged in please create an account or login');
        //$scope.notLoggedIn = 'User is not logged in please create an account or login';
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
          console.log('Previous recipes on scrool is : ' + $scope.recipes.length);
          var oldRecipes = $scope.recipes;
          $scope.recipes = oldRecipes.concat(onScroll).unique();
          console.log('On Scroll Content recipes : ' + JSON.stringify(onScroll));
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    };

    $scope.changeClass = function (recipe) {
      //	console.log('allRecipesCtrl controller')
      if ($scope.selectedIndex === recipe._id) {
        $scope.selectedIndex = true;
      } else {
        $scope.selectedIndex = recipe._id;
      }
    };
  })
