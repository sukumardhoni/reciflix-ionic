angular.module('recipesApp')
  .directive('myYoutube', function ($sce) {
    return {
      restrict: 'EA',
      scope: {
        code: '='
      },
      replace: true,
      template: '<div style="height:350px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
      link: function (scope) {
        scope.$watch('code', function (newVal) {
          if (newVal) {
            scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
          }
        });
      }
    };
  })

.directive('myFavoriteIcon', function ($sce, Authentication, UserFavorites, RecipesFavCount, $cordovaToast, $state, $http, $localStorage) {
  return {
    restrict: 'A',
    scope: {
      favorite: '='
    },
    replace: true,
    template: '<i ng-class=" emptyIcon ? \'icon ion-ios-heart-outline\' : \'icon ion-ios-heart animated bounceIn\'" style="font-size:30px"></i>',
    link: function (scope, elem, attrs) {
      elem.on('click', function () {
        /*
                $cordovaToast.show('Moved this Recipe To Favorites', 'long', 'bottom').then(function (success) {}, function (error) {
                  console.log("The toast was not shown due to " + error);
                });*/
        if (Authentication.user) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
          if (scope.favorite) {
            if (scope.emptyIcon) {
              scope.emptyIcon = false;
              Authentication.user.favorites.push(scope.favorite.videoId);
              var favRecipe = scope.favorite;
              favRecipe.favoritesCount = scope.favorite.favoritesCount + 1;
              RecipesFavCount.update({
                recipeId: favRecipe._id
              }, favRecipe, function (res) {
                //console.log('Recipe favorite cb');
              }, function (err) {
                scope.emptyIcon = true;
              });
            } else {
              scope.emptyIcon = true;
              var favRecipe = scope.favorite;
              Authentication.user.favorites.splice(Authentication.user.favorites.indexOf(scope.favorite.videoId), 1);
              favRecipe.favoritesCount = scope.favorite.favoritesCount - 1;
              RecipesFavCount.update({
                recipeId: favRecipe._id
              }, favRecipe, function (res) {
                //console.log('Recipe Unfavorite cb');
              }, function (err) {
                scope.emptyIcon = false;
              });
            }
            var user = {
              firstName: Authentication.user.firstName,
              lastName: Authentication.user.lastName,
              favorites: scope.favorite.videoId,
              provider: Authentication.user.provider
            }
            UserFavorites.update({
              userId: Authentication.user._id
            }, user, function (res) {
              //console.log('Details User Update fav  Service cb ');
            }, function (err) {
              //scope.emptyIcon = true;
            });
          } else {
            console.log('It is off!');
          }
        } else {
          $state.go('app.userNotLoggedIn');
        }
      });
      scope.$watch('favorite', function (newVal) {
        if (newVal) {
          var user = Authentication.user;
          if (user) {
            if (user.favorites.indexOf(newVal.videoId) == -1) {
              scope.emptyIcon = true;
            } else {
              scope.emptyIcon = false;
            }
          } else {
            scope.emptyIcon = true;
          }
        }
      });
    }
  };
})

.directive('myLikeIcon', function ($sce, Authentication, RecipesFavCount, $cordovaToast, UserFavorites, $state, $http, $localStorage) {
  return {
    restrict: 'A',
    scope: {
      likes: '='
    },
    replace: true,
    template: '<i ng-class=" emptyIcon ? \'ion ion-thumbsup\' : \'ion ion-thumbsup animated bounceIn\'" style="font-size:30px"></i>',
    link: function (scope, elem, attrs) {
      elem.on('click', function () {
        if (Authentication.user) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
          if (scope.likes) {
            if (scope.emptyIcon) {
              scope.emptyIcon = false;
              Authentication.user.likes.push(scope.likes.videoId);
              var favRecipe = scope.likes;
              favRecipe.applikes = scope.likes.applikes + 1;
              RecipesFavCount.update({
                recipeId: favRecipe._id
              }, favRecipe, function (res) {
                //console.log('Recipe Liked cb ');
              }, function (err) {
                scope.emptyIcon = true;
              });
            } else {
              scope.emptyIcon = true;
              var favRecipe = scope.likes;
              Authentication.user.likes.splice(Authentication.user.likes.indexOf(scope.likes.videoId), 1);
              favRecipe.applikes = scope.likes.applikes - 1;
              RecipesFavCount.update({
                recipeId: favRecipe._id
              }, favRecipe, function (res) {
                //console.log('Recipe UnLike cb');
              }, function (err) {
                scope.emptyIcon = false;
              });
            }
            var user = {
              firstName: Authentication.user.firstName,
              lastName: Authentication.user.lastName,
              likes: scope.likes.videoId,
              provider: Authentication.user.provider
            }
            UserFavorites.update({
              userId: Authentication.user._id
            }, user, function (res) {
              //console.log('Details User Update Likes Service cb ');
            }, function (err) {
              //scope.emptyIcon = true;
            });
          } else {}
        } else {
          $state.go('app.userNotLoggedIn');
        }
      });

      scope.$watch('likes', function (newVal) {
        if (newVal) {
          var user = Authentication.user;
          if (user) {
            if (user.likes.indexOf(newVal.videoId) == -1) {
              scope.emptyIcon = true;
            } else {
              scope.emptyIcon = false;
            }
          } else {
            scope.emptyIcon = true;
          }
        }
      });
    }
  };
})

.directive('showHideContainer', function () {
  return {
    scope: {},
    controller: function ($scope, $element, $attrs) {
      $scope.show = false;
      $scope.toggleType = function ($event) {
        $event.stopPropagation();
        $event.preventDefault();
        $scope.show = !$scope.show;
        $scope.$broadcast("toggle-type", $scope.show);
      };
    },
    templateUrl: 'templates/partials/show-hide-password.html',
    restrict: 'A',
    replace: false,
    transclude: true
  };
})

.directive('showHideInput', function () {
  return {
    scope: {},
    link: function (scope, element, attrs) {
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
