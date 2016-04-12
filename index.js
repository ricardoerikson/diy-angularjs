var Scope = require('./scope');

var scope = new Scope();
scope.firstName = 'Joe';
scope.counter = 0;

scope.$watch(function(){
    console.log('digest listener fired');
});

scope.$digest();
scope.$digest();
scope.$digest();