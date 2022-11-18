import {
  isUndefined,
  isNull,
  isNil,
  isString,
} from '../lib/value-checks.utils';

describe('Valie checks', () => {
  describe('isUndefined', () => {
    it('should be a function', () => {
      expect(typeof isUndefined).toBe('function');
    });
    it('should return true', () => {
      expect(isUndefined(undefined)).toBe(true);
    });
    it('should return false', () => {
      expect(isUndefined(null)).toBe(false);
    });
  });

  describe('isNull', () => {
    it('should return true', () => {
      expect(isNull(null)).toBe(true);
    });
    it('should return false, 1', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull({})).toBe(false);
    });
  });

  describe('isNil', () => {
    it('should return true, 1', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });
    it('should return false, 1', () => {
      expect(isNil({})).toBe(false);
      expect(isNil('')).toBe(false);
      expect(isNil({})).toBe(false);
      expect(isNil(false)).toBe(false);
      expect(isNil(0)).toBe(false);
    });
  });

  describe('isString', () => {
    it('should return true', () => {
      expect(isString('')).toBe(true);
      expect(isString('1')).toBe(true);
      expect(isString('true')).toBe(true);
    });
    it('should return false', () => {
      expect(isString(false)).toBe(false);
      expect(isString(1)).toBe(false);
    });
  });
});
