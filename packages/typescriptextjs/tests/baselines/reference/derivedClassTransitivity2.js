//// [derivedClassTransitivity2.ts]
// subclassing is not transitive when you can remove required parameters and add optional parameters

class C {
    foo(x: number, y: number) { }
}

class D extends C {
    foo(x: number) { } // ok to drop parameters
}

class E extends D {
    foo(x: number, y?: string) { } // ok to add optional parameters
}

var c: C;
var d: D;
var e: E;
c = e;
var r = c.foo(1, 1);
var r2 = e.foo(1, '');

//// [derivedClassTransitivity2.js]
// subclassing is not transitive when you can remove required parameters and add optional parameters
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x, y) {
    };
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    D.prototype.foo = function (x) {
    }; // ok to drop parameters
    return D;
})(C);
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        _super.apply(this, arguments);
    }
    E.prototype.foo = function (x, y) {
    }; // ok to add optional parameters
    return E;
})(D);
var c;
var d;
var e;
c = e;
var r = c.foo(1, 1);
var r2 = e.foo(1, '');
