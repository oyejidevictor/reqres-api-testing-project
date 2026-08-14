const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../utils/api-client');
const { validateUser, expectJson } = require('../../utils/assertions');

test.describe('GET Users API', () => {

    test('TC001 - should retrieve users page 1', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers(1);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.page).toBe(1);
        expect(Array.isArray(body.data)).toBe(true);
    });

    test('TC002 - should retrieve users page 2', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers(2);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.page).toBe(2);
        expect(Array.isArray(body.data)).toBe(true);
    });

    test('TC003 - should return data array', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers();

        const body = await response.json();

        expect(Array.isArray(body.data)).toBe(true);
    });

    test('TC004 - should return integer user IDs', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers();

        const body = await response.json();

        body.data.forEach(user => {
            expect(Number.isInteger(user.id)).toBe(true);
        });
    });

    test('TC005 - should return valid user emails', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers();

        const body = await response.json();

        body.data.forEach(user => {
            expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        });
    });

    test('TC006 - first_name should be string', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers();

        const body = await response.json();

        body.data.forEach(user => {
            expect(typeof user.first_name).toBe('string');
        });
    });

    test('TC007 - last_name should be string', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers();

        const body = await response.json();

        body.data.forEach(user => {
            expect(typeof user.last_name).toBe('string');
        });
    });

    test('TC008 - avatar should be a URL', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers();

        const body = await response.json();

        body.data.forEach(user => {
            expect(user.avatar).toMatch(/^https?:\/\//);
        });
    });

    test('TC009 - should return pagination metadata', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers(2);

        const body = await response.json();

        expect(body).toHaveProperty('page');
        expect(body).toHaveProperty('per_page');
        expect(body).toHaveProperty('total');
        expect(body).toHaveProperty('total_pages');
    });

    test('TC010 - should return total user count', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers();

        const body = await response.json();

        expect(typeof body.total).toBe('number');
        expect(body.total).toBeGreaterThan(0);
    });
});