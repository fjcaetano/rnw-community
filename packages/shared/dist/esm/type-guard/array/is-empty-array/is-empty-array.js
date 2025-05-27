import { isDefined } from '../../generic/is-defined/is-defined';
export const isEmptyArray = (array) => isDefined(array) && Array.isArray(array) && array.length === 0;
//# sourceMappingURL=is-empty-array.js.map