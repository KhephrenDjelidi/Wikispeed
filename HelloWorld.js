var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HelloWorld = /** @class */ (function () {
    function HelloWorld(greetingMessage) {
        this.greetingMessage = greetingMessage;
    }
    HelloWorld.prototype.greet = function () {
        console.log("Here is a greeting message: ".concat(this.greetingMessage));
    };
    return HelloWorld;
}());
var HelloWorldGreeter = /** @class */ (function (_super) {
    __extends(HelloWorldGreeter, _super);
    function HelloWorldGreeter() {
        return _super.call(this, "Hello World") || this;
    }
    return HelloWorldGreeter;
}(HelloWorld));
var greeter = new HelloWorldGreeter();
greeter.greet();
