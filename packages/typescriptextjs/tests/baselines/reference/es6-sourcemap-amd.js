//// [es6-sourcemap-amd.ts]

class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}

//// [es6-sourcemap-amd.js]
var A = (function () {
    function A() {
    }
    A.prototype.B = function () {
        return 42;
    };
    return A;
})();
//# sourceMappingURL=es6-sourcemap-amd.js.map