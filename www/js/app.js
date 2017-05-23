angular.module('recipesApp', ['ionic', 'ionic.native', 'ionic.service.core', 'ionic.service.deploy', 'ngResource', 'ngCordova', 'ngStorage', 'xeditable'])

	.run(function ($ionicPlatform, $state, $rootScope, $ionicPopup, $http, $localStorage, $ionicLoading) {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + $localStorage.token;

		//generating a unique string to identify guest user by time of the first app initialization, this value will be stored in localstorage and retrieved in subsequent visits//TODO move to a service later
		function generateRFUID() {
			var dtStr = new Date().toLocaleString().toString();
			dtStr = dtStr.replace(/,/g, '');
			dtStr = dtStr.replace(/\//g, '-');
			dtStr = dtStr.replace(/ /g, '-');
			dtStr = dtStr.replace(/:/g, '-');
			return dtStr;
		}

		var rfuid = $localStorage.RFUID;
		if (rfuid) {

		} else {
			rfuid = generateRFUID();
			$localStorage.RFUID = rfuid;
		}

		var platform = '';
		if (ionic.Platform.isAndroid()) {
			platform = 'Android'
		} else if (ionic.Platform.isIOS()) {
			platform = 'Ios'
		}

		$http.defaults.headers.common['Device'] = 'Mobile,' + platform;

		var currentUser = $localStorage.user;

		var userEmail = 'guest-' + rfuid;
		if (currentUser) {
			userEmail = currentUser.email;
		}

		$http.defaults.headers.common['Email'] = userEmail;

		$rootScope.$state = $state;
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
			if (window.cordova) {
				$rootScope.networkState = navigator.connection.type;
				window.open = cordova.InAppBrowser.open;
			}
			if (window.cordova) {
				cordova.getAppVersion.getVersionNumber(function (version) {
					//console.log('appVersion details : ' + version);
					$rootScope.appVersion = version;
				});
			} else {
				$rootScope.appVersion = '9.9.9'; //version available only when running in a device
			}

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

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			//console.log('State change start & state name is : ' + toState.name);
			if (toState.name == 'landing') {

				$ionicLoading.show({
					templateUrl: "templates/loading.html",
				}); //this is a function you created to show the loading animation
			}
		});
		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

			//console.log('State change success & state name is : ' + toState.name);
			if (toState.resolve) {
				$ionicLoading.hide();
			}
		});

	})

	.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
		openFB.init({
			appId: 1607966326154856
		});
		$stateProvider
			.state('landing', {
				url: "",
				templateUrl: "templates/landing.html",
				controller: 'landingCtrl',
				resolve: {
					authorize: ['authorization',
            function (authorization) {
							return authorization.authorize();
            }
          ]
				}
			})
			.state('login', {
				url: "/login",
				templateUrl: "templates/login.html",
				controller: 'landingCtrl',
				resolve: {
					authorize: ['authorization',
            function (authorization) {
							return authorization.authorize();
            }
          ]
				}
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
			/*.state('app.allCategories', {
			  url: "/allRecipes/:userId",
			  views: {
			    'menuContent': {
			      templateUrl: "templates/allCategories.html",
			      controller: "allCategoriesCtrl"
			    }
			  }
			})*/
			.state('app.allCategories', {
				url: "/allRecipes/:userId",
				views: {
					'menuContent': {
						templateUrl: "templates/newCats.html",
						controller: "NewCategoriesCtrl"
					}
				}
			})
			.state('app.subCats', {
				url: "/subCats/:catId",
				views: {
					'menuContent': {
						templateUrl: "templates/subcats.html",
						controller: "subCatsCtrl"
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
			.state('app.subCatVideos', {
				url: "/subCatVideos/:subCatId/:subCatName",
				views: {
					'menuContent': {
						templateUrl: "templates/recipesUnderCategory.html",
						controller: "subCatRecipesCtrl"
					}
				}
			})
			.state('app.singleRecipe', {
				url: "/singleRecipe/:recipeId",
				views: {
					'menuContent': {
						templateUrl: "templates/singleRecipe.html",
						controller: "allRecipesCtrl"
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
						controller: "groceryCtrl"
					}
				}
			})
			.state('app.groceryItems', {
				url: "/gItems/:groceryId/:groceryName",
				views: {
					'menuContent': {
						templateUrl: "templates/groceryItems.html",
						controller: "groceryCtrl"
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
			.state('app.aboutApp', {
				url: "/aboutApp",
				views: {
					'menuContent': {
						templateUrl: "templates/about.html",
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
