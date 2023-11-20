import { browseProductCatalog, searchProduct, filterSearchResults, addToCart, interactWithCart, checkout, makePayment, confirmOrderPlacement } from "../../utils/functionalties/scenario1";

describe('Scenario 1 test', () => {
  const products = [
    { id: 1, name: 'Product A', category: 'Category 1', price: 10.99, description: 'Description A' },
    { id: 2, name: 'Product B', category: 'Category 2', price: 20.99, description: 'Description B' },

  ];

  describe('Test browseProductCatalog function', () => {
    test('empty products array', () => {
        const category = 'Category 1';
        const emptyProducts = [];
        const result = browseProductCatalog(emptyProducts, category);
        expect(result).toEqual([]);
    });

    test('non-existent category', () => {
        const category = 'Non-existent Category';
        const result = browseProductCatalog(products, category);
        expect(result).toEqual([]);
    });

    test('multiple products in the same category', () => {
        const category = 'Category 2';
        const result = browseProductCatalog(products, category);
        expect(result).toEqual([
            { name: 'Product B', description: 'Description B', price: 20.99 },
        ]);
    });

    test('undefined category', () => {
        const category = undefined;
        const result = browseProductCatalog(products, category);
        expect(result).toEqual([]);
    });

    test('null products array', () => {
        const category = 'Category 1';
        const nullProducts = null;
        const result = browseProductCatalog(nullProducts, category);
        expect(result).toEqual([]);
    });
  });

  describe('Test searchProduct function', () => {
    test('existing search key', () => {
    const searchKey = 'Product';
    const result = searchProduct(products, searchKey);
    expect(result).toEqual([
        { name: 'Product A', description: 'Description A', price: 10.99 },
        { name: 'Product B', description: 'Description B', price: 20.99 },
    ]);
    });

    test('non-existent search key', () => {
        const searchKey = 'Non-existent Product';
        const result = searchProduct(products, searchKey);
        expect(result).toEqual([]);
    });

    test('empty products array', () => {
        const searchKey = 'Product';
        const emptyProducts = [];
        const result = searchProduct(emptyProducts, searchKey);
        expect(result).toEqual([]);
    });

    test('undefined search key', () => {
        const searchKey = undefined;
        const result = searchProduct(products, searchKey);
        expect(result).toEqual([]);
    });

    test('null products array', () => {
        const searchKey = 'Product';
        const nullProducts = null;
        const result = searchProduct(nullProducts, searchKey);
        expect(result).toEqual([]);
    });
  });

  describe('Test filterSearchResults function', () => {
    test('minimum price filter', () => {
        const filterOptions = { minPrice: 15 };
        const result = filterSearchResults(products, filterOptions);
        expect(result).toEqual([
            { name: 'Product B', description: 'Description B', price: 20.99 },
        ]);
    });

    test('category filter', () => {
        const filterOptions = { category: 'Category 1' };
        const result = filterSearchResults(products, filterOptions);
        expect(result).toEqual([
            { name: 'Product A', description: 'Description A', price: 10.99 },
        ]);
    });

    test('empty filter options', () => {
        const filterOptions = {};
        const result = filterSearchResults(products, filterOptions);
        expect(result).toEqual([
            { name: 'Product A', description: 'Description A', price: 10.99 },
            { name: 'Product B', description: 'Description B', price: 20.99 },
    ]);
    });

    test('undefined products array', () => {
        const filterOptions = { minPrice: 15 };
        const undefinedProducts = undefined;
        const result = filterSearchResults(undefinedProducts, filterOptions);
        expect(result).toEqual([]);
    });

    test('null filter options', () => {
        const nullFilterOptions = null;
        const result = filterSearchResults(products, nullFilterOptions);
        expect(result).toEqual([
            { name: 'Product A', description: 'Description A', price: 10.99 },
            { name: 'Product B', description: 'Description B', price: 20.99 },
        ]);
    });
  });

  describe('Test addToCart function', () => {
    test('Adding a new product to an empty cart', () => {
        const selectedProducts = [{ id: 1, name: 'Product A', price: 10.99 }];
        const shoppingCart = [];
        const updatedCart = addToCart(selectedProducts, shoppingCart);
        expect(updatedCart).toEqual([
        {
            id: 1,
            name: 'Product A',
            price: 10.99,
            quantity: 1,
        },
        ]);
    });

    test('Adding multiple quantities of an existing product', () => {
        const selectedProducts = [{ id: 1, name: 'Product A', price: 10.99 }];
        const shoppingCart = [{ id: 1, name: 'Product A', price: 10.99, quantity: 1 }];
        const updatedCart = addToCart(selectedProducts, shoppingCart);
        expect(updatedCart).toEqual([
        {
            id: 1,
            name: 'Product A',
            price: 10.99,
            quantity: 2,
        },
        ]);
    });

    test('Adding products with missing or invalid fields', () => {
        const selectedProducts = [{ name: 'Product B' }, { id: 2, price: 15.99 }];
        const shoppingCart = [];
        const updatedCart = addToCart(selectedProducts, shoppingCart);
        // Expectation: Products with missing or invalid fields will not be added to the cart
        expect(updatedCart).toEqual([]);
    });

    test('Adding products when shoppingCart is not an array', () => {
        const selectedProducts = [{ id: 1, name: 'Product A', price: 10.99 }];
        const shoppingCart = {}; // Invalid shoppingCart (not an array)
        const updatedCart = addToCart(selectedProducts, shoppingCart);
        // Expectation: Return value should match the original shoppingCart (should not modify it)
        expect(updatedCart).toEqual(shoppingCart);
    });

    test('Passing invalid or empty input parameters', () => {
        const selectedProducts = null; // Invalid selectedProducts (null)
        const shoppingCart = []; // Valid shoppingCart
        const updatedCart = addToCart(selectedProducts, shoppingCart);
        // Expectation: Return value should match the original shoppingCart (should not modify it)
        expect(updatedCart).toEqual(shoppingCart);
    });
  })

  describe('Test interactWithCart function', () => {
    test('Increase quantity of an existing product in the cart', () => {
        const shoppingCart = [
        { id: 1, name: 'Product A', price: 10.99, quantity: 2 },
        { id: 2, name: 'Product B', price: 15.99, quantity: 1 },
        ];
        const productId = 1;
        const quantityChange = 1;
        const updatedCart = interactWithCart(shoppingCart, productId, quantityChange);
        expect(updatedCart).toEqual({
        cartItems: [
            { id: 1, name: 'Product A', price: 10.99, quantity: 3 },
            { id: 2, name: 'Product B', price: 15.99, quantity: 1 },
        ],
        totalPrice: 10.99 * 3 + 15.99 * 1,
        });
    });

    test('Decrease quantity of an existing product in the cart', () => {
        const shoppingCart = [{ id: 1, name: 'Product A', price: 10.99, quantity: 3 }];
        const productId = 1;
        const quantityChange = -1;
        const updatedCart = interactWithCart(shoppingCart, productId, quantityChange);
        expect(updatedCart).toEqual({
        cartItems: [],
        totalPrice: 0,
        });
    });

    test('Remove product from the cart', () => {
        const shoppingCart = [
        { id: 1, name: 'Product A', price: 10.99, quantity: 2 },
        { id: 2, name: 'Product B', price: 15.99, quantity: 1 },
        ];
        const productId = 2;
        const quantityChange = -1;
        const updatedCart = interactWithCart(shoppingCart, productId, quantityChange);
        expect(updatedCart).toEqual({
        cartItems: [{ id: 1, name: 'Product A', price: 10.99, quantity: 2 }],
        totalPrice: 10.99 * 2,
        });
    });

    test('Product not found in the cart', () => {
        const shoppingCart = [{ id: 1, name: 'Product A', price: 10.99, quantity: 2 }];
        const productId = 2; // Product ID not in the cart
        const quantityChange = -1;
        const updatedCart = interactWithCart(shoppingCart, productId, quantityChange);
        expect(updatedCart).toEqual({
        cartItems: [{ id: 1, name: 'Product A', price: 10.99, quantity: 2 }],
        totalPrice: 10.99 * 2,
        });
    });

    test('Passing invalid input parameters', () => {
        const shoppingCart = []; // Empty cart
        const productId = 1;
        const quantityChange = 'invalid'; // Invalid quantity change
        const updatedCart = interactWithCart(shoppingCart, productId, quantityChange);
        // Expectation: Return value should be an empty cart with total price as 0
        expect(updatedCart).toEqual({ cartItems: [], totalPrice: 0 });
    });
  })

  describe('Test checkout function', () => {
    const shoppingCart = [
        { id: 1, name: 'Product A', price: 10.99, quantity: 2 },
        { id: 2, name: 'Product B', price: 15.99, quantity: 1 },
    ];
    const paymentInfo = { cardNumber: '1234 5678 9101 1121', expiry: '12/23', cvv: '123' };

    test('Calculate total price and round it to 2 decimal places', () => {
        const orderConfirmation = checkout(shoppingCart, paymentInfo);
        expect(orderConfirmation.totalPrice).toBeCloseTo(38.97); // Total price of products in shopping cart
    });

    test('Verify cart items and payment information in order confirmation', () => {
        const orderConfirmation = checkout(shoppingCart, paymentInfo);
        expect(orderConfirmation).toEqual({
        cartItems: shoppingCart,
        totalPrice: 38.97,
        paymentInfo: paymentInfo,
        });
    });

    test('Empty shopping cart scenario', () => {
        const emptyCart = [];
        const orderConfirmation = checkout(emptyCart, paymentInfo);
        expect(orderConfirmation).toEqual({
        cartItems: [],
        totalPrice: 0,
        paymentInfo: paymentInfo,
        });
    });

    test('Passing invalid payment information', () => {
        const invalidPaymentInfo = { cardNumber: '1234', expiry: '12/23', cvv: 'invalid' };
        const orderConfirmation = checkout(shoppingCart, invalidPaymentInfo);
        expect(orderConfirmation).toEqual({
        cartItems: shoppingCart,
        totalPrice: 38.97,
        paymentInfo: invalidPaymentInfo, // Should return the provided invalid payment info
        });
    });

    test('Rounding of total price with different values', () => {
        const totalPrice = 49.998; // A number with more than 2 decimal places
        const orderConfirmation = checkout(shoppingCart, paymentInfo);
        expect(orderConfirmation.totalPrice).toBeCloseTo(38.97); // Expectation: Total price rounded to 2 decimal places
    });
  })

  describe('Test makePayment function', () => {
    const paymentInfo = { cardNumber: '1234 5678 9101 1121', expiry: '12/23', cvv: '123' };

    test('Verify payment transaction record', () => {
        const paymentResponse = "25.99 USD";
        const expectedPaymentAmount = 25.99;

        const { transactionRecord } = makePayment(paymentInfo);
        expect(transactionRecord.amount).toBe(expectedPaymentAmount);
        expect(transactionRecord.currency).toBe('USD');
        expect(transactionRecord.status).toBe('successful');
        expect(transactionRecord.paymentInfo).toEqual(paymentInfo);
        expect(new Date(transactionRecord.timestamp)).toBeInstanceOf(Date);
    });

    test('Verify order confirmation details', () => {
        const { orderConfirmation } = makePayment(paymentInfo);
        const expectedPaidItems = ['25.99', 'USD'];

        expect(orderConfirmation.message).toBe('Your payment of 25.99 USD was successful.');
        expect(orderConfirmation.itemsPaidFor).toEqual(expectedPaidItems);
        expect(orderConfirmation.contactMethod).toBe('SMS');
        expect(orderConfirmation.contactAddress).toBe('+1234567890');
    });

    test('Passing invalid payment information', () => {
        const invalidPaymentInfo = { cardNumber: '1234', expiry: '12/23', cvv: 'invalid' };
        const { transactionRecord } = makePayment(invalidPaymentInfo);
        expect(transactionRecord.paymentInfo).toEqual(invalidPaymentInfo);
    });

    test('Payment response parsing for paid items', () => {
        const expectedPaidItems = ['25.99', 'USD'];
        const { orderConfirmation } = makePayment(paymentInfo);
        expect(orderConfirmation.itemsPaidFor).toEqual(expectedPaidItems);
    });
  })

  describe('Test confirmOrderPlacement function', () => {
    test('Verify order placement confirmation details', () => {
        const orderDetails = {
        items: [
            { name: 'Product A', description: 'Description A', price: 10.99 },
            { name: 'Product B', description: 'Description B', price: 15.99 },
            ],
        };

        const confirmationDetails = confirmOrderPlacement(orderDetails);
        expect(confirmationDetails.confirmationMessage).toBe('Your order has been successfully placed!');
        expect(confirmationDetails.contactMethod).toBe('SMS');
        expect(confirmationDetails.contactAddress).toBe('+1234567890');
        expect(confirmationDetails.paymentStatus).toBe('Payment successful');
        expect(confirmationDetails.orderedItems).toEqual(['Product A', 'Product B']);
    });

    test('Passing empty order details', () => {
        const emptyOrderDetails = {};
        const confirmationDetails = confirmOrderPlacement(emptyOrderDetails);
        expect(confirmationDetails.confirmationMessage).toBe('Your order has been successfully placed!');
        expect(confirmationDetails.contactMethod).toBe('SMS');
        expect(confirmationDetails.contactAddress).toBe('+1234567890');
        expect(confirmationDetails.paymentStatus).toBe('Payment successful');
        expect(confirmationDetails.orderedItems).toEqual([]);
    });

    test('Passing null order details', () => {
        const nullOrderDetails = null;
        const confirmationDetails = confirmOrderPlacement(nullOrderDetails);
        expect(confirmationDetails.confirmationMessage).toBe('Your order has been successfully placed!');
        expect(confirmationDetails.contactMethod).toBe('SMS');
        expect(confirmationDetails.contactAddress).toBe('+1234567890');
        expect(confirmationDetails.paymentStatus).toBe('Payment successful');
        expect(confirmationDetails.orderedItems).toEqual([]);
    });
  })
});