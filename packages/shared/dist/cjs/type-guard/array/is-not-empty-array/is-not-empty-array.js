"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotEmptyArray = void 0;
const is_defined_1 = require("../../generic/is-defined/is-defined");
const isNotEmptyArray = (array) => (0, is_defined_1.isDefined)(array) && Array.isArray(array) && array.length > 0;
exports.isNotEmptyArray = isNotEmptyArray;
//# sourceMappingURL=is-not-empty-array.js.map