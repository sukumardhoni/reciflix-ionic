angular.module('recipesApp')
	.factory('Recipes', function ($resource) {
		return $resource('http://localhost:7000/api/v1/recipes/:recipeId', {
			recipeId: '@_id'
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



.factory('User', function ($resource) {
	return {
		Signup: $resource('http://localhost:7000/api/v1/users/signup', {}, {
			create: {
				method: 'POST'
			}
		}),
		Signin: $resource('http://localhost:7000/api/v1/users/signin', {}, {
			create: {
				method: 'POST'
			}
		})
	}
})