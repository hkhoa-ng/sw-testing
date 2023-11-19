import reduce from '../utils/reduce';

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

    describe('Scenario Specific Tests', () => {
        describe('Scenario 1: User browsing, shopping, and making purchases', () => {
            test('calculates total price of items in the shopping cart', () => {
                const cartItems = [{ price: 5 }, { price: 10 }, { price: 3 }];
                const total = reduce(cartItems, (sum, item) => sum + item.price, 0);
                expect(total).toEqual(18);
            });

            test('returns zero for an empty shopping cart', () => {
                const cartItems = [];
                const total = reduce(cartItems, (sum, item) => sum + item.price, 0);
                expect(total).toEqual(0);
            });

            test('applies a discount to the total price', () => {
                const cartItems = [{ price: 20 }, { price: 15 }];
                const discount = 0.1;
                const total = reduce(cartItems, (sum, item) => sum + item.price, 0) * (1 - discount);
                expect(total).toEqual(31.5);
            });

            test('calculates total price including tax', () => {
                const cartItems = [{ price: 50 }, { price: 30 }];
                const taxRate = 0.08;
                const total = reduce(cartItems, (sum, item) => sum + item.price, 0) * (1 + taxRate);
                expect(total).toEqual(86.4);
            });
        });

        describe('Scenario 2: Producer Adding Products', () => {

            test('calculates total inventory value of added products', () => {
                const addedProducts = [{ price: 100, quantity: 5 }, { price: 50, quantity: 10 }];
                const totalInventoryValue = reduce(addedProducts, (total, product) => total + (product.price * product.quantity), 0);
                expect(totalInventoryValue).toEqual(1000);
            });

            test('counts total number of products added', () => {
                const addedProducts = [{}, {}, {}, {}];
                const totalProducts = reduce(addedProducts, total => total + 1, 0);
                expect(totalProducts).toEqual(4);
            });

            test('calculates average price of added products', () => {
                const addedProducts = [{ price: 100 }, { price: 50 }, { price: 150 }];
                const averagePrice = reduce(addedProducts, (total, product, _, { length }) => total + product.price / length, 0);
                expect(averagePrice).toEqual(100);
            });

            test('identifies unique categories of added products', () => {
                const addedProducts = [{ category: 'Fruits' }, { category: 'Vegetables' }, { category: 'Fruits' }];
                const uniqueCategories = reduce(addedProducts, (categories, product) => {
                    if (!categories.includes(product.category)) {
                        categories.push(product.category);
                    }
                    return categories;
                }, []);
                expect(uniqueCategories).toEqual(['Fruits', 'Vegetables']);
            });

        });

        describe('Scenario 3: Producer Modifying Existing Product', () => {

            test('updates total inventory value after product modifications', () => {
                const modifiedProducts = [{ price: 110, quantity: 5 }, { price: 55, quantity: 10 }];
                const totalInventoryValue = reduce(modifiedProducts, (total, product) => total + (product.price * product.quantity), 0);
                expect(totalInventoryValue).toEqual(1100);
            });

            test('calculates average price change of modified products', () => {
                const originalProducts = [{ price: 100 }, { price: 50 }, { price: 150 }];
                const modifiedProducts = [{ price: 110 }, { price: 55 }, { price: 155 }];
                const averagePriceChange = reduce(modifiedProducts, (total, product, index) => total + (product.price - originalProducts[index].price) / modifiedProducts.length, 0);
                expect(parseFloat(averagePriceChange.toFixed(2))).toEqual(6.67);
            });

            test('counts products in a specified category after modifications', () => {
                const modifiedProducts = [{ category: 'Beverages' }, { category: 'Fruits' }, { category: 'Beverages' }];
                const countInCategory = reduce(modifiedProducts, (count, product) => product.category === 'Beverages' ? count + 1 : count, 0);
                expect(countInCategory).toEqual(2);
            });

            test('aggregates updated product information', () => {
                const modifiedProducts = [{ id: 1, price: 110 }, { id: 2, price: 55 }];
                const productUpdates = reduce(modifiedProducts, (updates, product) => {
                    updates[product.id] = product.price;
                    return updates;
                }, {});
                expect(productUpdates).toEqual({ 1: 110, 2: 55 });
            });

        });

    });
});