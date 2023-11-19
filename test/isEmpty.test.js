import isEmpty from "../utils/isEmpty";

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

    describe('Scenario Specific Tests', () => {
        describe('Scenario 1: User browsing, shopping, and making purchases', () => {
            test('checks if the shopping cart is empty', () => {
                const shoppingCart = [];
                expect(isEmpty(shoppingCart)).toBe(true);
            });

            test('recognizes a non-empty wishlist', () => {
                const wishlist = ['Apple', 'Banana'];
                expect(isEmpty(wishlist)).toBe(false);
            });

            test('verifies empty search results', () => {
                const searchResults = [];
                expect(isEmpty(searchResults)).toBe(true);
            });

            test('detects non-empty user profile information', () => {
                const userProfile = { name: 'John Doe', email: 'john@example.com' };
                expect(isEmpty(userProfile)).toBe(false);
            });

            test('checks if user past orders history is empty', () => {
                const pastOrders = [];
                expect(isEmpty(pastOrders)).toBe(true);
            });

            test('confirms a non-empty cart with multiple items', () => {
                const shoppingCart = [{ item: 'Orange', qty: 3 }, { item: 'Grapes', qty: 2 }];
                expect(isEmpty(shoppingCart)).toBe(false);
            });
        });

        describe('Scenario 2: Producer Adding Products', () => {
            test('validates an empty product entry', () => {
                const newProduct = {};
                expect(isEmpty(newProduct)).toBe(true);
            });

            test('recognizes a filled product entry', () => {
                const newProduct = { name: 'Mango', price: 2.99, category: 'Fruits' };
                expect(isEmpty(newProduct)).toBe(false);
            });

            test('checks if the list of products to add is empty', () => {
                const productsToAdd = [];
                expect(isEmpty(productsToAdd)).toBe(true);
            });

            test('verifies non-empty category list for new products', () => {
                const categories = ['Fruits', 'Vegetables'];
                expect(isEmpty(categories)).toBe(false);
            });

            test('confirms that product details are not empty before adding', () => {
                const newProductDetails = { name: 'Pear', price: 2.99, stock: 50 };
                expect(isEmpty(newProductDetails)).toBe(false);
            });

            test('ensures no pending updates are left before adding a new product', () => {
                const pendingUpdates = [];
                expect(isEmpty(pendingUpdates)).toBe(true);
            });

            test('checks if new product tags are provided', () => {
                const tags = ['organic', 'local'];
                expect(isEmpty(tags)).toBe(false);
            });
        });

        describe('Scenario 3: Producer Modifying Existing Product', () => {
            test('checks for empty updates to a product', () => {
                const productUpdates = {};
                expect(isEmpty(productUpdates)).toBe(true);
            });

            test('recognizes non-empty updates to product details', () => {
                const productUpdates = { price: 4.99 };
                expect(isEmpty(productUpdates)).toBe(false);
            });

            test('verifies that update object is not empty when changing product name', () => {
                const nameUpdate = { name: 'Fresh Apples' };
                expect(isEmpty(nameUpdate)).toBe(false);
            });

            test('ensures that update information for stock quantity is not empty', () => {
                const stockUpdate = { stock: 100 };
                expect(isEmpty(stockUpdate)).toBe(false);
            });

            test('checks if discount information is empty when updating pricing', () => {
                const discountInfo = {};
                expect(isEmpty(discountInfo)).toBe(true);
            });

            test('confirms that update details are not empty for category change', () => {
                const categoryUpdate = { category: 'Organic Produce' };
                expect(isEmpty(categoryUpdate)).toBe(false);
            });

            test('validates non-empty update for adding additional product tags', () => {
                const tagUpdate = { tags: ['seasonal', 'limited edition'] };
                expect(isEmpty(tagUpdate)).toBe(false);
            });
        });
    });

});