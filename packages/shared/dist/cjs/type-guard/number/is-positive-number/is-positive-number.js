"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPositiveNumber = void 0;
const is_number_1 = require("../is-number/is-number");
const isPositiveNumber = (value) => (0, is_number_1.isNumber)(value) && value > 0;
exports.isPositiveNumber = isPositiveNumber;
//# sourceMappingURL=is-positive-number.js.map