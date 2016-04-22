var Scope = require('./scope');

var scope = new Scope();
scope.counter = 0;
scope.asyncEvaled = false;

scope.$watch(
    function(scope) {
        return scope.aValue;
    },
    function(newValue, oldValue, scope) {
        scope.counter++;
        scope.$evalAsync(function(scope) {
            scope.asyncEvaled = true;
        });
        console.log('Evaled inside listener: ', scope.asyncEvaled);
    }
);

scope.aValue = 'test';
scope.$digest();
console.log('Evaled after digest: ', scope.asyncEvaled);
