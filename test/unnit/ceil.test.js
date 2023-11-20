import ceil from "../../utils/ceil";

describe('ceil function', () => {

    describe('Basic Functionalities', () => {
        test('rounds up a simple decimal', () => {
            expect(ceil(4.006)).toEqual(5);
        });

        test('rounds up with specified precision', () => {
            expect(ceil(6.004, 2)).toEqual(6.01);
        });

        test('rounds up with negative precision', () => {
            expect(ceil(6040, -2)).toEqual(6100);
        });

        test('handles zero precision', () => {
            expect(ceil(4.006, 0)).toEqual(5);
        });

        test('handles integers without change', () => {
            expect(ceil(5)).toEqual(5);
        });

        test('rounds up negative numbers', () => {
            expect(ceil(-4.2)).toEqual(-4);
        });

        test('rounds up negative numbers with precision', () => {
            expect(ceil(-4.006, 2)).toEqual(-4.00);
        });
    });

    describe('Edge Case Handling', () => {
        test('handles undefined input', () => {
            expect(ceil(undefined)).toBeNaN();
        });

        test('handles null input', () => {
            expect(ceil(null)).toEqual(0);
        });

        test('handles non-numeric strings', () => {
            expect(ceil('abc')).toBeNaN();
        });

        test('handles numeric string input', () => {
            expect(ceil('5.2')).toEqual(6);
        });

        test('handles extreme large numbers', () => {
            expect(ceil(1e21)).toEqual(1e21);
        });

        test('handles extreme small decimal numbers', () => {
            expect(ceil(0.0000001, 7)).toEqual(0.0000001);
        });

        test('handles Infinity', () => {
            expect(ceil(Infinity)).toEqual(Infinity);
        });

        test('handles negative Infinity', () => {
            expect(ceil(-Infinity)).toEqual(-Infinity);
        });

        test('handles NaN', () => {
            expect(ceil(NaN)).toBeNaN();
        });

        test('handles precision beyond safe integer limit', () => {
            expect(ceil(10.123456789012345, 16)).toBe(10.123456789012345);
        });
    });
});
