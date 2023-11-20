import filter from "../../utils/filter";

describe('filter', () => {

    describe('Basic Functionalities', () => {

        test('filters array based on predicate', () => {
            const users = [
                { 'user': 'barney', 'active': true },
                { 'user': 'fred',   'active': false }
            ];
            const result = filter(users, ({ active }) => active);
            expect(result).toEqual([{ 'user': 'barney', 'active': true }]);
        });

        test('returns empty array if no elements match predicate', () => {
            const numbers = [1, 2, 3, 4, 5];
            const result = filter(numbers, number => number > 10);
            expect(result).toEqual([]);
        });

        test('works with an array of primitives', () => {
            const numbers = [1, 2, 3, 4, 5];
            const result = filter(numbers, number => number % 2 === 0);
            expect(result).toEqual([2, 4]);
        });

        test('handles an empty array', () => {
            const result = filter([], number => number % 2 === 0);
            expect(result).toEqual([]);
        });

        test('calls the predicate with value, index, and array', () => {
            const mockPredicate = jest.fn();
            const numbers = [1, 2, 3];
            filter(numbers, mockPredicate);

            expect(mockPredicate.mock.calls).toEqual([
                [1, 0, numbers],
                [2, 1, numbers],
                [3, 2, numbers]
            ]);
        });

        test('returns empty array for null input', () => {
            expect(filter(null, x => x)).toEqual([]);
        });

        test('returns empty array for undefined input', () => {
            expect(filter(undefined, x => x)).toEqual([]);
        });

        test('handles an empty array input', () => {
            expect(filter([], x => x)).toEqual([]);
        });

        
        test('returns empty array when predicate never returns truthy value', () => {
            const numbers = [1, 2, 3, 4, 5];
            expect(filter(numbers, () => false)).toEqual([]);
        });

        test('returns same array when predicate always returns truthy value', () => {
            const numbers = [1, 2, 3, 4, 5];
            expect(filter(numbers, () => true)).toEqual(numbers);
        });

    });

    describe('Edge Case Handling', () => {
        test('filters large arrays efficiently', () => {
            const largeArray = Array.from({ length: 10000 }, (_, i) => i);
            const predicate = value => value % 2 === 0;

            const startTime = performance.now();
            const filteredArray = filter(largeArray, predicate);
            const endTime = performance.now();

            expect(filteredArray).toEqual(largeArray.filter(predicate));
            expect(endTime - startTime).toBeLessThan(100)
        });
       
        test('handles complex objects in the array', () => {
            const complexArray = [
                { id: 1, data: { type: 'fruit', name: 'apple' } },
                { id: 2, data: { type: 'vegetable', name: 'carrot' } }
            ];
            const predicate = item => item.data.type === 'fruit';

            const filteredArray = filter(complexArray, predicate);
            expect(filteredArray).toEqual([complexArray[0]]);
        });

        test('processes nested arrays correctly', () => {
            const nestedArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            const predicate = subArray => subArray.includes(5);

            const filteredArray = filter(nestedArray, predicate);
            expect(filteredArray).toEqual([[4, 5, 6]]);
        });

        test('handles multiple conditions in the predicate function', () => {
            const mixedArray = [
                { name: 'Apple', category: 'Fruit', price: 5 },
                { name: 'Carrot', category: 'Vegetable', price: 2 },
                { name: 'Banana', category: 'Fruit', price: 3 }
            ];
            const predicate = item => item.category === 'Fruit' && item.price < 4;

            const filteredArray = filter(mixedArray, predicate);
            expect(filteredArray).toEqual([mixedArray[2]]);
        });

        test('correctly filters an array with falsy values', () => {
            const array = [0, 1, false, 2, '', 3];
            const predicate = Boolean;
            expect(filter(array, predicate)).toEqual([1, 2, 3]);
        });
    });

})
