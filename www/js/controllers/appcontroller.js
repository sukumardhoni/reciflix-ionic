angular.module('recipesApp')
  .controller('AppCtrl', function ($scope, SearchedRecipes, $stateParams, $ionicLoading, $timeout, Authentication, $state) {

    $scope.authentication = Authentication.user;

    //console.log('Current State Name is : ' + $state.current.name);
    $scope.currentStateName = $stateParams.name;

    $scope.signout = function () {
      console.log('signout');
      $scope.authentication = '';
      Authentication.user = '';
      openFB.logout(
          function (response) {
            console.log('Successfully logout fb user');
            $state.go('walkthrough');
          })
        //	$state.go('walkthrough');
    }

    if ($stateParams.searchQuery) {
      $ionicLoading.show({
        templateUrl: "templates/loading.html",
      });
      var pageId = 0;

      SearchedRecipes.query({
        pageId: pageId,
        searchQuery: $stateParams.searchQuery
      }, function (res) {
        $ionicLoading.hide();
        $scope.recipes = res;
        pageId++;
      })
    }

    $scope.userliked = function (aVideoId) {
      var user = Authentication.user;
      if (user.likes.indexOf(aVideoId) == -1) {
        return false;
      } else {
        return true;
      }
      return false;
    };

    Array.prototype.unique = function () {
      console.log('Console at unique')
      var a = this.concat();
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i] === a[j])
            a.splice(j--, 1);
        }
      }
      return a;
    }

    $scope.searchQueryLoadMore = function () {
      console.log('loadMore Search query is called');
      $timeout(function () {
        var onScroll = {};
        SearchedRecipes.query({
          pageId: pageId,
          searchQuery: $stateParams.searchQuery
        }, function (res) {
          onScroll = res;
          pageId++;
          if (res.length == 0) {
            $scope.noMoreItemsAvailable = true;
          }
          var oldRecipes = $scope.recipes;
          $scope.recipes = oldRecipes.concat(onScroll).unique();
          console.log('On Scroll Content recipes length : ' + onScroll.length);
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, 100);
    };

    $scope.sendMail = function () {
      console.log('sendMail is called');
      cordova.plugins.email.isAvailable(
        function (isAvailable) {
          cordova.plugins.email.open({
            to: 'vinodhko@globaltechminds.com',
            cc: '',
            // bcc:     ['john@doe.com', 'jane@doe.com'],
            subject: 'ReciFlixApp Testing',
            body: 'How are you? Nice greetings from ReciFlixApp'
          });
        }
      );
    };


    $scope.sharePost = function () {
      console.log('Share Post is called');
      window.plugins.socialsharing.share('Check this post here: ', null, null, null);
      //window.plugins.socialsharing.share('Message and image', null, 'https://www.google.nl/images/srpr/logo4w.png', null);
      //Message,Subject,Image,Link these are the four arguments in share
    };
  })
