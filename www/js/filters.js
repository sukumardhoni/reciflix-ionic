'use strict';
angular.module('recipesApp')

.filter('numeral', function () {
  return function (count) {
    var numericalFormat = numeral(count).format('0.0a');
    return numericalFormat;
  };
})

.filter('durationFltr', function () {
  return function (millis) {
    var durationTxt = '1h:30m:20s';
    var secNum = Math.floor(millis / 60);
    var secTxt = millis % 60;
    var minNum = Math.floor(secNum / 60);
    var minTxt = secNum % 60;
    var hourNum = Math.floor(minNum / 60);
    var hourTxt = minNum;
    if (hourTxt == 0) {
      durationTxt = minTxt + 'm:' + secTxt + 's';
    } else
      durationTxt = hourTxt + 'h:' + minTxt + 'm:' + secTxt + 's';
    return durationTxt;
  };
})


.filter('cut', function () {
  return function (value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;

    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace != -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || ' …');
  };
});
