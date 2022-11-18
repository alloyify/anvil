export const isUndefined = (val: unknown): boolean => typeof val === 'undefined';
export const isNull = (val: unknown): boolean => val === null;
export const isNil = (val: unknown): boolean => isUndefined(val) || isNull(val);
export const isString = (val: unknown): boolean => typeof val === 'string';
export const hasLength = (val: unknown): boolean => (val as any)?.length > 0;
export const isStringFull = (val: unknown): boolean => isString(val) && hasLength(val);
export const isArrayFull = (val: unknown): boolean => Array.isArray(val) && hasLength(val);
export const isArrayStrings = (val: unknown): boolean =>
  isArrayFull(val) && (val as string[]).every((v) => isStringFull(v));
export const isObject = (val: unknown): boolean => typeof val === 'object' && !isNull(val) && !Array.isArray(val);
export const isObjectFull = (val: unknown): boolean => isObject(val) && hasLength(Object.keys(val));
export const isNumber = (val: unknown): boolean =>
  typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
export const isEqual = (val: unknown, eq: unknown): boolean => val === eq;
export const isFalse = (val: unknown): boolean => val === false;
export const isTrue = (val: unknown): boolean => val === true;
export const isIn = (val: unknown, arr: any[] = []): boolean => arr.some((o) => isEqual(val, o));
export const isBoolean = (val: unknown): boolean => typeof val === 'boolean';
export const isNumeric = (val: unknown): boolean => /^[+-]?([0-9]*[.])?[0-9]+$/.test(val as string);
export const isDateString = (val: unknown): boolean =>
  isStringFull(val) &&
  /^\d{4}-[01]\d-[0-3]\d(?:T[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[-+][0-2]\d(?::?[0-5]\d)?)?)?$/g.test(val as string);
export const isDate = (val: unknown): val is Date => val instanceof Date;
export const isValue = (val: unknown): boolean => isStringFull(val) || isNumber(val) || isBoolean(val) || isDate(val);
export const hasValue = (val: unknown): boolean =>
  isArrayFull(val) ? (val as any[]).every((o) => isValue(o)) : isValue(val);
export const isFunction = (val: unknown): boolean => typeof val === 'function';
