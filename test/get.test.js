import get from "../utils/get";

describe('get function', () => {

    describe('Basic Functionalities', () => {

        test('retrieves a nested property value', () => {
            const object = { 'a': [{ 'b': { 'c': 3 } }] };
            expect(get(object, 'a[0].b.c')).toEqual(3);
        });

        test('retrieves a property using array path', () => {
            const object = { 'a': [{ 'b': { 'c': 3 } }] };
            expect(get(object, ['a', '0', 'b', 'c'])).toEqual(3);
        });

        test('returns undefined for non-existent property', () => {
            const object = { 'a': [{ 'b': { 'c': 3 } }] };
            expect(get(object, 'a.b.c')).toBeUndefined();
        });

        test('retrieves a direct property value', () => {
            const object = { 'a': 1, 'b': 2 };
            expect(get(object, 'a')).toEqual(1);
            expect(get(object, 'b')).toEqual(2);
        });

        test('handles paths leading to array elements', () => {
            const object = { 'a': [1, 2, 3] };
            expect(get(object, 'a[1]')).toEqual(2);
        });

        test('returns undefined for invalid array indices', () => {
            const object = { 'a': [1, 2, 3] };
            expect(get(object, 'a[5]')).toBeUndefined();
        });

        test('works with paths including both arrays and objects', () => {
            const object = { 'a': [{ 'b': { 'c': [1, 2, 3] } }] };
            expect(get(object, 'a[0].b.c[1]')).toEqual(2);
        });

        test('returns undefined for broken paths', () => {
            const object = { 'a': [{ 'b': { 'c': 3 } }] };
            expect(get(object, 'a[1].b.c')).toBeUndefined();
        });

        test('retrieves values from deeply nested structures', () => {
            const object = { 'a': { 'b': { 'c': { 'd': { 'e': 'value' } } } } };
            expect(get(object, 'a.b.c.d.e')).toEqual('value');
        });

    });

    describe('Edge Case Handling', () => {

        test('handles null or undefined object', () => {
            expect(get(null, 'a.b.c')).toBeUndefined();
            expect(get(undefined, 'a.b.c')).toBeUndefined();
        });

        test('handles non-object values gracefully', () => {
            expect(get(42, 'a.b.c')).toBeUndefined();
        });

        test('returns default value for non-existent paths', () => {
            const object = { 'a': 1 };
            expect(get(object, 'b', 'default')).toEqual('default');
        });

        test('handles paths as non-string values', () => {
            const object = { 'a': [{ 'b': { 'c': 3 } }] };
            expect(get(object, 1)).toBeUndefined();
        });

        test('returns default value when accessing properties on non-object values', () => {
            expect(get('string', 'a', 'default')).toEqual('default');
        });

        test('handles empty string as a path', () => {
            const object = { '': 'value' };
            expect(get(object, '')).toEqual('value');
        });

        test('handles arrays as paths', () => {
            const object = { 'a': { 'b': { 'c': 3 } } };
            expect(get(object, ['a', 'b', 'c'])).toEqual(3);
        });

        test('returns undefined for paths that start correct but end incorrectly', () => {
            const object = { 'a': { 'b': { 'c': 3 } } };
            expect(get(object, 'a.b.d')).toBeUndefined();
        });

        test('handles symbols as keys in the path', () => {
            const sym = Symbol('b');
            const object = { 'a': { [sym]: 'value' } };
            expect(get(object, ['a', sym])).toEqual('value');
        });

    });

    describe('Scenario Specific Tests', () => {
        describe('Scenario 1: User browsing, shopping, and making purchases', () => {
            test('retrieves product details from a complex object structure', () => {
                const store = {
                    products: [
                        { id: 1, name: 'Apple', category: 'Fruits' },
                        { id: 2, name: 'Carrot', category: 'Vegetables' }
                    ]
                };
                expect(get(store, 'products[1].name')).toEqual('Carrot');
            });

            test('retrieves a default value when a product is not found', () => {
                const store = {
                    products: [
                        { id: 1, name: 'Apple', category: 'Fruits' },
                        { id: 2, name: 'Carrot', category: 'Vegetables' }
                    ]
                };
                expect(get(store, 'products[2].name', 'Not Found')).toEqual('Not Found');
            });

            test('handles nested arrays within product properties', () => {
                const store = {
                    products: [
                        { id: 1, name: 'Apple', category: 'Fruits', tags: ['fresh', 'juicy'] }
                    ]
                };
                expect(get(store, 'products[0].tags[1]')).toEqual('juicy');
            });

            test('returns undefined for non-existent nested properties', () => {
                const store = {
                    products: [
                        { id: 1, name: 'Apple', category: 'Fruits' }
                    ]
                };
                expect(get(store, 'products[0].price')).toBeUndefined();
            });

            test('retrieves product details using a complex path', () => {
                const store = {
                    department: {
                        produce: {
                            products: [{ id: 1, name: 'Apple', category: 'Fruits' }]
                        }
                    }
                };
                expect(get(store, 'department.produce.products[0].name')).toEqual('Apple');
            });

            test('retrieves information from arrays of objects with mixed types', () => {
                const store = {
                    products: [
                        'Fruits',
                        { id: 1, name: 'Apple', category: 'Fruits' }
                    ]
                };
                expect(get(store, 'products[1].name')).toEqual('Apple');
            });
        })

        describe('Scenario 2: Producer Adding Products', () => {
            test('retrieves newly added product information', () => {
                const producerData = {
                    newProduct: { id: 3, name: 'Banana', category: 'Fruits' }
                };
                expect(get(producerData, 'newProduct.name')).toEqual('Banana');
            });

            test('retrieves details of a product with multiple attributes', () => {
                const producerData = {
                    newProduct: { id: 4, name: 'Orange', category: 'Fruits', price: 2.5 }
                };
                expect(get(producerData, 'newProduct.price')).toEqual(2.5);
            });

            test('handles retrieval of a nested supplier information', () => {
                const producerData = {
                    newProduct: {
                        id: 5, name: 'Grapes', category: 'Fruits',
                        supplier: { name: 'FreshFarms', location: 'Hillside' }
                    }
                };
                expect(get(producerData, 'newProduct.supplier.name')).toEqual('FreshFarms');
            });

            test('returns undefined for missing optional attributes', () => {
                const producerData = {
                    newProduct: { id: 6, name: 'Mango', category: 'Fruits' }
                };
                expect(get(producerData, 'newProduct.origin')).toBeUndefined();
            });

            test('accesses data in arrays of newly added products', () => {
                const producerData = {
                    newProducts: [
                        { id: 7, name: 'Pear', category: 'Fruits' },
                        { id: 8, name: 'Kiwi', category: 'Fruits' }
                    ]
                };
                expect(get(producerData, 'newProducts[1].name')).toEqual('Kiwi');
            });

            test('retrieves product information with dynamic paths', () => {
                const producerData = {
                    newProduct: { id: 9, name: 'Peach', category: 'Fruits' }
                };
                const path = 'newProduct.name';
                expect(get(producerData, path)).toEqual('Peach');
            });
        })

        describe('Scenario 3:Producer Modifying Existing Product', ()=> {
            test('retrieves updated product price', () => {
                const updateInfo = {
                    productUpdate: { id: 2, newPrice: 5.99 }
                };
                expect(get(updateInfo, 'productUpdate.newPrice')).toEqual(5.99);
            });

            test('retrieves details of a product with multiple attributes', () => {
                const producerData = {
                    newProduct: { id: 4, name: 'Orange', category: 'Fruits', price: 2.5 }
                };
                expect(get(producerData, 'newProduct.price')).toEqual(2.5);
            });

            test('handles retrieval of a nested supplier information', () => {
                const producerData = {
                    newProduct: {
                        id: 5, name: 'Grapes', category: 'Fruits',
                        supplier: { name: 'FreshFarms', location: 'Hillside' }
                    }
                };
                expect(get(producerData, 'newProduct.supplier.name')).toEqual('FreshFarms');
            });

            test('returns undefined for missing optional attributes', () => {
                const producerData = {
                    newProduct: { id: 6, name: 'Mango', category: 'Fruits' }
                };
                expect(get(producerData, 'newProduct.origin')).toBeUndefined();
            });

            test('accesses data in arrays of newly added products', () => {
                const producerData = {
                    newProducts: [
                        { id: 7, name: 'Pear', category: 'Fruits' },
                        { id: 8, name: 'Kiwi', category: 'Fruits' }
                    ]
                };
                expect(get(producerData, 'newProducts[1].name')).toEqual('Kiwi');
            });

            test('retrieves product information with dynamic paths', () => {
                const producerData = {
                    newProduct: { id: 9, name: 'Peach', category: 'Fruits' }
                };
                const path = 'newProduct.name';
                expect(get(producerData, path)).toEqual('Peach');
            });
        })
    })

});