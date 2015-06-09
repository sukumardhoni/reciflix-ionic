// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('recipesApp', ['ionic', 'ngResource', 'ngCordova', 'ngStorage'])

.run(function ($ionicPlatform, $state, $rootScope, $ionicPopup, $http, $localStorage) {
  $rootScope.$state = $state;
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
  });
  $ionicPlatform.registerBackButtonAction(function (e) {
    if ($state.includes('app.allCategories')) {
      console.log('Back button is triggred in IF')
      e.preventDefault();
      $ionicPopup.confirm({
        title: 'System warning',
        template: 'are you sure you want to exit?'
      }).then(function (res) {
        if (res) {
          navigator.app.exitApp();
        }
      })
    } else {
      console.log('Back button is triggred')
    }
  }, 100);


})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  openFB.init({
    appId: 1577978382487078
  });

  $stateProvider
    .state('walkthrough', {
      url: "/",
      templateUrl: "templates/walkthrough.html",
      controller: 'walkthroughCtrl'
    })
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/side-menu.html",
      controller: 'AppCtrl'
    })
    .state('app.allCategories', {
      //url: "/allCategories/552226419f3cb2e4199fffda",
      url: "/allRecipes/:userId",
      views: {
        'menuContent': {
          templateUrl: "templates/allCategories.html",
          controller: "allCategoriesCtrl"
        }
      }
    })
    .state('app.categoriesVideos', {
      url: "/categoriesVideos/:categorieName/:catName",
      views: {
        'menuContent': {
          templateUrl: "templates/recipesUnderCategory.html",
          controller: "allRecipesCtrl"
        }
      }
    })

  .state('app.slides', {
      url: "/slides/:recipeId",
      views: {
        'menuContent': {
          templateUrl: "templates/contentSlides.html",
          controller: "allRecipesCtrl"
        }
      }
    })
    .state('app.showRecipes', {
      url: "/showRecipes/:videoId",
      views: {
        'menuContent': {
          templateUrl: "templates/showRecipes.html",
          controller: "showRecipesCtrl"
        }
      }
    })
    .state('app.myFav', {
      url: "/myFavorites",
      views: {
        'menuContent': {
          templateUrl: "templates/myFavorites.html",
          controller: "myFavoritesCtrl"
        }
      }
    })
    .state('app.search', {
      url: "/search",
      views: {
        'menuContent': {
          templateUrl: "templates/search.html",
          //controller: "AppCtrl"
        }
      }
    })
    .state('app.searchedRecipes', {
      url: "/searchedRecipes/:searchQuery",
      views: {
        'menuContent': {
          templateUrl: "templates/searchedRecipes.html",
          controller: "AppCtrl"
        }
      }
    })
    .state('app.featuredRecipes', {
      url: "/featuredRecipes/:name",
      views: {
        'menuContent': {
          templateUrl: "templates/newPage.html",
          controller: "AppCtrl"
        }
      }
    })
    .state('app.groceryList', {
      url: "/groceryList/:name",
      views: {
        'menuContent': {
          templateUrl: "templates/newPage.html",
          controller: "AppCtrl"
        }
      }
    })
    .state('app.myCalendarPlan', {
      url: "/myCalendarPlan/:name",
      views: {
        'menuContent': {
          templateUrl: "templates/newPage.html",
          controller: "AppCtrl"
        }
      }
    })
    .state('app.settings', {
      url: "/settings/:name",
      views: {
        'menuContent': {
          templateUrl: "templates/newPage.html",
          controller: "AppCtrl"
        }
      }
    })
    .state('app.userNotLoggedIn', {
      url: "/userNotLoggedIn",
      views: {
        'menuContent': {
          templateUrl: "templates/userNotLoggedIn.html"
        }
      }
    })
  $urlRouterProvider.otherwise('/');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.ios.backButton.text('&nbsp;').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

});
