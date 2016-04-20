var Scope = require('./scope');

var scope = new Scope();
scope.number = 0;
scope.counter = 0;

scope.$watch(
    function(scope){
        return scope.number;
    },
    function(newValue, oldValue, scope){
        scope.counter++;
    }
);

scope.$digest();
console.log(scope.counter === 1); // true

scope.number = parseInt('wat', 10); // Becomes NaN
scope.$digest();
console.log(scope.counter === 2); // true