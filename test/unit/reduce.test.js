import reduce from '../../utils/reduce';

describe('reduce', () => {

    describe('Basic functionalities', () => {
        test('sums up an array of numbers', () => {
            const array = [1, 2, 3, 4, 5];
            const sumReducer = (sum, n) => sum + n;
            expect(reduce(array, sumReducer, 0)).toEqual(15);
        });

        test('concatenates an array of strings', () => {
            const array = ['a', 'b', 'c'];
            const concatReducer = (acc, str) => acc + str;
            expect(reduce(array, concatReducer, '')).toEqual('abc');
        });

        test('groups objects by a property', () => {
            const array = [{age: 20}, {age: 30}, {age: 20}];
            const groupByAge = (result, obj) => {
                (result[obj.age] || (result[obj.age] = [])).push(obj);
                return result;
            };
            expect(reduce(array, groupByAge, {})).toEqual({20: [{age: 20}, {age: 20}], 30: [{age: 30}]});
        });

        test('creates a new object by reducing over an array of keys and values', () => {
            const entries = [['key1', 10], ['key2', 20], ['key3', 30]];
            const objectReducer = (obj, [key, value]) => {
                obj[key] = value;
                return obj;
            };
            expect(reduce(entries, objectReducer, {})).toEqual({key1: 10, key2: 20, key3: 30});
        });

        test('finds the maximum value in an array of numbers', () => {
            const numbers = [10, 5, 20, 15];
            const maxReducer = (max, n) => (n > max ? n : max);
            expect(reduce(numbers, maxReducer, numbers[0])).toEqual(20);
        });

        test('accumulates elements into smaller groups based on a function', () => {
            const array = [1.2, 1.9, 2.4, 2.7];
            const groupByFloor = (acc, n) => {
                const key = Math.floor(n);
                (acc[key] || (acc[key] = [])).push(n);
                return acc;
            };
            expect(reduce(array, groupByFloor, {})).toEqual({1: [1.2, 1.9], 2: [2.4, 2.7]});
        });

        test('reduces an array to a string with a custom separator', () => {
            const array = ['Apple', 'Banana', 'Cherry'];
            const joinReducer = (str, item, index) => str + (index > 0 ? ', ' : '') + item;
            expect(reduce(array, joinReducer, '')).toEqual('Apple, Banana, Cherry');
        });
    });

    describe('Edge Case Handling', () => {
        test('handles an empty array with no initial value', () => {
            expect(reduce([], value => value)).toEqual(undefined);
        });

        test('handles an empty object with no initial value', () => {
            expect(reduce({}, value => value)).toEqual(undefined);
        });

        test('works with non-array/non-object collections', () => {
            expect(reduce('abc', (acc, char) => acc + char.toUpperCase(), '')).toEqual('ABC');
        });

        test('handles an empty array without an initial value', () => {
            expect(reduce([], (acc, val) => acc + val)).toBeUndefined();
        });

        test('handles arrays with only one element and no initial value', () => {
            expect(reduce([10], (acc, val) => acc + val)).toEqual(10);
        });

        test('handles non-array collections', () => {
            const obj = { a: 1, b: 2, c: 3 };
            const sumReducer = (acc, val) => acc + val;
            expect(reduce(obj, sumReducer, 0)).toEqual(6);
        });

        test('handles null or undefined collections', () => {
            expect(reduce(null, (acc, val) => acc + val, 0)).toEqual(0);
            expect(reduce(undefined, (acc, val) => acc + val, 0)).toEqual(0);
        });

        test('does not call iteratee when collection is empty', () => {
            const mockIteratee = jest.fn();
            reduce([], mockIteratee, 0);
            expect(mockIteratee).not.toHaveBeenCalled();
        });

        test('handles iteratee returning undefined', () => {
            const array = [1, 2, 3];
            expect(reduce(array, () => undefined, 0)).toBeUndefined();
        });

        test('handles collections with undefined or null elements', () => {
            const array = [undefined, null, 1];
            const sumReducer = (acc, val) => acc + (val || 0);
            expect(reduce(array, sumReducer, 0)).toEqual(1);
        });
    });
});