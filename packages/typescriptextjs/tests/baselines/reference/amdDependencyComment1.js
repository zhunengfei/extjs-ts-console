//// [amdDependencyComment1.ts]
///<amd-dependency path='bar'/>

import m1 = require("m2")
m1.f();

//// [amdDependencyComment1.js]
///<amd-dependency path='bar'/>
var m1 = require("m2");
m1.f();
