const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../utils/api-client');

const {
    validLogin,
    invalidLogin
} = require('../../test-data/users.data');

test.describe('Login API', () => {

    test('TC047 - should login with valid credentials', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.login(validLogin);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.token).toBeTruthy();
        expect(typeof body.token).toBe('string');
    });

    test('TC048 - should reject login without password', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.login({
            email: validLogin.email
        });

        expect(response.status()).toBe(400);
    });

    test('TC049 - should reject login without email', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.login({
            password: validLogin.password
        });

        expect(response.status()).toBe(400);
    });

    test('TC050 - should reject invalid credentials', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.login(invalidLogin);

        expect(response.status()).toBe(401);
    });

    test('TC051 - should reject empty login body', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.login({});

        expect(response.status()).toBe(400);
    });

    test('TC057 - successful login should return token', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.login(validLogin);

        const body = await response.json();

        expect(body).toHaveProperty('token');
        expect(body.token.length).toBeGreaterThan(0);
    });
});