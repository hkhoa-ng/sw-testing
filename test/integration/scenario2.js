import { producerLogin, addNewProduct, requestTransmission, validateProductInfo, addProductToDatabase, showProductAdditionConfirmation } from "../../utils/functionalties/scenario2";

describe('Scenario 2 test', () => {
    describe('producerLogin function', () => {
        const validCredentials = [
            { email: 'producer1@example.com', password: 'password123' },
            { email: 'producer2@example.com', password: 'securePass' },
        ];

        const invalidCredentials = [
            { email: '', password: '' },
            { email: 'invalid@example.com', password: 'wrongPassword' },
        ];

        test('Logging in with valid credentials', () => {
            validCredentials.forEach(({ email, password }) => {
            const { success, message } = producerLogin(email, password);
            expect(success).toBe(true);
            expect(message).toBe('Login successful. Access granted.');
            });
        });

        test('Logging in with invalid credentials', () => {
            invalidCredentials.forEach(({ email, password }) => {
            const { success, message } = producerLogin(email, password);
            expect(success).toBe(false);
            expect(message).toBe('Invalid credentials');
            });
        });

        test('Empty email or password', () => {
            const { success, message } = producerLogin('', 'password');
            expect(success).toBe(false);
            expect(message).toBe('Invalid credentials');
        });

        test('No credentials provided', () => {
            const { success, message } = producerLogin();
            expect(success).toBe(false);
            expect(message).toBe('Invalid credentials');
        });

        test('No password provided', () => {
            const { success, message } = producerLogin('producer1@example.com');
            expect(success).toBe(false);
            expect(message).toBe('Invalid credentials');
        });

        test('No email provided', () => {
            const { success, message } = producerLogin('', 'password123');
            expect(success).toBe(false);
            expect(message).toBe('Invalid credentials');
        });

        test('No email and password provided', () => {
            const { success, message } = producerLogin();
            expect(success).toBe(false);
            expect(message).toBe('Invalid credentials');
        });
    });

    describe('addNewProduct function', () => {
        let productsDatabase = [];

        beforeEach(() => {
            // Reset productsDatabase before each test
            productsDatabase = [
                {
                    name: 'Apple',
                    description: 'A delicious fruit',
                    category: 'Fruit',
                    price: 1.5,
                    quantity: 10,
                },
                {
                    name: 'Orange',
                    description: 'A juicy citrus fruit',
                    category: 'Fruit',
                    price: 2.0,
                    quantity: 8,
                },
            ];
        });

        test('Adding a new product with valid information', () => {
            const productInfo = {
            name: 'Product A',
            description: 'Description of Product A',
            category: 'Category 1',
            price: '10.99',
            };

            const result = addNewProduct(productInfo, productsDatabase);
            expect(result.success).toBe(true);
            expect(result.message).toBe('Product added successfully.');
            expect(productsDatabase.length).toBe(1);

            const addedProduct = productsDatabase[0];
            expect(addedProduct.name).toBe('Product A');
            expect(addedProduct.description).toBe('Description of Product A');
            expect(addedProduct.category).toBe('Category 1');
            expect(addedProduct.price).toBe(10.99);
        });

        test('Adding a new product with missing required fields', () => {
            const productInfo = {
             name : 'test',
             category: 'test'
            };

            const result = addNewProduct(productInfo, productsDatabase);
            expect(result.success).toBe(false);
            expect(result.message).toBe('Missing required fields.');
            expect(productsDatabase.length).toBe(0);
        });

    });

    describe('requestTransmission function', () => {
        test('Transmitting valid product data', () => {
            const productData = {
            name: 'Banana',
            description: 'A tropical fruit',
            category: 'Fruit',
            price: '1.25',
            };

            const result = requestTransmission(productData);
            expect(result.success).toBe(true);
            expect(result.message).toBe('Product added to the database.');
        });

        test('Transmitting product data with missing fields', () => {
            const productData = {
            name: 'test'
            };

            const result = requestTransmission(productData);
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid product data.');
        });

        test('Transmitting product data with invalid price format', () => {
            const productData = {
            name: 'Mango',
            description: 'A juicy fruit',
            category: 'Fruit',
            price: 'InvalidPrice', // Invalid price format
            };

            const result = requestTransmission(productData);
            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid product data.');
        });

        test('Transmitting product data with error in processing', () => {
            const productData = {
            name: 'Apple',
            description: 'A delicious fruit',
            category: 'Fruit',
            price: '1.5',
            };
            jest.spyOn(console, 'error').mockImplementation(() => {});
            jest.spyOn(global, 'toNumber').mockImplementation(() => {
            throw new Error('Simulated error');
            });

            const result = requestTransmission(productData);
            expect(result.success).toBe(false);
            expect(result.message).toBe('Error processing product data.');

            console.error.mockRestore();
            global.toNumber.mockRestore();
        });
    });

    describe('validateProductInfo function', () => {
        test('Validating product info with all required fields', () => {
            const productInfo = {
            name: 'Apple',
            description: 'A delicious fruit',
            category: 'Fruit',
            price: 1.5,
            createdDate: new Date(),
            images: ['image1.jpg', 'image2.jpg'],
            };

            const result = validateProductInfo(productInfo);
            expect(result.valid).toBe(true);
            expect(result.message).toBe('Product information is valid.');
        });

        test('Validating product info with missing required fields', () => {
            const productInfo = {
            'name': 'test'
            };

            const result = validateProductInfo(productInfo);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Required fields cannot be empty.');
        });

        test('Validating product info with invalid price', () => {
            const productInfo = {
            name: 'Banana',
            description: 'A tropical fruit',
            category: 'Fruit',
            price: 'InvalidPrice', // Invalid price format
            createdDate: new Date(),
            images: ['image1.jpg', 'image2.jpg'],
            };

            const result = validateProductInfo(productInfo);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Price should be a valid number greater than 0.');
        });

        test('Validating product info with invalid createdDate format', () => {
            const productInfo = {
            name: 'Mango',
            description: 'A juicy fruit',
            category: 'Fruit',
            price: 1.75,
            createdDate: 'InvalidDate', // Invalid createdDate format
            images: ['image1.jpg', 'image2.jpg'],
            };

            const result = validateProductInfo(productInfo);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Invalid createdDate format.');
        });

        test('Validating product info with invalid images format', () => {
            const productInfo = {
            name: 'Grapes',
            description: 'A bunch of grapes',
            category: 'Fruit',
            price: 2.25,
            createdDate: new Date(),
            images: 'InvalidImages', // Invalid images format
            };

            const result = validateProductInfo(productInfo);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Images should be an array-like object.');
        });

        test('Validating product info with error in validation', () => {
            const productInfo = {
            name: 'Orange',
            description: 'A citrus fruit',
            category: 'Fruit',
            price: 1.99,
            createdDate: new Date(),
            images: ['image1.jpg', 'image2.jpg'],
            };

            // Simulate an error while validating
            jest.spyOn(console, 'error').mockImplementation(() => {});
            jest.spyOn(global, 'isDate').mockImplementation(() => {
            throw new Error('Simulated error');
            });

            const result = validateProductInfo(productInfo);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Error in validating product information.');

            // Restore mock implementation
            console.error.mockRestore();
            global.isDate.mockRestore();
        });
    });

    describe('addProductToDatabase function', () => {
        test('Adding a product to the database', () => {
            const productDetails = {
            name: 'Apple',
            description: 'A delicious fruit',
            category: 'Fruit',
            price: 1.5,
            quantity: 10,
            // Other product details...
            };

            const mockDb = {
            insert: jest.fn((tableName, data) => {
                console.log(`Mock adding product to table ${tableName}:`, data);
            }),
            };

            addProductToDatabase(productDetails, mockDb);
            expect(mockDb.insert).toHaveBeenCalledWith('products', {
            name: 'Apple',
            description: 'A delicious fruit',
            category: 'Fruit',
            price: 1.5,
            quantity: 11, // Expecting quantity to be increased by 1
            // Other product details...
            });
        });
    });

    describe('showProductAdditionConfirmation function', () => {
        test('Display product addition confirmation', () => {
            const productDetails = {
            name: 'Apple',
            description: 'A delicious fruit',
            category: 'Fruit',
            price: 1.5,
            quantity: 10,
            };

            const confirmationMessage = showProductAdditionConfirmation(productDetails);
            expect(confirmationMessage).toBe('Apple');
        });

        test('Display default confirmation message for missing product name', () => {
            const productDetails = {
            description: 'A delicious fruit',
            category: 'Fruit',
            price: 1.5,
            quantity: 10,
            };

            const confirmationMessage = showProductAdditionConfirmation(productDetails);
            expect(confirmationMessage).toBe('New Product');
        });

    });
})