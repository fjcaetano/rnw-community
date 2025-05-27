"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyArray = void 0;
const is_defined_1 = require("../../generic/is-defined/is-defined");
const isEmptyArray = (array) => (0, is_defined_1.isDefined)(array) && Array.isArray(array) && array.length === 0;
exports.isEmptyArray = isEmptyArray;
//# sourceMappingURL=is-empty-array.js.map