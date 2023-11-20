import isEmpty from "../../utils/isEmpty";

describe('isEmpty', () => {

    describe('Basic Functionalities', () => {
        test('returns true for null or undefined', () => {
            expect(isEmpty(null)).toBe(true);
            expect(isEmpty(undefined)).toBe(true);
        });

        test('returns true for primitive types', () => {
            expect(isEmpty(1)).toBe(true);
            expect(isEmpty(true)).toBe(true);
            expect(isEmpty('')).toBe(true);
        });

        test('returns false for non-empty arrays and strings', () => {
            expect(isEmpty([1, 2, 3])).toBe(false);
            expect(isEmpty('abc')).toBe(false);
        });

        test('returns true for empty objects, arrays, and strings', () => {
            expect(isEmpty({})).toBe(true);
            expect(isEmpty([])).toBe(true);
            expect(isEmpty('')).toBe(true);
        });

        test('returns false for non-empty objects', () => {
            expect(isEmpty({ 'a': 1 })).toBe(false);
        });

        test('returns true for false', () => {
            expect(isEmpty(false)).toBe(true);
        });

        test('returns true for zero', () => {
            expect(isEmpty(0)).toBe(true);
        });

        test('returns true for empty arguments object', () => {
            function testFunction() {
                return isEmpty(arguments);
            }
            expect(testFunction()).toBe(true);
        });

        test('returns false for non-empty arguments object', () => {
            function testFunction() {
                return isEmpty(arguments);
            }
            expect(testFunction(1, 2)).toBe(false);
        });

        test('returns true for empty Typed Arrays', () => {
            expect(isEmpty(new Int8Array())).toBe(true);
            expect(isEmpty(new Uint8Array())).toBe(true);
        });

        test('returns false for non-empty Typed Arrays', () => {
            expect(isEmpty(new Int8Array([1]))).toBe(false);
            expect(isEmpty(new Uint8Array([1]))).toBe(false);
        });

        test('returns true for Date object', () => {
            expect(isEmpty(new Date())).toBe(true);
        });

        test('returns true for regular expression object', () => {
            expect(isEmpty(/abc/)).toBe(true);
        });
    });

    describe('Edge Case Handling', () => {
        test('returns true for objects with no own properties', () => {
            const obj = Object.create({ a: 1 });
            expect(isEmpty(obj)).toBe(true);
        });

        test('returns true for empty Maps and Sets', () => {
            expect(isEmpty(new Map())).toBe(true);
            expect(isEmpty(new Set())).toBe(true);
        });

        test('returns false for non-empty Maps and Sets', () => {
            const map = new Map([['a', 1]]);
            const set = new Set([1]);
            expect(isEmpty(map)).toBe(false);
            expect(isEmpty(set)).toBe(false);
        });

         test('returns false for objects with inherited properties', () => {
            class Parent {
                 constructor() {
                     this.a = 1;
                 }
             }
            function Child() {}
            Child.prototype = new Parent();
            expect(isEmpty(new Child())).toBe(false);
        });

        test('returns true for objects with symbol properties', () => {
            const symbolKey = Symbol('key');
            const obj = { [symbolKey]: 'value' };
            expect(isEmpty(obj)).toBe(true);
        });

        test('returns true for functions', () => {
            expect(isEmpty(function() {})).toBe(true);
        });

        test('returns true for objects with non-enumerable properties', () => {
            const obj = {};
            Object.defineProperty(obj, 'a', { value: 1, enumerable: false });
            expect(isEmpty(obj)).toBe(true);
        });

        test('returns false for objects that implement their own `toString` method', () => {
            const obj = { toString: () => 'Hello' };
            expect(isEmpty(obj)).toBe(false);
        });

        test('returns true for Buffer objects with a length of 0', () => {
            expect(isEmpty(Buffer.from(''))).toBe(true);
        });

        test('returns false for Buffer objects with content', () => {
            expect(isEmpty(Buffer.from('abc'))).toBe(false);
        });

        test('returns false for objects with only undefined properties', () => {
            const obj = { a: undefined };
            expect(isEmpty(obj)).toBe(false);
        });

        test('returns false for functions with properties', () => {
            class func {
                constructor() { }
            }
            func.a = 1;
            expect(isEmpty(func)).toBe(false);
        });

        test('returns true for objects with only non-enumerable properties', () => {
            const obj = {};
            Object.defineProperty(obj, 'a', { value: 1, enumerable: false });
            expect(isEmpty(obj)).toBe(true);
        });

        test('returns true for objects with non-enumerable properties', () => {
            const obj = {};
            Object.defineProperty(obj, 'a', { value: 1, enumerable: false });
            expect(isEmpty(obj)).toBe(true);
        });

          test('Checks if value is a prototype object', () => {
            function TestObject(){}
            const result = isEmpty(TestObject.prototype);
            expect(result).toBe(true);
        });
    });

});