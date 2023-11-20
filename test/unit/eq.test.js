import eq from "../../utils/eq";

describe('eq', () => {

    describe('Basic functionalities', () =>{
        test('compares two identical strings', () => {
            expect(eq('hello', 'hello')).toBe(true);
        });

        test('compares identical numbers', () => {
            expect(eq(5, 5)).toBe(true);
        });

        test('compares an object to itself', () => {
            const object = { a: 1 };
            expect(eq(object, object)).toBe(true);
        });

        test('compares null values', () => {
            expect(eq(null, null)).toBe(true);
        });

        test('compares NaN values', () => {
            expect(eq(NaN, NaN)).toBe(true);
        });
    })

    describe('Edge Case Handling', () => {
        test('compares different strings', () => {
            expect(eq('hello', 'world')).toBe(false);
        });

        test('compares different numbers', () => {
            expect(eq(5, 10)).toBe(false);
        });

        test('compares two different objects with same structure', () => {
            const object1 = { a: 1 };
            const object2 = { a: 1 };
            expect(eq(object1, object2)).toBe(false);
        });

        test('compares 0 and -0', () => {
            expect(eq(0, -0)).toBe(true);
        });

        test('compares a string to a string object', () => {
            expect(eq('a', new String('a'))).toBe(true);
        });

        test('compares true and false', () => {
            expect(eq(true, false)).toBe(false);
        });
    })
})
