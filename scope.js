var _ = require('lodash');

var Scope = function() {
	this.$$watchers = [];
}

Scope.prototype.$watch = function (watchFn, listenerFn, valueEq) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || function() {},
        valueEq: !!valueEq
    };
    this.$$watchers.push(watcher);
};

Scope.prototype.$$digestOnce = function () {
    var self = this;
    var dirty;
    _.forEach(this.$$watchers, function(watch) {
        var newValue = watch.watchFn(self);
        var oldValue = watch.last;
        if (!self.$$areEquals(newValue, oldValue, watch.valueEq)) {
            watch.listenerFn(newValue, oldValue, self);
            dirty = true;
            watch.last = (watch.valueEq ? _.cloneDeep(newValue) : newValue);
        }
    });
    return dirty;
};

Scope.prototype.$digest = function() {
    var ttl = 10;
    var dirty;
    do {
        dirty = this.$$digestOnce();
        if (dirty && !(ttl--)) {
            throw "10 digest iterations reached";
        }
    } while (dirty);
};

Scope.prototype.$$areEquals = function (newValue, oldValue, valueEq) {
    if (valueEq) {
        return _.isEqual(newValue, oldValue);
    } else {
        return newValue === oldValue || (typeof newValue == 'number' && typeof oldValue == 'number' && isNaN(newValue) && isNaN(oldValue));
    }
};

Scope.prototype.$eval = function(expr, locals) {
	return expr(this, locals);
};

module.exports = Scope;
