System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var globalScope, IS_DART, _global, Type, Math, Date, _devMode, _modeLocked, StringWrapper, StringJoiner, NumberParseError, NumberWrapper, RegExp, RegExpWrapper, RegExpMatcherWrapper, FunctionWrapper, Json, DateWrapper, _symbolIterator;
    function scheduleMicroTask(fn) {
        Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
    }
    exports_1("scheduleMicroTask", scheduleMicroTask);
    function getTypeNameForDebugging(type) {
        return type['name'];
    }
    exports_1("getTypeNameForDebugging", getTypeNameForDebugging);
    function lockMode() {
        _modeLocked = true;
    }
    exports_1("lockMode", lockMode);
    /**
     * Disable Angular's development mode, which turns off assertions and other
     * checks within the framework.
     *
     * One important assertion this disables verifies that a change detection pass
     * does not result in additional changes to any bindings (also known as
     * unidirectional data flow).
     */
    function enableProdMode() {
        if (_modeLocked) {
            // Cannot use BaseException as that ends up importing from facade/lang.
            throw 'Cannot enable prod mode after platform setup.';
        }
        _devMode = false;
    }
    exports_1("enableProdMode", enableProdMode);
    function assertionsEnabled() {
        return _devMode;
    }
    exports_1("assertionsEnabled", assertionsEnabled);
    // This function is needed only to properly support Dart's const expressions
    // see https://github.com/angular/ts2dart/pull/151 for more info
    function CONST_EXPR(expr) {
        return expr;
    }
    exports_1("CONST_EXPR", CONST_EXPR);
    function CONST() {
        return function (target) { return target; };
    }
    exports_1("CONST", CONST);
    function isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    exports_1("isPresent", isPresent);
    function isBlank(obj) {
        return obj === undefined || obj === null;
    }
    exports_1("isBlank", isBlank);
    function isString(obj) {
        return typeof obj === "string";
    }
    exports_1("isString", isString);
    function isFunction(obj) {
        return typeof obj === "function";
    }
    exports_1("isFunction", isFunction);
    function isType(obj) {
        return isFunction(obj);
    }
    exports_1("isType", isType);
    function isStringMap(obj) {
        return typeof obj === 'object' && obj !== null;
    }
    exports_1("isStringMap", isStringMap);
    function isPromise(obj) {
        return obj instanceof _global.Promise;
    }
    exports_1("isPromise", isPromise);
    function isArray(obj) {
        return Array.isArray(obj);
    }
    exports_1("isArray", isArray);
    function isNumber(obj) {
        return typeof obj === 'number';
    }
    exports_1("isNumber", isNumber);
    function isDate(obj) {
        return obj instanceof Date && !isNaN(obj.valueOf());
    }
    exports_1("isDate", isDate);
    function noop() { }
    exports_1("noop", noop);
    function stringify(token) {
        if (typeof token === 'string') {
            return token;
        }
        if (token === undefined || token === null) {
            return '' + token;
        }
        if (token.name) {
            return token.name;
        }
        if (token.overriddenName) {
            return token.overriddenName;
        }
        var res = token.toString();
        var newLineIndex = res.indexOf("\n");
        return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
    }
    exports_1("stringify", stringify);
    // serialize / deserialize enum exist only for consistency with dart API
    // enums in typescript don't need to be serialized
    function serializeEnum(val) {
        return val;
    }
    exports_1("serializeEnum", serializeEnum);
    function deserializeEnum(val, values) {
        return val;
    }
    exports_1("deserializeEnum", deserializeEnum);
    function resolveEnumToken(enumValue, val) {
        return enumValue[val];
    }
    exports_1("resolveEnumToken", resolveEnumToken);
    // JS has NaN !== NaN
    function looseIdentical(a, b) {
        return a === b || typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
    }
    exports_1("looseIdentical", looseIdentical);
    // JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    function getMapKey(value) {
        return value;
    }
    exports_1("getMapKey", getMapKey);
    function normalizeBlank(obj) {
        return isBlank(obj) ? null : obj;
    }
    exports_1("normalizeBlank", normalizeBlank);
    function normalizeBool(obj) {
        return isBlank(obj) ? false : obj;
    }
    exports_1("normalizeBool", normalizeBool);
    function isJsObject(o) {
        return o !== null && (typeof o === "function" || typeof o === "object");
    }
    exports_1("isJsObject", isJsObject);
    function print(obj) {
        console.log(obj);
    }
    exports_1("print", print);
    function setValueOnPath(global, path, value) {
        var parts = path.split('.');
        var obj = global;
        while (parts.length > 1) {
            var name = parts.shift();
            if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
                obj = obj[name];
            }
            else {
                obj = obj[name] = {};
            }
        }
        if (obj === undefined || obj === null) {
            obj = {};
        }
        obj[parts.shift()] = value;
    }
    exports_1("setValueOnPath", setValueOnPath);
    function getSymbolIterator() {
        if (isBlank(_symbolIterator)) {
            if (isPresent(Symbol) && isPresent(Symbol.iterator)) {
                _symbolIterator = Symbol.iterator;
            }
            else {
                // es6-shim specific logic
                var keys = Object.getOwnPropertyNames(Map.prototype);
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (key !== 'entries' && key !== 'size' &&
                        Map.prototype[key] === Map.prototype['entries']) {
                        _symbolIterator = key;
                    }
                }
            }
        }
        return _symbolIterator;
    }
    exports_1("getSymbolIterator", getSymbolIterator);
    function evalExpression(sourceUrl, expr, declarations, vars) {
        var fnBody = declarations + "\nreturn " + expr + "\n//# sourceURL=" + sourceUrl;
        var fnArgNames = [];
        var fnArgValues = [];
        for (var argName in vars) {
            fnArgNames.push(argName);
            fnArgValues.push(vars[argName]);
        }
        return new (Function.bind.apply(Function, [void 0].concat(fnArgNames.concat(fnBody))))().apply(void 0, fnArgValues);
    }
    exports_1("evalExpression", evalExpression);
    function isPrimitive(obj) {
        return !isJsObject(obj);
    }
    exports_1("isPrimitive", isPrimitive);
    function hasConstructor(value, type) {
        return value.constructor === type;
    }
    exports_1("hasConstructor", hasConstructor);
    function bitWiseOr(values) {
        return values.reduce(function (a, b) { return a | b; });
    }
    exports_1("bitWiseOr", bitWiseOr);
    function bitWiseAnd(values) {
        return values.reduce(function (a, b) { return a & b; });
    }
    exports_1("bitWiseAnd", bitWiseAnd);
    function escape(s) {
        return _global.encodeURI(s);
    }
    exports_1("escape", escape);
    return {
        setters:[],
        execute: function() {
            if (typeof window === 'undefined') {
                if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
                    // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
                    globalScope = self;
                }
                else {
                    globalScope = global;
                }
            }
            else {
                globalScope = window;
            }
            exports_1("IS_DART", IS_DART = false);
            // Need to declare a new variable for global here since TypeScript
            // exports the original value of the symbol.
            _global = globalScope;
            exports_1("global", _global);
            exports_1("Type", Type = Function);
            exports_1("Math", Math = _global.Math);
            exports_1("Date", Date = _global.Date);
            _devMode = true;
            _modeLocked = false;
            // TODO: remove calls to assert in production environment
            // Note: Can't just export this and import in in other files
            // as `assert` is a reserved keyword in Dart
            _global.assert = function assert(condition) {
                // TODO: to be fixed properly via #2830, noop for now
            };
            StringWrapper = (function () {
                function StringWrapper() {
                }
                StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
                StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
                StringWrapper.split = function (s, regExp) { return s.split(regExp); };
                StringWrapper.equals = function (s, s2) { return s === s2; };
                StringWrapper.stripLeft = function (s, charVal) {
                    if (s && s.length) {
                        var pos = 0;
                        for (var i = 0; i < s.length; i++) {
                            if (s[i] != charVal)
                                break;
                            pos++;
                        }
                        s = s.substring(pos);
                    }
                    return s;
                };
                StringWrapper.stripRight = function (s, charVal) {
                    if (s && s.length) {
                        var pos = s.length;
                        for (var i = s.length - 1; i >= 0; i--) {
                            if (s[i] != charVal)
                                break;
                            pos--;
                        }
                        s = s.substring(0, pos);
                    }
                    return s;
                };
                StringWrapper.replace = function (s, from, replace) {
                    return s.replace(from, replace);
                };
                StringWrapper.replaceAll = function (s, from, replace) {
                    return s.replace(from, replace);
                };
                StringWrapper.slice = function (s, from, to) {
                    if (from === void 0) { from = 0; }
                    if (to === void 0) { to = null; }
                    return s.slice(from, to === null ? undefined : to);
                };
                StringWrapper.replaceAllMapped = function (s, from, cb) {
                    return s.replace(from, function () {
                        var matches = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            matches[_i - 0] = arguments[_i];
                        }
                        // Remove offset & string from the result array
                        matches.splice(-2, 2);
                        // The callback receives match, p1, ..., pn
                        return cb(matches);
                    });
                };
                StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
                StringWrapper.compare = function (a, b) {
                    if (a < b) {
                        return -1;
                    }
                    else if (a > b) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                };
                return StringWrapper;
            }());
            exports_1("StringWrapper", StringWrapper);
            StringJoiner = (function () {
                function StringJoiner(parts) {
                    if (parts === void 0) { parts = []; }
                    this.parts = parts;
                }
                StringJoiner.prototype.add = function (part) { this.parts.push(part); };
                StringJoiner.prototype.toString = function () { return this.parts.join(""); };
                return StringJoiner;
            }());
            exports_1("StringJoiner", StringJoiner);
            NumberParseError = (function (_super) {
                __extends(NumberParseError, _super);
                function NumberParseError(message) {
                    _super.call(this);
                    this.message = message;
                }
                NumberParseError.prototype.toString = function () { return this.message; };
                return NumberParseError;
            }(Error));
            exports_1("NumberParseError", NumberParseError);
            NumberWrapper = (function () {
                function NumberWrapper() {
                }
                NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
                NumberWrapper.equal = function (a, b) { return a === b; };
                NumberWrapper.parseIntAutoRadix = function (text) {
                    var result = parseInt(text);
                    if (isNaN(result)) {
                        throw new NumberParseError("Invalid integer literal when parsing " + text);
                    }
                    return result;
                };
                NumberWrapper.parseInt = function (text, radix) {
                    if (radix == 10) {
                        if (/^(\-|\+)?[0-9]+$/.test(text)) {
                            return parseInt(text, radix);
                        }
                    }
                    else if (radix == 16) {
                        if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                            return parseInt(text, radix);
                        }
                    }
                    else {
                        var result = parseInt(text, radix);
                        if (!isNaN(result)) {
                            return result;
                        }
                    }
                    throw new NumberParseError("Invalid integer literal when parsing " + text + " in base " +
                        radix);
                };
                // TODO: NaN is a valid literal but is returned by parseFloat to indicate an error.
                NumberWrapper.parseFloat = function (text) { return parseFloat(text); };
                Object.defineProperty(NumberWrapper, "NaN", {
                    get: function () { return NaN; },
                    enumerable: true,
                    configurable: true
                });
                NumberWrapper.isNaN = function (value) { return isNaN(value); };
                NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
                return NumberWrapper;
            }());
            exports_1("NumberWrapper", NumberWrapper);
            exports_1("RegExp", RegExp = _global.RegExp);
            RegExpWrapper = (function () {
                function RegExpWrapper() {
                }
                RegExpWrapper.create = function (regExpStr, flags) {
                    if (flags === void 0) { flags = ''; }
                    flags = flags.replace(/g/g, '');
                    return new _global.RegExp(regExpStr, flags + 'g');
                };
                RegExpWrapper.firstMatch = function (regExp, input) {
                    // Reset multimatch regex state
                    regExp.lastIndex = 0;
                    return regExp.exec(input);
                };
                RegExpWrapper.test = function (regExp, input) {
                    regExp.lastIndex = 0;
                    return regExp.test(input);
                };
                RegExpWrapper.matcher = function (regExp, input) {
                    // Reset regex state for the case
                    // someone did not loop over all matches
                    // last time.
                    regExp.lastIndex = 0;
                    return { re: regExp, input: input };
                };
                return RegExpWrapper;
            }());
            exports_1("RegExpWrapper", RegExpWrapper);
            RegExpMatcherWrapper = (function () {
                function RegExpMatcherWrapper() {
                }
                RegExpMatcherWrapper.next = function (matcher) {
                    return matcher.re.exec(matcher.input);
                };
                return RegExpMatcherWrapper;
            }());
            exports_1("RegExpMatcherWrapper", RegExpMatcherWrapper);
            FunctionWrapper = (function () {
                function FunctionWrapper() {
                }
                FunctionWrapper.apply = function (fn, posArgs) { return fn.apply(null, posArgs); };
                return FunctionWrapper;
            }());
            exports_1("FunctionWrapper", FunctionWrapper);
            // Can't be all uppercase as our transpiler would think it is a special directive...
            Json = (function () {
                function Json() {
                }
                Json.parse = function (s) { return _global.JSON.parse(s); };
                Json.stringify = function (data) {
                    // Dart doesn't take 3 arguments
                    return _global.JSON.stringify(data, null, 2);
                };
                return Json;
            }());
            exports_1("Json", Json);
            DateWrapper = (function () {
                function DateWrapper() {
                }
                DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
                    if (month === void 0) { month = 1; }
                    if (day === void 0) { day = 1; }
                    if (hour === void 0) { hour = 0; }
                    if (minutes === void 0) { minutes = 0; }
                    if (seconds === void 0) { seconds = 0; }
                    if (milliseconds === void 0) { milliseconds = 0; }
                    return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
                };
                DateWrapper.fromISOString = function (str) { return new Date(str); };
                DateWrapper.fromMillis = function (ms) { return new Date(ms); };
                DateWrapper.toMillis = function (date) { return date.getTime(); };
                DateWrapper.now = function () { return new Date(); };
                DateWrapper.toJson = function (date) { return date.toJSON(); };
                return DateWrapper;
            }());
            exports_1("DateWrapper", DateWrapper);
            _symbolIterator = null;
        }
    }
});
//# sourceMappingURL=lang.js.map