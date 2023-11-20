import add from "../../utils/add";

describe('add function', () => {

    describe('Basic Functionalities', () => {
        test('adds two positive numbers', () => {
            expect(add(5, 3)).toEqual(8);
        });

        test('adds two negative numbers', () => {
            expect(add(-4, -6)).toEqual(-10);
        });

        test('adds a positive and a negative number', () => {
            expect(add(-2, 3)).toEqual(1);
        });

        test('adds two floating point numbers', () => {
            expect(add(2.5, 3.1)).toEqual(5.6);
        });
    });

    describe('Edge Case Handling', () => {
        test('handles one undefined argument', () => {
            expect(add(undefined, 5)).toEqual(5);
            expect(add(4, undefined)).toEqual(4);
        });

        test('handles both arguments as undefined', () => {
            expect(add(undefined, undefined)).toEqual(0);
        });

        test('adds string representations of numbers', () => {
            expect(add('4', '3')).toEqual(7);
        });

        test('adds a number and a string representation of a number', () => {
            expect(add(2, '3')).toEqual(5);
            expect(add('5', 3)).toEqual(8);
        });
    });
});