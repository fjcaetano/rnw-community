"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotEmptyString = void 0;
const is_string_1 = require("../is-string/is-string");
const isNotEmptyString = (value) => (0, is_string_1.isString)(value) && value.length > 0;
exports.isNotEmptyString = isNotEmptyString;
//# sourceMappingURL=is-not-empty-string.js.map