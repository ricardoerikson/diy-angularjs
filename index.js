var Scope = require('./scope');

var scope = new Scope();
scope.firstName = 'Joe';
scope.counter = 0;

scope.$watch(
    function(scope){
        return scope.counter;
    },
    function(newValue, oldValue, scope){
        scope.counterIsTwo = (newValue == 2);
    }
);

scope.$watch(
    function(scope){
        return scope.firstName;
    },
    function(newValue, oldValue, scope) {
        scope.counter++;
    }
);

// After this digest the counter will be 1
scope.$digest();
console.log(scope.counter === 1); // true

scope.firstName = 'Jane';
// Now, in this new $digest implementation, the scope.counterIsTwo
// will be updated since the $digest method will keep digesting
// while dirty.
scope.$digest();
console.log(scope.counter === 2); // true
console.log(scope.counterIsTwo); // true

scope.$digest();
console.log(scope.counterIsTwo); // true