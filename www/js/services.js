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
	/*.factory('User', function ($resource) {
		return $resource('http://192.168.0.100:7000/api/v1/users/:userId', {
			userId: '@_id'
		}, {
			create: {
				method: 'POST'
			},
			'update': {
				method: 'PUT'
			}
		});
	});*/

.factory('Categories', function ($resource) {
	return $resource('http://reciflix-rest.herokuapp.com/api/v1/recipes/Categories/page/:pageId', {
		pageId: '@pageId'
	}, {
		'query': {
			method: 'GET',
			isArray: true
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
