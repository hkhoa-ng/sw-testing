import get from "../../utils/get";

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

});