import words from "../../utils/words";

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
});