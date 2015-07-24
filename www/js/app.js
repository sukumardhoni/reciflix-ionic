angular.module('recipesApp', ['ionic', 'ngResource', 'ngCordova', 'ngStorage', 'xeditable'])

.run(function ($ionicPlatform, $state, $rootScope, $ionicPopup, $http, $localStorage) {
  $rootScope.$state = $state;
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;
    if (window.cordova) {
    $rootScope.networkState = navigator.connection.type;
    }
    /*var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
    deviceInfo.get(
      function (result) {
        //console.log("result = " + result);
      },
      function () {
        //console.log("error");
      });*/
    // navigator.analytics.setTrackingId('UA-65211986-2');
  });

  $ionicPlatform.registerBackButtonAction(function () {

    if ($state.includes('app.allCategories') || $state.includes('landingCtrl')) {
      $ionicPopup.confirm({
        title: 'ReciFlix Warning',
        template: 'Are you sure you want to exit ReciFlix?'
      }).then(function (res) {
        if (res) {
          navigator.app.exitApp();
        } else {
          //console.log('You are not sure');
        }
      })
    } else {
      navigator.app.backHistory();
    }
  }, 100);

})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  openFB.init({
    appId: 1607966326154856
  });
  $stateProvider
    .state('landing', {
      url: "",
      templateUrl: "templates/landing.html",
      controller: 'landingCtrl'
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'landingCtrl'
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "templates/signup.html",
      controller: 'landingCtrl'
    })
    .state('forgotPwd', {
      url: "/forgotPwd",
      templateUrl: "templates/forgotPwd.html",
      controller: 'landingCtrl'
    })
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/side-menu.html",
      controller: 'AppCtrl'
    })
    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/viewProfile.html"
        }
      }
    })
    .state('app.editProfile', {
      url: "/editProfile",
      views: {
        'menuContent': {
          templateUrl: "templates/editProfile.html"
        }
      }
    })
    .state('app.changePwd', {
      url: "/changePwd",
      views: {
        'menuContent': {
          templateUrl: "templates/changePwd.html"
        }
      }
    })
    .state('app.allCategories', {
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
    .state('app.grocery', {
      url: "/grocerys",
      views: {
        'menuContent': {
          templateUrl: "templates/grocery.html",
          controller: "grocerysCtrl"
        }
      }
    })
    .state('app.singlegrocery', {
      url: "/:groceryId/:groceryName",
      views: {
        'menuContent': {
          templateUrl: "templates/singlegrocery.html",
          controller: "grocerysCtrl"
        }
      }
    })
    .state('app.singlegrocery.all', {
      url: "/all",
      views: {
        'tab-all': {
          templateUrl: "templates/singlegroceryall.html",
          controller: "grocerysCtrl"
        }
      }
    })
    .state('app.singlegrocery.buy', {
      url: "/buy",
      views: {
        'tab-buy': {
          templateUrl: "templates/singlegrocerybuy.html",
          controller: "grocerysCtrl"
        }
      }
    })
    .state('app.singlegrocery.buyed', {
      url: "/buyed",
      views: {
        'tab-buyed': {
          templateUrl: "templates/singlegrocerybuyed.html",
          controller: "grocerysCtrl"
        }
      }
    })
    .state('app.search', {
      url: "/search",
      views: {
        'menuContent': {
          templateUrl: "templates/search.html"
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
    .state('app.myCalendarPlan', {
      url: "/myCalendarPlan/:name",
      views: {
        'menuContent': {
          templateUrl: "templates/newPage.html",
          controller: "AppCtrl"
        }
      }
    })
    .state('app.shareApp', {
      url: "/shareApp",
      views: {
        'menuContent': {
          templateUrl: "templates/shareApp.html",
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
  $urlRouterProvider.otherwise('');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.ios.backButton.text('&nbsp;').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
});
