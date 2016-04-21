var Scope = require('./scope');

var scope = new Scope();
scope.number = 1;

scope.$eval(function(scope) {
    console.log('Number during $eval: ', scope.number);
});
