import eq from "../utils/eq";

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

    describe('Scenario Specific Tests', () => {
        describe('Scenario 1: User browsing, shopping, and making purchases', () => {
            test('compares user-selected product IDs for equality', () => {
                expect(eq(101, 101)).toBe(true);
                expect(eq(101, 102)).toBe(false);
            });

            test('compares user selection to an undefined product ID', () => {
                const selectedProductId = 103;
                const undefinedProductId = undefined;
                expect(eq(selectedProductId, undefinedProductId)).toBe(false);
            });

            test('compares two different types of product IDs', () => {
                const numericProductId = 104;
                const stringProductId = "104";
                expect(eq(numericProductId, stringProductId)).toBe(true);
            });

            test('compares selected product ID with null', () => {
                const selectedProductId = 105;
                expect(eq(selectedProductId, null)).toBe(false);
            });

            test('compares two similar looking product IDs of different types', () => {
                const intProductId = 106;
                const floatProductId = 106.0;
                expect(eq(intProductId, floatProductId)).toBe(true);
            });

            test('compares product ID to a boolean value', () => {
                const productId = 107;
                expect(eq(productId, true)).toBe(false);
            });
        });

        describe('Scenario 2: Producer Adding Products', () => {
            test('compares newly added product ID to existing IDs', () => {
                const existingProductId = 200;
                const newProductId = 201;
                expect(eq(existingProductId, newProductId)).toBe(false);
            });

            test('compares identical new product IDs for consistency', () => {
                const newProductId1 = 202;
                const newProductId2 = 202;
                expect(eq(newProductId1, newProductId2)).toBe(true);
            });

            test('compares new product ID to null', () => {
                const newProductId = 203;
                expect(eq(newProductId, null)).toBe(false);
            });

            test('validates non-equivalence of new product ID and undefined', () => {
                const newProductId = 204;
                expect(eq(newProductId, undefined)).toBe(false);
            });

            test('compares new product ID with a string representation', () => {
                const numericProductId = 205;
                const stringProductId = "205";
                expect(eq(numericProductId, stringProductId)).toBe(true);
            });

            test('checks for NaN comparison in new product IDs', () => {
                const newProductId = NaN;
                expect(eq(newProductId, NaN)).toBe(true);
            });
        });

        describe('Scenario 3: Producer Modifying Existing Product', () => {
            test('compares original and updated product prices for equality', () => {
                const originalPrice = 14.99;
                const updatedPrice = 14.99;
                expect(eq(originalPrice, updatedPrice)).toBe(true);
            });

            test('validates inequality between original and increased product prices', () => {
                const originalPrice = 14.99;
                const increasedPrice = 15.99;
                expect(eq(originalPrice, increasedPrice)).toBe(false);
            });

            test('compares original and decreased product prices for inequality', () => {
                const originalPrice = 14.99;
                const decreasedPrice = 13.99;
                expect(eq(originalPrice, decreasedPrice)).toBe(false);
            });

            test('checks equality between unchanged product names', () => {
                const originalName = 'Organic Apple';
                const updatedName = 'Organic Apple';
                expect(eq(originalName, updatedName)).toBe(true);
            });

            test('validates non-equivalence of modified product categories', () => {
                const originalCategory = 'Fruits';
                const newCategory = 'Organic Fruits';
                expect(eq(originalCategory, newCategory)).toBe(false);
            });

            test('compares updated product quantity to null for inequality', () => {
                const updatedQuantity = 100;
                expect(eq(updatedQuantity, null)).toBe(false);
            });

            test('assesses whether an updated and a string representation of the same number are equivalent', () => {
                const numericValue = 20;
                const stringValue = "20";
                expect(eq(numericValue, stringValue)).toBe(true);
            });
        });
    })
})
