"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = void 0;
const is_defined_1 = require("../../generic/is-defined/is-defined");
const isString = (value) => (0, is_defined_1.isDefined)(value) && typeof value === 'string';
exports.isString = isString;
//# sourceMappingURL=is-string.js.map