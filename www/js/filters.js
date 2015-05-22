'use strict';

angular.module('recipesApp').filter('numeral', function () {
	return function (count) {
		var numericalFormat = numeral(count).format('0.0a');
		return numericalFormat;
	};
});
