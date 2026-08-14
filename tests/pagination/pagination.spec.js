const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../utils/api-client');

test.describe('Pagination API', () => {

    test('TC038 - page 1 should return correct pagination metadata', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers(1);
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.page).toBe(1);
        expect(body.total_pages).toBeGreaterThanOrEqual(1);
    });

    test('TC039 - page 2 should return correct pagination metadata', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers(2);
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.page).toBe(2);
    });

    test('TC040 - page beyond available pages should be handled', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers(999);

        expect([200, 404]).toContain(response.status());
    });

    test('TC041 - page zero should be handled', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers(0);

        expect([200, 400, 404]).toContain(response.status());
    });

    test('TC042 - negative page should be handled', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers(-1);

        expect([200, 400, 404]).toContain(response.status());
    });

    test('TC043 - string page should be handled', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers('abc');

        expect([200, 400, 404]).toContain(response.status());
    });

    test('TC044 - per_page=1 should return maximum one record', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers(1, 1);
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.data.length).toBeLessThanOrEqual(1);
    });

    test('TC045 - per_page=100 should be handled', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers(1, 100);

        expect([200, 400]).toContain(response.status());
    });

    test('TC046 - missing page should use default pagination', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.getUsers();

        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.page).toBe(1);
    });
});