/// <reference path='fourslash.ts' />

////interface A<T> { }
////
////function ma/*makeA*/keA<T>(t: T): A<T> { return null; }
////
////function /*f*/f<T>(t: T) {
////    return makeA(t);
////}
////
////var x = f(0);
////var y = makeA(0);

goTo.marker("makeA");
verify.quickInfoIs("(function) makeA<T>(t: T): A<T>", undefined);

goTo.marker("f");
verify.quickInfoIs("(function) f<T>(t: T): A<T>", undefined);