import { isDefined } from '../../generic/is-defined/is-defined';
export const isNotEmptyArray = (array) => isDefined(array) && Array.isArray(array) && array.length > 0;
//# sourceMappingURL=is-not-empty-array.js.map