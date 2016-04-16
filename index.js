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
// On this digest the counter becomes two, but the first
// watcher will not notice it yet. As a result, scope.counterIsTwo
// will be false. The counter is only incremented in the second
// watcher. Only at some point in the future when a new digest happen,
// the first watcher will run and set scope.counterIsTwo to true
scope.$digest();
console.log(scope.counter === 2); // true
console.log(scope.counterIsTwo); // false

// On this digest all watchers will be executed again and the value
// of scope.counterIsTwo will be set to true.
scope.$digest();
console.log(scope.counterIsTwo); // true