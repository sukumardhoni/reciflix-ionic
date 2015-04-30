// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('recipesApp', ['ionic', 'ngResource'])

.run(['$ionicPlatform', function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}])

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	openFB.init({
		appId: 1577978382487078
	});

	$stateProvider
		.state('walkthrough', {
			url: "/",
			templateUrl: "templates/walkthrough.html",
			controller: 'walkthroughCtrl'
		})
		.state('login', {
			url: "/login",
			templateUrl: "templates/login.html",
			controller: 'loginCtrl'
		})
		.state('signup', {
			url: "/signup",
			templateUrl: "templates/signup.html",
			controller: 'signupCtrl'
		})
		.state('about', {
			url: "/about",
			templateUrl: "templates/about.html",
		})
		.state('forgot-password', {
			url: "/forgot-password",
			templateUrl: "templates/forgot-password.html",
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
			url: "/categoriesVideos/:categorieName",
			views: {
				'menuContent': {
					templateUrl: "templates/recipesUnderCategory.html",
					controller: "allRecipesCtrl"
				}
			}
		})

	.state('app.slides', {
			url: "/slides/:categorieName",
			views: {
				'menuContent': {
					templateUrl: "templates/contentSlides.html",
					controller: "ContentCtrl"
				}
			}
		})
		.state('app.showRecipes', {
			url: "/showRecipes",
			views: {
				'menuContent': {
					templateUrl: "templates/showRecipes.html",
					controller: "showRecipesCtrl"
				}
			}
		})


	.state('newRecipe', {
			url: "/newRecipe/:userId",
			templateUrl: "templates/newRecipe.html",
			controller: "newRecipeCtrl"
		})
		.state('showRecipes', {
			url: "/showRecipes",
			templateUrl: "templates/showRecipes.html",
			controller: "showRecipesCtrl"
		})
		.state('allRecipes', {
			/*	url: "/allRecipes/:userId",*/
			url: "/allRecipes/552226419f3cb2e4199fffda",
			templateUrl: "templates/allRecipes.html",
			controller: "allRecipesCtrl"
		})
		.state('allCategories', {
			url: "/allRecipes/:userId",
			//url: "/allCategories/552226419f3cb2e4199fffda",
			templateUrl: "templates/allCategories.html",
			controller: "allCategoriesCtrl"
		})
		.state('categoriesVideos', {
			url: "/categoriesVideos/:categorieName",
			templateUrl: "templates/showRecipes.html",
			controller: "allRecipesCtrl"
		})
		.state('singleRecipe', {
			url: "/singleRecipe/:recipeId",
			templateUrl: "templates/singleRecipe.html",
			controller: "singleRecipeCtrl"
		})
		.state('editRecipe', {
			url: "/editRecipe/:recipeId",
			templateUrl: "templates/editRecipe.html",
			controller: "singleRecipeCtrl"
		})

	//$urlRouterProvider.otherwise('/app/allCategories/552226419f3cb2e4199fffda');
	$urlRouterProvider.otherwise('/');
	//$ionicConfigProvider.backButton.text('').previousTitleText(false);
	$ionicConfigProvider.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
}]);
