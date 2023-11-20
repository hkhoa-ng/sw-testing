import toNumber from "../../utils/toNumber";

describe('toNumber', () => {

    describe('Basic Functionalities', () => {

        test('converts a standard number', () => {
            expect(toNumber(42)).toEqual(42);
        });

        test('converts a string representation of a number', () => {
            expect(toNumber('3.14')).toEqual(3.14);
        });

        test('converts special numeric values', () => {
            expect(toNumber(Infinity)).toEqual(Infinity);
            expect(toNumber(Number.MIN_VALUE)).toEqual(5e-324);
        });

        test('converts negative numbers', () => {
            expect(toNumber(-123)).toEqual(-123);
        });

        test('converts string representation of negative numbers', () => {
            expect(toNumber('-45')).toEqual(-45);
        });

        test('converts hexadecimal string representations', () => {
            expect(toNumber('0x1A')).toEqual(26);
        });

        test('converts binary string representations', () => {
            expect(toNumber('0b1010')).toEqual(10);
        });

        test('converts octal string representations', () => {
            expect(toNumber('0o17')).toEqual(15);
        });

        test('converts scientific notation strings', () => {
            expect(toNumber('1e3')).toEqual(1000);
        });

        test('converts numbers in a string with leading and trailing spaces', () => {
            expect(toNumber('  100  ')).toEqual(100);
        });
    });

    describe('Edge Case Handling', () => {

        test('converts a boolean value to number', () => {
            expect(toNumber(true)).toEqual(1);
            expect(toNumber(false)).toEqual(0);
        });

        test('converts null to 0', () => {
            expect(toNumber(null)).toEqual(0);
        });

        test('returns NaN for undefined', () => {
            expect(toNumber(undefined)).toEqual(NaN);
        });

        test('returns NaN for non-numeric strings', () => {
            expect(toNumber('hello')).toEqual(NaN);
        });

        test('handles objects with valueOf method', () => {
            expect(toNumber({valueOf: () => 42})).toEqual(42);
        });

        test('returns NaN for objects without valueOf method', () => {
            expect(toNumber({})).toEqual(NaN);
        });

        test('handles symbols and returns NaN', () => {
            expect(toNumber(Symbol('test'))).toEqual(NaN);
        });

        test('handles arrays and returns NaN', () => {
            expect(toNumber([1, 2, 3])).toEqual(NaN);
        });

        test('handles function references and returns NaN', () => {
            expect(toNumber(() => {})).toEqual(NaN);
        });

        test('handles complex string representations', () => {
            expect(toNumber('3.14someRandomText')).toEqual(NaN);
            expect(toNumber('0x1G')).toEqual(NaN);
        });

        test('handles empty strings as 0', () => {
            expect(toNumber('')).toEqual(0);
        });

        test('returns original value if valueOf is null', () => {
            const objWithValueOfNull = {
                value: 42,
                valueOf: null
            };
            expect(toNumber(objWithValueOfNull)).toBe(objWithValueOfNull);
        });

        test('returns NAN for badly formed hexadecimal strings', () => {
            const badHexValue = '-0x14';
            expect(toNumber(badHexValue)).toBe(NaN);
        });

    });
});