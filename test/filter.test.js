import filter from "../utils/filter";

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

    describe('Real product filtering', () => {
        const products = [
            { name: 'Organic Apple', price: 5.5, stocks: 10, categories: ['Fruits', 'Organic'], expirationDate: '2024-01-01' },
            { name: 'Almond Milk', price: 4.5, stocks: 15, categories: ['Dairy', 'Organic'], expirationDate: '2023-12-01' },
            { name: 'Chocolate Cake', price: 15.0, stocks: 2, categories: ['Bakery', 'Sweets'], expirationDate: '2023-11-18' },
        ];

        test('filters products within a specific price range', () => {
            const priceRange = { min: 4, max: 6 };
            const filteredProducts = filter(products, product => product.price >= priceRange.min && product.price <= priceRange.max);
            expect(filteredProducts).toEqual([
                { name: 'Organic Apple', price: 5.5, stocks: 10, categories: ['Fruits', 'Organic'], expirationDate: '2024-01-01' },
                { name: 'Almond Milk', price: 4.5, stocks: 15, categories: ['Dairy', 'Organic'], expirationDate: '2023-12-01' }
            ]);
        });

        test('filters products based on stock availability', () => {
            const inStockProducts = filter(products, product => product.stocks > 0);
            expect(inStockProducts).not.toContainEqual({ name: 'Chocolate Cake', price: 15.0, stocks: 0, categories: ['Bakery', 'Sweets'], expirationDate: '2023-11-18' });
        });

        test('filters organic products in a specific category', () => {
            const category = 'Dairy';
            const filteredProducts = filter(products, product => product.categories.includes('Organic') && product.categories.includes(category));
            expect(filteredProducts).toEqual([
                { name: 'Almond Milk', price: 4.5, stocks: 15, categories: ['Dairy', 'Organic'], expirationDate: '2023-12-01' }
            ]);
        });

        test('filters products expiring within a specific timeframe', () => {
            const today = new Date('2023-11-16');
            const withinDays = 30;
            const expiringSoonFilter = product => {
                const expirationDate = new Date(product.expirationDate);
                const timeDiff = expirationDate - today;
                return timeDiff <= withinDays * 24 * 60 * 60 * 1000;
            };
            const expiringSoonProducts = filter(products, expiringSoonFilter);
            expect(expiringSoonProducts).toEqual([
                { name: 'Almond Milk', price: 4.5, stocks: 15, categories: ['Dairy', 'Organic'], expirationDate: '2023-12-01' },
                { name: 'Chocolate Cake', price: 15.0, stocks: 2, categories: ['Bakery', 'Sweets'], expirationDate: '2023-11-18' }
            ]);
        });

        test('filters products by multiple criteria', () => {
            const criteria = {
                priceMax: 10,
                minStocks: 5,
                categories: ['Organic', 'Fruits']
            };
            const complexFilter = product => product.price <= criteria.priceMax && product.stocks >= criteria.minStocks && criteria.categories.some(category => product.categories.includes(category));
            const filteredProducts = filter(products, complexFilter);
            expect(filteredProducts).toEqual([
                
                { name: 'Organic Apple', price: 5.5, stocks: 10, categories: ['Fruits', 'Organic'], expirationDate: '2024-01-01' },
                { name: 'Almond Milk', price: 4.5, stocks: 15, categories: ['Dairy', 'Organic'], expirationDate: '2023-12-01' }
            ]);
        });
    });

})
