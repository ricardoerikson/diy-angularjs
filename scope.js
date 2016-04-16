var _ = require('lodash');

var Scope = function() {
    this.$$watchers = [];
}

Scope.prototype.$watch = function (watchFn, listenerFn) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || function() {}
    };
    this.$$watchers.push(watcher);
};

Scope.prototype.$$digestOnce = function () {
    var self = this;
    _.forEach(this.$$watchers, function(watch) {
        var newValue = watch.watchFn(self);
        var oldValue = watch.last;
        if (newValue !== oldValue) {
            watch.listenerFn(newValue, oldValue, self);
            watch.last = newValue;
        }
    });
};

module.exports = Scope;
