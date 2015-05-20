angular.module('recipesApp')
	.factory('Recipes', function ($resource) {
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
	})

.factory('Categories', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/category/:pageId', {
		pageId: '@pageId'
	}, {
		'query': {
			method: 'GET',
			isArray: true
		}
	});
})



.factory('RecipesByCategory', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/VRecipesByCategories/:CategoryName/:pageId', {
		CategoryName: '@CategoryName',
		pageId: '@pageId'
	}, {
		'query': {
			method: 'GET',
			isArray: true
		}
	});
})


.factory('SingleRecipe', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/vRecipes/:recipeId', {
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

.factory('RecipesOnScroll', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/recipesOnScroll/page/:pageId/:catgyName', {
		pageId: '@pageId'
	}, {
		'query': {
			method: 'GET',
			isArray: true
		}
	});
})

.factory('User', function ($resource) {
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
})

.factory('UserFavorites', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/userFavorites/:userId', {
		userId: '@_id'
	}, {
		'update': {
			method: 'PUT'
		}
	});
})

.factory('MyFavRecipes', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/myFavorites/:userId/:pageId', {
		userId: '@userId',
		pageId: '@pageId'
	}, {
		'query': {
			method: 'GET',
			isArray: true
		}
	});
})

.factory('SearchedRecipes', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/searchedVRecipes/:searchQuery/:pageId', {
		searchQuery: '@searchQuery',
		pageId: '@pageId'
	}, {
		'query': {
			method: 'GET',
			isArray: true
		}
	});
})

.factory('RecipesFavCount', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/recipesFavCount/:recipeId', {
		recipeId: '@_id'
	}, {
		'update': {
			method: 'PUT'
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
