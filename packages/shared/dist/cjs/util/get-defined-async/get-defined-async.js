"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefinedAsync = void 0;
const is_defined_1 = require("../../type-guard/generic/is-defined/is-defined");
const getDefinedAsync = (value, defaultFn) => (0, is_defined_1.isDefined)(value) ? Promise.resolve(value) : defaultFn();
exports.getDefinedAsync = getDefinedAsync;
//# sourceMappingURL=get-defined-async.js.map