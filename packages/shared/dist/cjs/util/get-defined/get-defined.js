"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefined = void 0;
const is_defined_1 = require("../../type-guard/generic/is-defined/is-defined");
/**
 * Returns value if defined otherwise returns default value
 *
 * @param value Value to check
 * @param defaultFn Function returning default value
 * @returns Value if defined otherwise default value
 */
const getDefined = (value, defaultFn) => (0, is_defined_1.isDefined)(value) ? value : defaultFn();
exports.getDefined = getDefined;
//# sourceMappingURL=get-defined.js.map