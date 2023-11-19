import words from "../utils/words";

describe('words', () => {

    describe('Basic functionalities', () => {
        test('splits a simple ASCII string into words', () => {
            expect(words('Hello world')).toEqual(['Hello', 'world']);
        });

        test('splits a Unicode string into words', () => {
            expect(words('Привет мир')).toEqual(['Привет', 'мир']); // Example in Russian
        });

        test('handles mixed ASCII and Unicode strings', () => {
            expect(words('Hello Привет 123')).toEqual(['Hello', 'Привет', '123']);
        });

        test('ignores punctuation', () => {
            expect(words('Hello, world!')).toEqual(['Hello', 'world']);
        });

        test('handles strings with numbers', () => {
            expect(words('abc123 456def')).toEqual(['abc', '123', '456', 'def']);
        });

        test('splits strings with camelCase', () => {
            expect(words('camelCaseString')).toEqual(['camel', 'Case', 'String']);
        });

        test('handles strings with hyphens and underscores', () => {
            expect(words('hyphen-separated_word')).toEqual(['hyphen', 'separated', 'word']);
        });

        test('works with custom pattern', () => {
            expect(words('fred, barney, & pebbles', /[^, ]+/g)).toEqual(['fred', 'barney', '&', 'pebbles']);
        });

        test('splits strings containing apostrophes correctly', () => {
            expect(words("I'm learning JavaScript")).toEqual(["I'm", 'learning', 'JavaScript']);
        });

        test('handles empty strings', () => {
            expect(words('')).toEqual([]);
        });
    });

describe('Edge Case Handling', () => {
        test('handles strings with only punctuation and spaces', () => {
            expect(words('!@#$%^&*()')).toEqual([]);
        });

        test('splits strings containing emojis correctly', () => {
            expect(words('Hello 👋 World 🌍')).toEqual(['Hello', '👋', 'World', '🌍']);
        });

        test('handles strings with complex unicode characters', () => {
            expect(words('你好，世界')).toEqual(['你好', '世界']); // Example in Chinese
        });

        test('manages strings with various types of whitespace', () => {
            expect(words('Hello\tworld\nnew line')).toEqual(['Hello', 'world', 'new', 'line']);
        });

        test('processes strings with consecutive punctuation marks', () => {
            expect(words('Hello... world!!!')).toEqual(['Hello', 'world']);
        });

        test('handles strings with only numbers and punctuation', () => {
            expect(words('123, 456.78!')).toEqual(['123', '456', '78']);
        });

        test('manages strings with no alphabetic characters', () => {
            expect(words('1234 5678')).toEqual(['1234', '5678']);
        });

        test('processes strings with non-standard characters', () => {
            expect(words('√abcd ©def')).toEqual(['abcd', 'def']);
        });

        test('handles strings with special characters and numbers', () => {
            expect(words('$100,000,000')).toEqual(['100', '000', '000']);
        });

        test('manages empty input gracefully', () => {
            expect(words()).toEqual([]);
        });

          test('Returns an empty array when string.match(pattern) returns null', () => {
            const inputString = 'example string without matching pattern';
            const pattern = /[A-Z]/g;
            const result = words(inputString, pattern);
            expect(result).toEqual([]);
        });
    });

    describe('Scenario Specific Tests', () => {
        describe('Scenario 1: User browsing, shopping, and making purchases', () => {
            test('extracts words from simple fruit descriptions', () => {
                const description = "Fresh Organic Apples";
                expect(words(description)).toEqual(['Fresh', 'Organic', 'Apples']);
            });

            test('handles vegetable descriptions with special characters', () => {
                const description = "Crisp Lettuce - Green & Fresh";
                expect(words(description)).toEqual(['Crisp', 'Lettuce', 'Green', 'Fresh']);
            });

            test('processes descriptions with numbers and units for bulk items', () => {
                const description = "Carrots, 2kg Pack";
                expect(words(description)).toEqual(['Carrots', '2kg', 'Pack']);
            });

            test('manages descriptions of exotic fruits', () => {
                const description = "Dragon Fruit (Pitaya)";
                expect(words(description)).toEqual(['Dragon', 'Fruit', 'Pitaya']);
            });

            test('extracts words from detailed vegetable descriptions', () => {
                const description = "Organically Grown Spinach - Pesticide Free";
                expect(words(description)).toEqual(['Organically', 'Grown', 'Spinach', 'Pesticide', 'Free']);
            });

            test('handles mixed-case descriptions for herbs', () => {
                const description = "Aromatic Fresh Basil Leaves";
                expect(words(description)).toEqual(['Aromatic', 'Fresh', 'Basil', 'Leaves']);
            });

            test('processes descriptions with hyphenated words for specialty items', () => {
                const description = "Sun-Dried Tomatoes in Olive Oil";
                expect(words(description)).toEqual(['Sun', 'Dried', 'Tomatoes', 'in', 'Olive', 'Oil']);
            });
        });

        describe('Scenario 2: Producer Adding Products', () => {
            test('extracts words from a basic product title', () => {
                const title = "Heirloom Tomatoes";
                expect(words(title)).toEqual(['Heirloom', 'Tomatoes']);
            });

            test('handles product titles with variety names', () => {
                const title = "Valencia Oranges - Sweet and Juicy";
                expect(words(title)).toEqual(['Valencia', 'Oranges', 'Sweet', 'and', 'Juicy']);
            });

            test('processes detailed product descriptions', () => {
                const description = "Red Potatoes, Perfect for Mashing and Roasting";
                expect(words(description)).toEqual(['Red', 'Potatoes', 'Perfect', 'for', 'Mashing', 'and', 'Roasting']);
            });

            test('manages descriptions with weight and packaging details', () => {
                const description = "Mixed Nuts, 500g - Vacuum Sealed";
                expect(words(description)).toEqual(['Mixed', 'Nuts', '500g', 'Vacuum', 'Sealed']);
            });

            test('handles complex descriptions with health claims', () => {
                const description = "Low-Fat Greek Yogurt - Rich in Protein & Probiotics";
                expect(words(description)).toEqual(['Low', 'Fat', 'Greek', 'Yogurt', 'Rich', 'in', 'Protein', 'Probiotics']);
            });

            test('processes product names with geographical indications', () => {
                const name = "Kalamata Olives - Imported from Greece";
                expect(words(name)).toEqual(['Kalamata', 'Olives', 'Imported', 'from', 'Greece']);
            });

            test('extracts words from seasonal product announcements', () => {
                const announcement = "Spring Harvest: Fresh Asparagus Available!";
                expect(words(announcement)).toEqual(['Spring', 'Harvest', 'Fresh', 'Asparagus', 'Available']);
            });

            test('manages product updates with special offers', () => {
                const update = "Weekly Special: Organic Honey, 20% Off";
                expect(words(update)).toEqual(['Weekly', 'Special', 'Organic', 'Honey', '20', 'Off']);
            });
        });

        describe('Scenario 3: Producer Modifying Existing Product', () => {
            test('extracts words from updated product titles', () => {
                const updatedTitle = "Premium Organic Blueberries - Larger Pack";
                expect(words(updatedTitle)).toEqual(['Premium', 'Organic', 'Blueberries', 'Larger', 'Pack']);
            });

            test('handles modifications in product descriptions', () => {
                const updatedDescription = "Whole Grain Oats - Now Gluten-Free";
                expect(words(updatedDescription)).toEqual(['Whole', 'Grain', 'Oats', 'Now', 'Gluten', 'Free']);
            });

            test('processes additional health benefits added to descriptions', () => {
                const additionalInfo = "Contains Vitamin D and Calcium for Bone Health";
                expect(words(additionalInfo)).toEqual(['Contains', 'Vitamin', 'D', 'and', 'Calcium', 'for', 'Bone', 'Health']);
            });

            test('manages updated packaging and quantity details', () => {
                const packagingUpdate = "Eco-Friendly Packaging - 250g";
                expect(words(packagingUpdate)).toEqual(['Eco', 'Friendly', 'Packaging', '250g']);
            });

            test('handles special characters in updated product names', () => {
                const specialName = "Farmer's Choice: Fresh Lettuce Variety";
                expect(words(specialName)).toEqual(["Farmer's", 'Choice', 'Fresh', 'Lettuce', 'Variety']);
            });

            test('extracts words from promotional updates', () => {
                const promotionUpdate = "Limited Time Offer: Buy 1 Get 1 Free on All Juices";
                expect(words(promotionUpdate)).toEqual(['Limited', 'Time', 'Offer', 'Buy', '1', 'Get', '1', 'Free', 'on', 'All', 'Juices']);
            });

            test('processes updates including regional specifications', () => {
                const regionalUpdate = "New Stock: Italian Olive Oil, First Press";
                expect(words(regionalUpdate)).toEqual(['New', 'Stock', 'Italian', 'Olive', 'Oil', 'First', 'Press']);
            });

            test('manages updates with specific cultivar names', () => {
                const cultivarUpdate = "Fresh Stock: Gala Apples, Handpicked";
                expect(words(cultivarUpdate)).toEqual(['Fresh', 'Stock', 'Gala', 'Apples', 'Handpicked']);
            });
        });
    });
});