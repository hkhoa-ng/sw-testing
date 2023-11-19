import toNumber from "../utils/toNumber";

describe('toNumber', () => {

    describe('Basic Functionalities', () => {

        test('converts a standard number', () => {
            expect(toNumber(42)).toEqual(42);
        });

        test('converts a string representation of a number', () => {
            expect(toNumber('3.14')).toEqual(3.14);
        });

        test('converts special numeric values', () => {
            expect(toNumber(Infinity)).toEqual(Infinity);
            expect(toNumber(Number.MIN_VALUE)).toEqual(5e-324);
        });

        test('converts negative numbers', () => {
            expect(toNumber(-123)).toEqual(-123);
        });

        test('converts string representation of negative numbers', () => {
            expect(toNumber('-45')).toEqual(-45);
        });

        test('converts hexadecimal string representations', () => {
            expect(toNumber('0x1A')).toEqual(26);
        });

        test('converts binary string representations', () => {
            expect(toNumber('0b1010')).toEqual(10);
        });

        test('converts octal string representations', () => {
            expect(toNumber('0o17')).toEqual(15);
        });

        test('converts scientific notation strings', () => {
            expect(toNumber('1e3')).toEqual(1000);
        });

        test('converts numbers in a string with leading and trailing spaces', () => {
            expect(toNumber('  100  ')).toEqual(100);
        });
    });

    describe('Edge Case Handling', () => {

        test('converts a boolean value to number', () => {
            expect(toNumber(true)).toEqual(1);
            expect(toNumber(false)).toEqual(0);
        });

        test('converts null to 0', () => {
            expect(toNumber(null)).toEqual(0);
        });

        test('returns NaN for undefined', () => {
            expect(toNumber(undefined)).toEqual(NaN);
        });

        test('returns NaN for non-numeric strings', () => {
            expect(toNumber('hello')).toEqual(NaN);
        });

        test('handles objects with valueOf method', () => {
            expect(toNumber({valueOf: () => 42})).toEqual(42);
        });

        test('returns NaN for objects without valueOf method', () => {
            expect(toNumber({})).toEqual(NaN);
        });

        test('handles symbols and returns NaN', () => {
            expect(toNumber(Symbol('test'))).toEqual(NaN);
        });

        test('handles arrays and returns NaN', () => {
            expect(toNumber([1, 2, 3])).toEqual(NaN);
        });

        test('handles function references and returns NaN', () => {
            expect(toNumber(() => {})).toEqual(NaN);
        });

        test('handles complex string representations', () => {
            expect(toNumber('3.14someRandomText')).toEqual(NaN);
            expect(toNumber('0x1G')).toEqual(NaN);
        });

        test('handles empty strings as 0', () => {
            expect(toNumber('')).toEqual(0);
        });

        test('returns original value if valueOf is null', () => {
            const objWithValueOfNull = {
                value: 42,
                valueOf: null
            };
            expect(toNumber(objWithValueOfNull)).toBe(objWithValueOfNull);
        });

        test('returns NAN for badly formed hexadecimal strings', () => {
            const badHexValue = '-0x14';
            expect(toNumber(badHexValue)).toBe(NaN);
        });

    });

    describe('Scenario Specific Tests', () => {
        describe('Scenario 1: User browsing, shopping, and making purchases', () => {

            test('converts string prices to numbers for calculation', () => {
                const stringPrice = '4.99';
                expect(toNumber(stringPrice)).toEqual(4.99);
            });

            test('handles unexpected string input in user-provided data', () => {
                const userQuantityInput = '5 apples';
                expect(toNumber(userQuantityInput)).toEqual(NaN);
            });

            test('converts numeric strings with currency symbols', () => {
                const priceWithSymbol = '$2.99';
                expect(toNumber(priceWithSymbol.replace(/[^0-9.]/g, ''))).toEqual(2.99);
            });

            test('interprets empty strings as zero in cart calculations', () => {
                const emptyInput = '';
                expect(toNumber(emptyInput)).toEqual(0);
            });

            test('handles mixed alphanumeric strings in promotional codes', () => {
                const promoCode = '20%OFF';
                expect(toNumber(promoCode.replace(/[^0-9.]/g, ''))).toEqual(20);
            });

            test('parses quantities from user input strings correctly', () => {
                const userQuantity = '3 kg';
                expect(toNumber(userQuantity.replace(/[^0-9.]/g, ''))).toEqual(3);
            });

            test('handles fractional quantities in user input', () => {
                const fractionalQuantity = '0.5 lb';
                expect(toNumber(fractionalQuantity)).toEqual(0.5);
            });

        });


        describe('Scenario 2: Producer Adding Products', () => {
            
            test('converts string-based weights to numeric for inventory management', () => {
                const stringWeight = '15.5';
                expect(toNumber(stringWeight)).toEqual(15.5);
            });

            test('converts string-based prices to numeric for pricing updates', () => {
                const stringPrice = '7.99';
                expect(toNumber(stringPrice)).toEqual(7.99);
            });

            test('handles non-numeric inputs in product quantity fields', () => {
                const quantityInput = 'approximately 30';
                expect(toNumber(quantityInput)).toEqual(NaN);
            });

            test('processes numeric strings with units in product dimensions', () => {
                const dimension = '25cm';
                expect(toNumber(dimension.replace(/[^0-9.]/g, ''))).toEqual(25);
            });

            test('interprets blank inputs as zero for unsupplied product data', () => {
                const blankInput = '';
                expect(toNumber(blankInput)).toEqual(0);
            });

            test('converts numeric strings in product batch numbers', () => {
                const batchNumber = 'Batch123';
                expect(toNumber(batchNumber.replace(/[^0-9.]/g, ''))).toEqual(123);
            });

            test('handles fractional quantities in bulk product entries', () => {
                const bulkQuantity = '0.75 ton';
                expect(toNumber(bulkQuantity)).toEqual(0.75);
            });

        });

        describe('Scenario 3: Producer Modifying Existing Product', () => {
    
            test('correctly updates numeric values in product prices', () => {
                const updatedPrice = '8.50';
                expect(toNumber(updatedPrice)).toEqual(8.50);
            });

            test('ensures updated product quantities are numeric', () => {
                const updatedQuantity = '50';
                expect(toNumber(updatedQuantity)).toEqual(50);
            });

            test('handles invalid numeric inputs in updated product data', () => {
                const invalidInput = 'ten boxes';
                expect(toNumber(invalidInput)).toEqual(NaN);
            });

            test('processes updated weight information from string to number', () => {
                const updatedWeight = '20 kg';
                expect(toNumber(updatedWeight.replace(/[^0-9.]/g, ''))).toEqual(20);
            });

            test('interprets empty strings as zero in product updates', () => {
                const emptyInput = '';
                expect(toNumber(emptyInput)).toEqual(0);
            });

            test('updates product dimensions with numeric conversion', () => {
                const dimension = 'Length: 30cm';
                expect(toNumber(dimension.replace(/[^0-9.]/g, ''))).toEqual(30);
            });

            test('handles non-standard numeric formats in special offers', () => {
                const specialOffer = 'Buy 3 get 1 free';
                expect(toNumber(specialOffer.match(/\d+/g).join('.'))).toEqual(3.1);
            });

        });

    });
});