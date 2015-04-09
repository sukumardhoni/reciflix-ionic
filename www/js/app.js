// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('recipesApp', ['ionic', 'ngResource'])

.run(function ($ionicPlatform) {
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
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	openFB.init({
		appId: 1577978382487078
	});

	$stateProvider
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
		.state('newRecipe', {
			url: "/newRecipe/:userId",
			templateUrl: "templates/newRecipe.html",
			controller: "newRecipeCtrl"
		})
		.state('allRecipes', {
			url: "/allRecipes/:userId",
			templateUrl: "templates/allRecipes.html",
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
	$urlRouterProvider.otherwise('/login');
	$ionicConfigProvider.backButton.text('').previousTitleText(false);
	$ionicConfigProvider.navBar.alignTitle('center');
});