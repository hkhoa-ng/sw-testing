import ceil from "../utils/ceil";

describe('ceil function', () => {

    describe('Basic Functionalities', () => {
        test('rounds up a simple decimal', () => {
            expect(ceil(4.006)).toEqual(5);
        });

        test('rounds up with specified precision', () => {
            expect(ceil(6.004, 2)).toEqual(6.01);
        });

        test('rounds up with negative precision', () => {
            expect(ceil(6040, -2)).toEqual(6100);
        });

        test('handles zero precision', () => {
            expect(ceil(4.006, 0)).toEqual(5);
        });

        test('handles integers without change', () => {
            expect(ceil(5)).toEqual(5);
        });

        test('rounds up negative numbers', () => {
            expect(ceil(-4.2)).toEqual(-4);
        });

        test('rounds up negative numbers with precision', () => {
            expect(ceil(-4.006, 2)).toEqual(-4.00);
        });
    });

    describe('Edge Case Handling', () => {
        test('handles undefined input', () => {
            expect(ceil(undefined)).toBeNaN();
        });

        test('handles null input', () => {
            expect(ceil(null)).toEqual(0);
        });

        test('handles non-numeric strings', () => {
            expect(ceil('abc')).toBeNaN();
        });

        test('handles numeric string input', () => {
            expect(ceil('5.2')).toEqual(6);
        });

        test('handles extreme large numbers', () => {
            expect(ceil(1e21)).toEqual(1e21);
        });

        test('handles extreme small decimal numbers', () => {
            expect(ceil(0.0000001, 7)).toEqual(0.0000001);
        });

        test('handles Infinity', () => {
            expect(ceil(Infinity)).toEqual(Infinity);
        });

        test('handles negative Infinity', () => {
            expect(ceil(-Infinity)).toEqual(-Infinity);
        });

        test('handles NaN', () => {
            expect(ceil(NaN)).toBeNaN();
        });

        test('handles precision beyond safe integer limit', () => {
            expect(ceil(10.123456789012345, 16)).toBe(10.123456789012345);
        });
    });

    describe('Scenario Specific Tests', () => {
        describe('Scenario 1: User browsing, shopping, and making purchases', () => {
            test('rounds up tax calculations on purchases', () => {
                const taxAmount = 7.891;
                expect(ceil(taxAmount, 2)).toEqual(7.90);
            });

            test('rounds up shipping costs', () => {
                const shippingCost = 3.333;
                expect(ceil(shippingCost, 0)).toEqual(4);
            });

            test('rounds up total cost for a group of items', () => {
                const itemTotal = 48.762;
                expect(ceil(itemTotal, 0)).toEqual(49);
            });

            test('rounds up loyalty points earned from a purchase', () => {
                const points = 123.456;
                expect(ceil(points, 0)).toEqual(124);
            });
        });

        describe('Scenario 2: Producer Adding Products', () => {
            test('rounds up calculated profit margin for a new product', () => {
                const profitMargin = 33.333;
                expect(ceil(profitMargin, 1)).toEqual(33.4);
            });

            test('rounds up the wholesale price for bulk orders', () => {
                const wholesalePrice = 299.999;
                expect(ceil(wholesalePrice, 0)).toEqual(300);
            });

            test('rounds up estimated production costs per unit', () => {
                const productionCost = 15.1234;
                expect(ceil(productionCost, 2)).toEqual(15.13);
            });

            test('rounds up the minimum sale price to maintain profit', () => {
                const salePrice = 45.6789;
                expect(ceil(salePrice, 1)).toEqual(45.7);
            });

            test('rounds up the calculated discount rate for promotions', () => {
                const discountRate = 22.222;
                expect(ceil(discountRate, 0)).toEqual(23);
            });
        });

        describe('Scenario 3: Producer Modifying Existing Product', () => {
            test('rounds up revised retail price after updating product', () => {
                const revisedPrice = 49.995;
                expect(ceil(revisedPrice, 2)).toEqual(50.00);
            });

            test('rounds up recalculated shipping costs', () => {
                const shippingCost = 7.128;
                expect(ceil(shippingCost, 1)).toEqual(7.2);
            });

            test('rounds up adjusted production cost per unit', () => {
                const adjustedCost = 10.499;
                expect(ceil(adjustedCost, 1)).toEqual(10.5);
            });

            test('rounds up increased warranty period for premium products', () => {
                const warrantyPeriod = 2.75;
                expect(ceil(warrantyPeriod, 0)).toEqual(3);
            });

            test('rounds up updated discount percentage for sales events', () => {
                const discountPercentage = 15.123;
                expect(ceil(discountPercentage, 0)).toEqual(16);
            });
        });
    });
});
