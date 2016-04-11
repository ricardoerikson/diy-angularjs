var Scope = require('./scope');

var scope = new Scope();
scope.firstName = 'Joe';
scope.counter = 0;

scope.$watch(
    function(scope){
        return scope.firstName;
    },
    function(newValue, oldValue, scope){
        scope.counter++;
    }
);

console.log(scope.counter === 0);

scope.$digest();
console.log(scope.counter === 1);

scope.$digest();
scope.$digest();
console.log(scope.counter === 1);
scope.$digest();

scope.firstName = 'Jane';
scope.$digest();
console.log(scope.counter === 2);
