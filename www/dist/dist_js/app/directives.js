angular.module('recipesApp')
  .directive('myYoutube', ['$sce', function ($sce) {
    return {
      restrict: 'EA',
      scope: {
        code: '='
      },
      replace: true,
      template: '<div style="height:350px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
      link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
          if (newVal) {
            scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
          }
        });
      }
    };
  }])


.directive('myFavoriteIcon', ['$sce', 'Authentication', 'UserFavorites', 'RecipesFavCount', '$cordovaToast', function ($sce, Authentication, UserFavorites, RecipesFavCount, $cordovaToast) {
  return {
    restrict: 'A',
    scope: {
      favorite: '='
    },
    replace: true,

    template: '<i ng-class=" emptyIcon ? \'icon ion-ios-heart-outline\' : \'icon ion-ios-heart animated bounceIn\'" style="font-size:30px"></i>',
    link: function (scope, elem, attrs) {
      elem.on('click', function () {
        /*$cordovaToast.show('Moved To Favorites', 'long', 'bottom').then(function (success) {
	console.log("The toast was shown");
}, function (error) {
	console.log("The toast was not shown due to " + error);
});*/
        if (Authentication.user) {
          if (scope.favorite) {
            if (scope.emptyIcon) {
              scope.emptyIcon = false;
              Authentication.user.favorites.push(scope.favorite.videoId);
              var favRecipe = scope.favorite;
              favRecipe.favoritesCount = scope.favorite.favoritesCount + 1;
              console.log('Fav count is: ' + favRecipe.favoritesCount);
              RecipesFavCount.update({
                recipeId: favRecipe._id
              }, favRecipe, function (res) {
                console.log('Details Recipesss fav is cb : ');
              }, function (err) {
                scope.emptyIcon = true;
              });
            } else {
              scope.emptyIcon = true;
              var favRecipe = scope.favorite;
              Authentication.user.favorites.splice(Authentication.user.favorites.indexOf(scope.favorite.videoId), 1);
              favRecipe.favoritesCount = scope.favorite.favoritesCount - 1;
              console.log('Fav count is: ' + favRecipe.favoritesCount);
              RecipesFavCount.update({
                recipeId: favRecipe._id
              }, favRecipe, function (res) {
                console.log('Details Recipesss fav is cb : ');
              }, function (err) {
                scope.emptyIcon = false;
              });
            }
            var user = {
              firstName: Authentication.user.firstName,
              lastName: Authentication.user.lastName,
              favorites: scope.favorite.videoId
            }
            UserFavorites.update({
              userId: Authentication.user._id
            }, user, function (res) {
              console.log('Details fav is cb : ');
            }, function (err) {
              //scope.emptyIcon = true;
            });
          } else {
            console.log('It is off!');
            //scope.emptyIcon = true;
          }
        } else console.log('User is not logged in please login')
      });
      scope.$watch('favorite', function (newVal) {
        //console.log('Fav directive is called')
        if (newVal) {
          var user = Authentication.user;
          if (user)
            if (user.favorites.indexOf(newVal.videoId) == -1) {
              scope.emptyIcon = true;
            } else {
              scope.emptyIcon = false;
            }
        }
      });
    }
  };
}])






.directive('myLikeIcon', ['$sce', 'Authentication', 'RecipesFavCount', '$cordovaToast', 'UserFavorites', function ($sce, Authentication, RecipesFavCount, $cordovaToast, UserFavorites) {
  return {
    restrict: 'A',
    scope: {
      favorite: '='
    },
    replace: true,

    template: '<i ng-class=" emptyIcon ? \'ion ion-thumbsup\' : \'ion ion-thumbsup animated bounceIn\'" style="font-size:30px"></i>',
    link: function (scope, elem, attrs) {
      elem.on('click', function () {
        if (Authentication.user) {
          /*	$cordovaToast.show('Liked this Recipe', 'long', 'bottom').then(function (success) {
		console.log("The toast was shown");
	}, function (error) {
		console.log("The toast was not shown due to " + error);
	});*/
          if (scope.favorite) {
            if (scope.emptyIcon) {
              scope.emptyIcon = false;
              console.log('Before the like pushed into User is : ' + JSON.stringify(Authentication.user))
              console.log('Video Id is came to push into user is: ' + scope.favorite.videoId)
              Authentication.user.likes.push(scope.favorite.videoId);
              console.log('After the like pushed into User is : ' + JSON.stringify(Authentication.user))
              var favRecipe = scope.favorite;
              favRecipe.applikes = scope.favorite.applikes + 1;
              console.log('Applikes count is: ' + favRecipe.applikes);
              RecipesFavCount.update({
                recipeId: favRecipe._id
              }, favRecipe, function (res) {
                console.log('Details Recipesss fav is cb : ');
              }, function (err) {
                scope.emptyIcon = true;
              });
              var user = {
                firstName: Authentication.user.firstName,
                lastName: Authentication.user.lastName,
                likes: scope.favorite.videoId
              }
              UserFavorites.update({
                userId: Authentication.user._id
              }, user, function (res) {
                console.log('Details fav is cb : ');
              }, function (err) {
                //scope.emptyIcon = true;
              });
            }
          } else {
            console.log('It is off!');
            //scope.emptyIcon = true;
          }
        } else console.log('User is not logged in please login')
      });

      scope.$watch('favorite', function (newVal) {

        if (newVal) {
          var user = Authentication.user;
          if (user)
            if (user.likes.indexOf(newVal.videoId) == -1) {
              scope.emptyIcon = true;
            } else {
              scope.emptyIcon = false;
            }
        }
      });
    }
  };
}])









.directive('myTabs', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: ['$scope', function ($scope) {
      var tabs = $scope.tabs = [];

      $scope.select = function (tab) {
        angular.forEach(tabs, function (tab) {
          tab.selected = false;
        });
        tab.selected = true;
        $scope.$emit('my-tabs-changed', tab);
      };

      this.addTab = function (tab) {
        if (tabs.length === 0) {
          $scope.select(tab);
        }
        tabs.push(tab);
      };
    }],
    templateUrl: 'templates/partials/my-tabs.html'
  };
})

.directive('myTab', function () {
  return {
    require: '^myTabs',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function (scope, element, attrs, tabsCtrl) {
      tabsCtrl.addTab(scope);
    },
    templateUrl: 'templates/partials/my-tab.html'
  };
})

.directive('validPin', ['$http', function ($http) {
  return {
    require: 'ngModel',
    link: function (scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function (pinValue) {
        // $http({
        // 	method: 'POST',
        // 	url: '/api/check/' + attrs.validPin,
        // 	data: {'pin': attrs.validPin}
        // }).success(function(data, status, headers, cfg) {
        // 	c.$setValidity('valid-pin', data.isValid);
        // }).error(function(data, status, headers, cfg) {
        // 	c.$setValidity('valid-pin', false);
        // });
        if (pinValue == "12345") {
          c.$setValidity('valid-pin', true);
        } else {
          c.$setValidity('valid-pin', false);
        }
      });
    }
  };
}])


.directive('showHideContainer', function () {
  return {
    scope: {

    },
    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
      $scope.show = false;

      $scope.toggleType = function ($event) {
        $event.stopPropagation();
        $event.preventDefault();

        $scope.show = !$scope.show;

        // Emit event
        $scope.$broadcast("toggle-type", $scope.show);
      };
    }],
    templateUrl: 'templates/partials/show-hide-password.html',
    restrict: 'A',
    replace: false,
    transclude: true
  };
})


.directive('showHideInput', function () {
  return {
    scope: {

    },
    link: function (scope, element, attrs) {
      // listen to event
      scope.$on("toggle-type", function (event, show) {
        var password_input = element[0],
          input_type = password_input.getAttribute('type');

        if (!show) {
          password_input.setAttribute('type', 'password');
        }

        if (show) {
          password_input.setAttribute('type', 'text');
        }
      });
    },
    require: '^showHideContainer',
    restrict: 'A',
    replace: false,
    transclude: false
  };
})


.directive('biggerText', ['$ionicGesture', function ($ionicGesture) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $ionicGesture.on('touch', function (event) {
        event.stopPropagation();
        event.preventDefault();

        var text_element = document.querySelector(attrs.biggerText),
          root_element = document.querySelector(".menu-content"),
          current_size_str = window.getComputedStyle(text_element, null).getPropertyValue('font-size'),
          current_size = parseFloat(current_size_str),
          new_size = Math.min((current_size + 2), 24),
          new_size_str = new_size + 'px';

        root_element.classList.remove("post-size-" + current_size_str);
        root_element.classList.add("post-size-" + new_size_str);
      }, element);
    }
  };
}])

.directive('smallerText', ['$ionicGesture', function ($ionicGesture) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $ionicGesture.on('touch', function (event) {
        event.stopPropagation();
        event.preventDefault();

        var text_element = document.querySelector(attrs.smallerText),
          root_element = document.querySelector(".menu-content"),
          current_size_str = window.getComputedStyle(text_element, null).getPropertyValue('font-size'),
          current_size = parseFloat(current_size_str),
          new_size = Math.max((current_size - 2), 12),
          new_size_str = new_size + 'px';

        root_element.classList.remove("post-size-" + current_size_str);
        root_element.classList.add("post-size-" + new_size_str);
      }, element);
    }
  };
}]);
