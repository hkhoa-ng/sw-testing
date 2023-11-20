import map from "../../utils/map";

describe('map Function Tests', () => {

    describe('Basic Functionalities', () => {
        test('applies a function to each element of an array', () => {
            const square = n => n * n;
            expect(map([4, 8], square)).toEqual([16, 64]);
        });

        test('returns an array of different data types', () => {
            const toType = value => typeof value;
            expect(map([1, 'a', true], toType)).toEqual(['number', 'string', 'boolean']);
        });

        test('handles larger arrays', () => {
            const largeArray = Array.from({ length: 100 }, (_, i) => i + 1);
            const iteratee = n => n * 2;
            const expectedResult = largeArray.map(iteratee);
            expect(map(largeArray, iteratee)).toEqual(expectedResult);
        });

        test('uses both value and index in the iteratee', () => {
            const withIndex = (value, index) => value + index;
            expect(map([10, 20, 30], withIndex)).toEqual([10, 21, 32]);
        });

        test('handles nested arrays correctly', () => {
            const flatten = value => Array.isArray(value) ? value[0] : value;
            expect(map([1, [2], [3, 4], 5], flatten)).toEqual([1, 2, 3, 5]);
        });

        test('does not modify the original array', () => {
            const originalArray = [1, 2, 3];
            const mutate = value => value + 1;
            map(originalArray, mutate);
            expect(originalArray).toEqual([1, 2, 3]);
        });
    });

    describe('Edge Case Handling', () => {
        test('handles sparse arrays correctly', () => {
            const array = [1, , 3];
            const result = map(array, x => x * 2);
            expect(result).toEqual([2, undefined, 6]);
        });

        test('handles arrays with null and undefined values', () => {
            const array = [undefined, null, 2];
            const result = map(array, x => x == null ? 'null or undefined' : x * 2);
            expect(result).toEqual(['null or undefined', 'null or undefined', 4]);
        });

        test('throws error for non-function iteratees', () => {
            const array = [1, 2, 3];
            expect(() => map(array, 'not a function')).toThrow();
        });

        test('processes arrays with complex objects', () => {
            const array = [{ id: 1, value: 10 }, { id: 2, value: 20 }];
            const result = map(array, obj => obj.value * 2);
            expect(result).toEqual([20, 40]);
        });

        test('processes nested arrays correctly', () => {
            const array = [[1, 2], [3, 4]];
            const result = map(array, subArray => subArray.map(x => x * 2));
            expect(result).toEqual([[2, 4], [6, 8]]);
        });

        test('handles large arrays efficiently', () => {
            const largeArray = Array(10000).fill(1);
            const start = performance.now();
            map(largeArray, x => x + 1);
            const end = performance.now();
            expect(end - start).toBeLessThan(100);
        });

        test('handles functions with side effects', () => {
            let sideEffect = 0;
            const array = [1, 2, 3];
            map(array, x => { sideEffect += x; return x * 2; });
            expect(sideEffect).toEqual(6);
        });

        test('handles multiple conditions in the iteratee function', () => {
            const array = [1, 2, 3, 4, 5];
            const result = map(array, x => x % 2 === 0 ? x * 2 : x / 2);
            expect(result).toEqual([0.5, 4, 1.5, 8, 2.5]);
        });

                test('handles null array correctly', () => {
            const iteratee = n => n * 2;
            expect(map(null, iteratee)).toEqual([]);
        });

        test('handles undefined array correctly', () => {
            const iteratee = n => n * 2;
            let arr;
            expect(map(arr, iteratee)).toEqual([]);
        });
    });

    describe('Complex Mapping Tests', () => {
        test('applies a complex function to each element', () => {
            const complexFunction = (value, index) => ({ index, squared: value * value });
            expect(map([2, 3], complexFunction)).toEqual([{ index: 0, squared: 4 }, { index: 1, squared: 9 }]);
        });

        test('maps to nested objects', () => {
            const complexFunction = value => ({ number: value, details: { squared: value * value, isEven: value % 2 === 0 }});
            expect(map([1, 2], complexFunction)).toEqual([
                { number: 1, details: { squared: 1, isEven: false }},
                { number: 2, details: { squared: 4, isEven: true }}
            ]);
        });

        test('performs multiple operations in the iteratee function', () => {
            const complexFunction = (value, index, array) => {
                return {
                    original: value,
                    doubled: value * 2,
                    index,
                    isLast: index === array.length - 1
                };
            };
            expect(map([10, 20], complexFunction)).toEqual([
                { original: 10, doubled: 20, index: 0, isLast: false },
                { original: 20, doubled: 40, index: 1, isLast: true }
            ]);
        });

        test('uses external context in the iteratee function', () => {
            const context = { multiplier: 3 };
            const complexFunction = function(value) { return value * this.multiplier; };
            expect(map([1, 2], complexFunction, context)).toEqual([3, 6]);
        });

        test('maps elements to function results', () => {
            const functions = [Math.sqrt, x => x * 2];
            expect(map([4, 3], (value, index) => functions[index](value))).toEqual([2, 6]);
        });

        test('maps elements conditionally based on index', () => {
            const complexFunction = (value, index) => index % 2 === 0 ? value * 2 : value / 2;
            expect(map([1, 2, 3, 4], complexFunction)).toEqual([2, 1, 6, 2]);
        });
    });
});