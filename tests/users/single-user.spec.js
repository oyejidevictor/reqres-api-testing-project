const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../utils/api-client');
const { validateUser } = require('../../utils/assertions');

test.describe('Single User API', () => {

    test('TC011 - should retrieve user ID 1', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUser(1);

        expect(response.status()).toBe(200);

        const body = await response.json();

        validateUser(body.data);
        expect(body.data.id).toBe(1);
    });

    test('TC012 - should retrieve user ID 2', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUser(2);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.data.id).toBe(2);
    });

    test('TC013 - should retrieve user ID 12', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUser(12);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.data.id).toBe(12);
    });

    test('TC014 - should return 404 for non-existing user', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUser(999);

        expect(response.status()).toBe(404);
    });

    test('TC015 - should reject user ID 0', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUser(0);

        expect(response.status()).toBe(404);
    });

    test('TC016 - should handle negative user ID', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUser(-1);

        expect([400, 404]).toContain(response.status());
    });

    test('TC017 - should handle alphabetic user ID', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUser('abc');

        expect([400, 404]).toContain(response.status());
    });

    test('TC018 - should handle decimal user ID', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUser('1.5');

        expect([400, 404]).toContain(response.status());
    });
});