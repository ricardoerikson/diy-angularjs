var Scope = require('./scope');

var scope = new Scope();
scope.counterByRef = 0;
scope.counterByValue = 0;
scope.value = [1, 2, {three: [4, 5]}];

scope.$watch(
    function(scope){
        return scope.value;
    },
    function(newValue, oldValue, scope){
        scope.counterByRef++;
    }
);

scope.$watch(
    function(scope){
        return scope.value;
    },
    function(newValue, oldValue, scope) {
        scope.counterByValue++;
    },
    true
);

scope.$digest();
console.log(scope.counterByRef === 1); // true
console.log(scope.counterByValue === 1); // true

// When changes are made within the value, the
// by-reference watcher does not notice, but the
// by-value watcher does.
scope.value[2].three.push(6); // change within the value
scope.$digest();
console.log(scope.counterByRef === 1); // true
console.log(scope.counterByValue === 2); // true

scope.value = {aNew: 'value'};
scope.$digest();
console.log(scope.counterByRef === 2); // true
console.log(scope.counterByValue === 3); // true

delete scope.value;
scope.$digest();
console.log(scope.counterByRef === 3); // true
console.log(scope.counterByValue === 4); // true