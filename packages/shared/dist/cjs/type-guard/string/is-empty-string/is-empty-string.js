"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyString = void 0;
const is_string_1 = require("../is-string/is-string");
const isEmptyString = (value) => (0, is_string_1.isString)(value) && value.length === 0;
exports.isEmptyString = isEmptyString;
//# sourceMappingURL=is-empty-string.js.map