angular.module('recipesApp')

	.factory('authorization', ['$rootScope', '$state', '$localStorage', 'User', 'Authentication', function ($rootScope, $state, $localStorage, User, Authentication) {
			return {
				authorize: function () {
					return User.Checking.fetch().$promise.then(function (res) {
						if (res.type === false) {
							console.log('Error happened: ' + JSON.stringify(res.data));
						} else {
							$localStorage.user = res;
							$localStorage.token = res.token;
							Authentication.user = res;

							$state.go('app.allCategories', {
								userId: res._id
							});
						}
					}).catch(function (err) {
						console.log('Error happened: ' + JSON.stringify(err));
					})
				}
			};
  }
])

	//.constant('API_HOST', 'http://192.168.0.107:3000')
	.constant('API_HOST', 'http://www.reciflix.com')

	.factory('Categories', function ($resource, API_HOST) {
		return $resource(API_HOST + '/categories/page/:pageId', {
			pageId: '@pageId'
		}, {
			'query': {
				method: 'GET',
				isArray: true,
				timeout: 20000
			}
		});
	})

	.factory('NewCategories', function ($resource, API_HOST) {
		return $resource(API_HOST + '/newcats/page/:pageId/:activeFilter', {
			pageId: '@pageId',
			activeFilter: '@activeFilter'
		}, {
			'query': {
				method: 'GET',
				isArray: true,
				timeout: 20000
			}
		});
	})

	.factory('SubCats', function ($resource, API_HOST) {
		return $resource(API_HOST + '/subCats/:catId/:pageId/:activeFilter', {
			catId: '@catId',
			pageId: '@pageId',
			activeFilter: '@activeFilter'
		}, {
			'query': {
				method: 'GET',
				timeout: 20000
			}
		});
	})

	.factory('CatByRank', function ($resource, API_HOST) {
		return $resource(API_HOST + '/newCatAndSubCats/:rank', {
			rank: '@rank'
		}, {
			'query': {
				method: 'GET',
				timeout: 20000
			}
		});
	})


	.factory('RecipesBySubCat', function ($resource, API_HOST) {
		return $resource(API_HOST + '/newRecipesForSubCatId/:subCatId/:pageId', {
			subCatId: '@subCatId',
			pageId: '@pageId'
		}, {
			'query': {
				method: 'GET',
				timeout: 20000
			}
		});
	})

	.factory('RecipesByCategory', function ($resource, API_HOST) {
		return $resource(API_HOST + '/VRecipesByCategories/:CategoryName/:pageId', {
			CategoryName: '@CategoryName',
			pageId: '@pageId'
		}, {
			'query': {
				method: 'GET',
				isArray: true,
				timeout: 20000
			}
		});
	})

	.factory('SingleRecipe', function ($resource, API_HOST) {
		return $resource(API_HOST + '/nVRecipes/:recipeId', {
			recipeId: '@_id',
		}, {
			'update': {
				method: 'PUT'
			},
			'remove': {
				method: 'DELETE'
			}
		});
	})

	.factory('User', function ($resource, API_HOST, $localStorage) {
		return {
			Signup: $resource(API_HOST + '/users/signup', {}, {
				create: {
					method: 'POST',
					timeout: 30000
				}
			}),
			Signin: $resource(API_HOST + '/users/signin', {}, {
				create: {
					method: 'POST',
					timeout: 20000
				}
			}),
			Signout: $resource(API_HOST + '/users/signout', {}, {
				clear: {
					method: 'POST',
					timeout: 30000
				}
			}),
			ForgotPassword: $resource(API_HOST + '/users/forgotPassword', {}, {
				fetch: {
					method: 'POST',
					timeout: 30000
				}
			}),
			ResetPassword: $resource(API_HOST + '/users/reset/:token', {
				token: '@token'
			}, {
				set: {
					method: 'POST'
				}
			}),
			UpdatedProfile: $resource(API_HOST + '/users/updateProfile', {}, {
				update: {
					method: 'PUT',
					timeout: 30000
				}
			}),
			ChangePassword: $resource(API_HOST + '/users/changePassword', {}, {
				update: {
					method: 'POST',
					timeout: 30000
				}
			}),
			Checking: $resource(API_HOST + '/users/checking', {}, {
				fetch: {
					method: 'GET',
					headers: {
						'Authorization': 'Basic ' + $localStorage.token
					},
					timeout: 20000
				}
			})
		}
	})

	.factory('UserFavorites', function ($resource, API_HOST) {
		return $resource(API_HOST + '/userFavorites/:userId', {
			userId: '@_id'
		}, {
			'update': {
				method: 'PUT',
				timeout: 20000
			}
		});
	})

	.factory('MyFavRecipes', function ($resource, API_HOST) {
		return $resource(API_HOST + '/myFavorites/:uId/:pageId', {
			uId: '@uId',
			pageId: '@pageId'
		}, {
			'query': {
				method: 'GET',
				isArray: true
			}
		});
	})

	.factory('Grocery', function ($resource, API_HOST) {
		return $resource(API_HOST + '/gList/:gListId/:userConfirm', {
			gListId: '@gListId',
			userConfirm: '@userConfirm'
		}, {
			'save': {
				method: 'POST'
			},
			'query': {
				method: 'GET',
				isArray: true,
				timeout: 20000
			},
			'delete': {
				method: 'DELETE'
			},
			'update': {
				method: 'PUT'
			}
		});
	})


	.factory('GroceryItem', function ($resource, API_HOST) {
		return $resource(API_HOST + '/gListItems/:gListId/item', {
			gListId: '@gListId'
		}, {
			'query': {
				method: 'GET',
				isArray: true,
				timeout: 20000
			},
			'save': {
				method: 'POST'
			}
		});
	})

	.factory('GroceryItemSingle', function ($resource, API_HOST) {
		return $resource(API_HOST + '/singleGListItem/:gListId/item/:itemId', {
			gListId: '@gListId',
			itemId: '@itemId'
		}, {
			'query': {
				method: 'GET',
				timeout: 20000
			},
			'update': {
				method: 'PUT'
			},
			'delete': {
				method: 'DELETE'
			}
		});
	})

	.factory('SearchedRecipes', function ($resource, API_HOST) {
		return $resource(API_HOST + '/searchedVRecipesByIndex/:searchQuery/:pageId', {
			searchQuery: '@searchQuery',
			pageId: '@pageId'
		}, {
			'query': {
				method: 'GET',
				isArray: true,
				timeout: 30000
			}
		});
	})

	.factory('RecipesFavCount', function ($resource, API_HOST) {
		return $resource(API_HOST + '/recipesFavCount/:recipeId', {
			recipeId: '@_id'
		}, {
			'update': {
				method: 'PUT',
				timeout: 30000
			}
		});
	})

	.factory('Authentication', [
 function () {
			var _this = this;
			_this._data = {
				user: window.user
			};
			return _this._data;
 }
])


	.factory('CatMap', function ($http, $q) {
		var cats = {};
		var catsArray = [];
		return {
			refreshCats: function (catsArr) {
				catsArray = [];
				cats = {};
				for (var i = 0; i < catsArr.length; i++) {
					catsArray.push(catsArr[i].catId);
					cats[catsArr[i].catId] = i;
				}
			},
			getCatId: function (direction, catId) {
				var indexOfCat = cats[catId] + direction;
				if (indexOfCat >= catsArray.length) {
					indexOfCat = 0;
				} else if (indexOfCat < 0) {
					indexOfCat = catsArray.length + indexOfCat;
				}
				return catsArray[indexOfCat];
			}
		}
	})
