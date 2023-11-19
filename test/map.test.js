import map from "../utils/map";

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

    describe('Scenario Specific Tests', () => {
        describe('Scenario 1: User browsing, shopping, and making purchases', () => {

                test('maps product prices to include tax', () => {
                    const products = [
                        { name: 'Book', price: 20 },
                        { name: 'Pen', price: 5 }
                    ];
                    const taxRate = 0.1;
                    const priceWithTax = product => ({ ...product, price: product.price * (1 + taxRate) });
                    expect(map(products, priceWithTax)).toEqual([
                        { name: 'Book', price: 22 },
                        { name: 'Pen', price: 5.5 }
                    ]);
                });

                test('maps product names to uppercase', () => {
                    const products = [
                        { name: 'Shirt', price: 30 },
                        { name: 'Pants', price: 50 }
                    ];
                    const upperCaseName = product => ({ ...product, name: product.name.toUpperCase() });
                    expect(map(products, upperCaseName)).toEqual([
                        { name: 'SHIRT', price: 30 },
                        { name: 'PANTS', price: 50 }
                    ]);
                });

                test('maps products to include discount percentage', () => {
                    const products = [
                        { name: 'Laptop', price: 1000 },
                        { name: 'Mouse', price: 50 }
                    ];
                    const discountPercentage = 10;
                    const applyDiscount = product => ({ ...product, price: product.price * (1 - discountPercentage / 100) });
                    expect(map(products, applyDiscount)).toEqual([
                        { name: 'Laptop', price: 900 },
                        { name: 'Mouse', price: 45 }
                    ]);
                });

                test('maps products to include user ratings', () => {
                    const products = [
                        { name: 'Coffee', price: 15 },
                        { name: 'Tea', price: 10 }
                    ];
                    const addRating = (product, index) => ({ ...product, rating: 4 + index * 0.5 });
                    expect(map(products, addRating)).toEqual([
                        { name: 'Coffee', price: 15, rating: 4 },
                        { name: 'Tea', price: 10, rating: 4.5 }
                    ]);
                });

                test('maps products to include availability status', () => {
                    const products = [
                        { name: 'Chair', price: 100, inStock: true },
                        { name: 'Table', price: 200, inStock: false }
                    ];
                    const addAvailability = product => ({ ...product, available: product.inStock ? 'In Stock' : 'Out of Stock' });
                    expect(map(products, addAvailability)).toEqual([
                        { name: 'Chair', price: 100, inStock: true, available: 'In Stock' },
                        { name: 'Table', price: 200, inStock: false, available: 'Out of Stock' }
                    ]);
                });

        });

        describe('Scenario 2: Producer Adding Products', () => {

            test('maps new products to include producer details', () => {
                const newProducts = [
                    { name: 'Organic Honey', price: 15 },
                    { name: 'Almond Milk', price: 10 }
                ];
                const producerDetails = { producerName: 'Local Farms', producerId: 'LF123' };
                const addProducerDetails = product => ({ ...product, ...producerDetails });
                expect(map(newProducts, addProducerDetails)).toEqual([
                    { name: 'Organic Honey', price: 15, producerName: 'Local Farms', producerId: 'LF123' },
                    { name: 'Almond Milk', price: 10, producerName: 'Local Farms', producerId: 'LF123' }
                ]);
            });

            test('maps product information to format for database entry', () => {
                const productData = [
                    { name: 'Olive Oil', price: 20, category: 'Groceries' },
                    { name: 'Green Tea', price: 5, category: 'Beverages' }
                ];
                const formatForDatabase = product => ({
                    productName: product.name,
                    productPrice: product.price,
                    productCategory: product.category,
                    status: 'Pending'
                });
                expect(map(productData, formatForDatabase)).toEqual([
                    { productName: 'Olive Oil', productPrice: 20, productCategory: 'Groceries', status: 'Pending' },
                    { productName: 'Green Tea', productPrice: 5, productCategory: 'Beverages', status: 'Pending' }
                ]);
            });

            test('maps incomplete product data to include default values', () => {
                const incompleteProducts = [
                    { name: 'Red Wine', category: 'Alcohol' },
                    { name: 'Chocolate', category: 'Snacks' }
                ];
                const addDefaultValues = product => ({
                    name: product.name,
                    price: product.price || 0,
                    category: product.category,
                    inStock: product.inStock || false
                });
                expect(map(incompleteProducts, addDefaultValues)).toEqual([
                    { name: 'Red Wine', price: 0, category: 'Alcohol', inStock: false },
                    { name: 'Chocolate', price: 0, category: 'Snacks', inStock: false }
                ]);
            });

            test('maps product data to include promotional tags', () => {
                const products = [
                    { name: 'Cheese', price: 10, isNew: true },
                    { name: 'Bread', price: 3, isOnSale: true }
                ];
                const addPromotionalTags = product => ({
                    ...product,
                    tags: [product.isNew ? 'New' : '', product.isOnSale ? 'Sale' : ''].filter(tag => tag)
                });
                expect(map(products, addPromotionalTags)).toEqual([
                    { name: 'Cheese', price: 10, isNew: true, tags: ['New'] },
                    { name: 'Bread', price: 3, isOnSale: true, tags: ['Sale'] }
                ]);
            });

            test('maps products to include an encoded ID for tracking', () => {
                const products = [
                    { name: 'Coffee Beans', price: 15 },
                    { name: 'Green Tea', price: 5 }
                ];
                const addEncodedId = (product, index) => ({ ...product, encodedId: `P${index + 100}` });
                expect(map(products, addEncodedId)).toEqual([
                    { name: 'Coffee Beans', price: 15, encodedId: 'P100' },
                    { name: 'Green Tea', price: 5, encodedId: 'P101' }
                ]);
            });
          });
        });

        describe('Scenario 3:Producer Modifying Existing Product', ()=> {
          const originalProducts = [
              { id: 1, name: 'Apple', price: 5, category: 'Fruits' },
              { id: 2, name: 'Bread', price: 3, category: 'Bakery' }
          ];
          const modifyProduct = (product, modifications) => ({ ...product, ...modifications });

          test('applies price updates to each product', () => {
              const priceUpdates = { '1': 6, '2': 3.5 };
              const updatedProducts = map(originalProducts, product => modifyProduct(product, { price: priceUpdates[product.id] }));
              expect(updatedProducts).toEqual([
                  { id: 1, name: 'Apple', price: 6, category: 'Fruits' },
                  { id: 2, name: 'Bread', price: 3.5, category: 'Bakery' }
              ]);
          });

          test('adds a new attribute to each product', () => {
              const additionalAttributes = { availability: 'In Stock' };
              const updatedProducts = map(originalProducts, product => modifyProduct(product, additionalAttributes));
              expect(updatedProducts).toEqual([
                  { id: 1, name: 'Apple', price: 5, category: 'Fruits', availability: 'In Stock' },
                  { id: 2, name: 'Bread', price: 3, category: 'Bakery', availability: 'In Stock' }
              ]);
          });

          test('updates the category of certain products', () => {
              const categoryUpdate = (product) => product.name === 'Apple' ? 'Organic Fruits' : product.category;
              const updatedProducts = map(originalProducts, product => modifyProduct(product, { category: categoryUpdate(product) }));
              expect(updatedProducts).toEqual([
                  { id: 1, name: 'Apple', price: 5, category: 'Organic Fruits' },
                  { id: 2, name: 'Bread', price: 3, category: 'Bakery' }
              ]);
          });

          test('modifies only the product with a specific ID', () => {
              const targetId = 1;
              const modification = { price: 4.5 };
              const updatedProducts = map(originalProducts, product => product.id === targetId ? modifyProduct(product, modification) : product);
              expect(updatedProducts).toEqual([
                  { id: 1, name: 'Apple', price: 4.5, category: 'Fruits' },
                  { id: 2, name: 'Bread', price: 3, category: 'Bakery' }
              ]);
          });

          test('applies multiple updates to products', () => {
              const updates = {
                  '1': { price: 5.5, category: 'Organic Fruits' },
                  '2': { name: 'Gluten Free Bread', price: 3.8 }
              };
              const updatedProducts = map(originalProducts, product => modifyProduct(product, updates[product.id]));
              expect(updatedProducts).toEqual([
                  { id: 1, name: 'Apple', price: 5.5, category: 'Organic Fruits' },
                  { id: 2, name: 'Gluten Free Bread', price: 3.8, category: 'Bakery' }
              ]);
          });

          test('decreases the price of products above a certain threshold', () => {
              const priceReductionThreshold = 4;
              const priceReductionAmount = 0.5;
              const updatedProducts = map(originalProducts, product => product.price > priceReductionThreshold ? modifyProduct(product, { price: product.price - priceReductionAmount }) : product);
              expect(updatedProducts).toEqual([
                  { id: 1, name: 'Apple', price: 4.5, category: 'Fruits' },
                  { id: 2, name: 'Bread', price: 3, category: 'Bakery' }
              ]);
          });
        })
});