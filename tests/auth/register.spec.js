const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../utils/api-client');

const { validRegister } = require('../../test-data/users.data');

test.describe('Registration API', () => {

    test('TC052 - should register successfully', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.register(validRegister);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.id).toBeTruthy();
        expect(body.token).toBeTruthy();
    });

    test('TC053 - should reject registration without password', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.register({
            email: validRegister.email
        });

        expect(response.status()).toBe(400);
    });

    test('TC054 - should reject registration without email', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.register({
            password: validRegister.password
        });

        expect(response.status()).toBe(400);
    });

    test('TC055 - should reject empty registration body', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.register({});

        expect(response.status()).toBe(400);
    });

    test('TC056 - should handle invalid email', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.register({
            email: 'invalid-email',
            password: 'password123'
        });

        expect([200, 400]).toContain(response.status());
    });

    test('TC058 - successful registration should return token', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.register(validRegister);

        const body = await response.json();

        expect(body).toHaveProperty('token');
        expect(body.token.length).toBeGreaterThan(0);
    });
});