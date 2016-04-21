var Scope = require('./scope');

var scope = new Scope();
scope.counter = 0;

scope.$watch(
    function(scope) {
        return scope.aValue;
    },
    function(newValue, oldValue, scope) {
        scope.counter++;
    }
);

scope.$apply(function(scope) {
    scope.aValue = 'Hello from "outside"';
});

console.log(scope.counter === 1); // true
console.log(scope.aValue); // Hello from "outside"
