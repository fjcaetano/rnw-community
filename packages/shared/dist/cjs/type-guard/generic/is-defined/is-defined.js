"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefined = void 0;
/**
 * Typeguard defining is passed variable is not undefined and is not null
 *
 * @param value Value for typechecking
 * @returns _True_ if value is not undefined and is not null otherwise _false_
 */
const isDefined = (value) => value !== undefined && value !== null;
exports.isDefined = isDefined;
//# sourceMappingURL=is-defined.js.map