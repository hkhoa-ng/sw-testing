import { producerLogin, addNewProduct, requestTransmission, validateProductInfo, addProductToDatabase, showProductAdditionConfirmation } from "../../utils/functionalties/scenario2";
import {mockProducerCredentials} from '../integration/mock/producerCredential'
import { mockProducts } from "./mock/products";
describe('Scenario 2 test', () => {
    describe('producerLogin function', () => {
        const validCredentials = mockProducerCredentials;

        const invalidCredentials = [
            { email: '', password: '' },
            { email: 'invalid@example.com', password: 'wrongPassword' },
        ];

        test('Logging in with valid credentials', () => {
            validCredentials.forEach(({ email, password }) => {
            const { success, message } = producerLogin(email, password, validCredentials);
            expect(success).toBe(true);
            expect(message).toBe('Login successful. Access granted.');
            });
        });

        test('Logging in with invalid credentials', () => {
            invalidCredentials.forEach(({ email, password }) => {
            const { success, message } = producerLogin(email, password, validCredentials);
            expect(success).toBe(false);
            expect(message).toBe('Invalid credentials');
            });
        });

        test('Empty email or password', () => {
            const { success, message } = producerLogin('', 'password', validCredentials);
            expect(success).toBe(false);
            expect(message).toBe('Invalid credentials');
        });

        test('No credentials provided', () => {
            const { success, message } = producerLogin(undefined, undefined, validCredentials);
            expect(success).toBe(false);
            expect(message).toBe('Invalid credentials');
        });

        test('No password provided', () => {
            const { success, message } = producerLogin('producer1@example.com', undefined, validCredentials);
            expect(success).toBe(false);
            expect(message).toBe('Invalid credentials');
        });

        test('No email provided', () => {
            const { success, message } = producerLogin('', 'password123', validCredentials);
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
            productsDatabase = mockProducts
        });

        test('Adding a new product with valid information', () => {
            const productInfo = {
                name: 'Product An',
                description: 'Description of Product A',
                category: ['Category 1'],
                price: '10.99',
            };

            const result = addNewProduct(productInfo, productsDatabase);
            expect(result.success).toBe(true);
            expect(result.message).toBe('Product added successfully.');
            expect(result.productsDatabase.length).toBe(productsDatabase.length +1);

            const addedProduct = result.productsDatabase[result.productsDatabase.length - 1];
            expect(addedProduct.name).toBe('Product an');
            expect(addedProduct.description).toBe('Description of Product A');
            expect(addedProduct.category).toEqual(['Category 1']);
            expect(addedProduct.price).toBe(10.99);
            expect(addedProduct.quantity).toBe(1);
        });

        test('Adding a new product with missing required fields', () => {
            const productInfo = {
             name : 'test',
             category: 'test'
            };

            const result = addNewProduct(productInfo, productsDatabase);
            expect(result.success).toBe(false);
            expect(result.message).toBe('Missing required fields.');
            expect(result.productsDatabase).toEqual(productsDatabase);
        });

    });

    describe('requestTransmission function', () => {
        test('Transmitting valid product data', () => {
            const productData = {
                name: 'Banana',
                description: 'A tropical fruit',
                category: ['Fruit'],
                price: 1.25,
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
    });

    describe('validateProductInfo function', () => {
        test('Validating product info with all required fields', () => {
            const productInfo = {
                name: 'Apple1',
                description: 'A delicious fruit',
                category: ['Fruit'],
                price: 1.5,
                quantity: 5
            };

            const result = validateProductInfo(productInfo);
            expect(result.valid).toBe(true);
            expect(result.message).toBe('Product information is valid.');
        });

        test('Validating product info with missing required fields', () => {
            const productInfo = {
                name: 'test'
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
                price: 'InvalidPrice',
            };

            const result = validateProductInfo(productInfo);
            expect(result.valid).toBe(false);
            expect(result.message).toBe('Price should be a valid number greater than 0.');
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
                quantity: 11,
            });
        });
    });

    describe('showProductAdditionConfirmation function', () => {
        test('Display product addition confirmation', () => {
            const productDetails = {
            name: 'Apple1',
            description: 'A delicious fruit',
            category: ['Fruit'],
            price: 1.5,
            quantity: 10,
            };

            const confirmationMessage = showProductAdditionConfirmation(productDetails);
            expect(confirmationMessage).toBe('Apple1');
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