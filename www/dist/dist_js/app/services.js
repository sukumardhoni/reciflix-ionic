angular.module('recipesApp')
	.factory('Recipes', ['$resource', function ($resource) {
		return $resource('http://reciflix-rest.herokuapp.com/api/v1/recipes/:catgyName/:recipeId', {
			recipeId: '@_id',
			catgyName: '@catgyName'
		}, {
			'update': {
				method: 'PUT'
			},
			'query': {
				method: 'GET',
				isArray: true
			},
			'remove': {
				method: 'DELETE'
			}
		});
	}])

.factory('Categories', ['$resource', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/vRecipesAllCategories/:pageId', {
		//return $resource('http://localhost:7000/api/v1/vRecipesAllCategories/:pageId', {
		pageId: '@pageId'
	}, {
		'query': {
			method: 'GET',
			isArray: true
		}
	});
}])

.factory('RecipesByCategory', ['$resource', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/VRecipesByCategories/:CategoryName/:pageId', {
		//return $resource('http://localhost:7000/api/v1/VRecipesByCategories/:CategoryName/:pageId', {
		CategoryName: '@CategoryName',
		pageId: '@pageId'
	}, {
		'query': {
			method: 'GET',
			isArray: true
		}
	});
}])


.factory('SingleRecipe', ['$resource', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/vRecipes/:recipeId', {
		//return $resource('http://localhost:7000/api/v1/vRecipes/:recipeId', {
		recipeId: '@_id',
	}, {
		'update': {
			method: 'PUT'
		},
		'remove': {
			method: 'DELETE'
		}
	});
}])

.factory('RecipesOnScroll', ['$resource', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/recipesOnScroll/page/:pageId/:catgyName', {
		pageId: '@pageId'
	}, {
		'query': {
			method: 'GET',
			isArray: true
		}
	});
}])

.factory('User', ['$resource', function ($resource) {
	return {
		Signup: $resource('http://reciflix-rest.herokuapp.com/api/v1/users/signup', {}, {
			create: {
				method: 'POST'
			}
		}),
		Signin: $resource('http://reciflix-rest.herokuapp.com/api/v1/users/signin', {}, {
			create: {
				method: 'POST'
			}
		})
	}
}])

.factory('UserFavorites', ['$resource', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/userFavorites/:userId', {
		//return $resource('http://localhost:7000/api/v1/userFavorites/:userId', {
		userId: '@_id'
	}, {
		'update': {
			method: 'PUT'
		}
	});
}])

.factory('MyFavRecipes', ['$resource', function ($resource) {
	//return $resource('http://reciflix-rest.herokuapp.com/api/v1/myFavoritesVRecipes/:videoIds/:pageId', {
	return $resource('http://localhost:7000/api/v1/myFavoritesVRecipes/:videoIds/:pageId', {
		videoIds: '@videoIds',
		pageId: '@pageId'
	}, {
		'query': {
			method: 'GET',
			isArray: true
		}
	});
}])

.factory('SearchedRecipes', ['$resource', function ($resource) {
	return $resource('http://localhost:7000/api/v1/searchedVRecipes/:searchQuery/:pageId', {
		searchQuery: '@searchQuery',
		pageId: '@pageId'
	}, {
		'query': {
			method: 'GET',
			isArray: true
		}
	});
}])


.factory('Authentication', [

 function () {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
 }
])
