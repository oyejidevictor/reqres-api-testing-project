const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../utils/api-client');

const {
    validUser,
    updatedUser,
    patchUser
} = require('../../test-data/users.data');

test.describe('Users CRUD API', () => {

    test('TC019 - should create a user', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.createUser(validUser);

        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body.name).toBe(validUser.name);
        expect(body.job).toBe(validUser.job);
        expect(body.id).toBeTruthy();
    });

    test('TC020 - should create user with supplied values', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.createUser(validUser);

        const body = await response.json();

        expect(body.name).toBe(validUser.name);
        expect(body.job).toBe(validUser.job);
    });

    test('TC021 - should generate user ID', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.createUser(validUser);

        const body = await response.json();

        expect(body.id).toBeTruthy();
    });

    test('TC022 - should generate createdAt timestamp', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.createUser(validUser);

        const body = await response.json();

        expect(body.createdAt).toBeTruthy();
        expect(Number.isNaN(Date.parse(body.createdAt))).toBe(false);
    });

    test('TC023 - should handle empty name', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.createUser({
            name: '',
            job: 'QA'
        });

        expect([201, 400]).toContain(response.status());
    });

    test('TC024 - should handle empty job', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.createUser({
            name: 'Victor',
            job: ''
        });

        expect([201, 400]).toContain(response.status());
    });

    test('TC025 - should handle missing name', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.createUser({
            job: 'QA'
        });

        expect([201, 400]).toContain(response.status());
    });

    test('TC026 - should handle missing job', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.createUser({
            name: 'Victor'
        });

        expect([201, 400]).toContain(response.status());
    });

    test('TC027 - should handle additional fields', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.createUser({
            name: 'Victor',
            job: 'QA',
            department: 'Engineering'
        });

        expect([201, 400]).toContain(response.status());
    });

    test('TC028 - should handle numeric name', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.createUser({
            name: 12345,
            job: 'QA'
        });

        expect([201, 400]).toContain(response.status());
    });

    test('TC029 - should update user with PUT', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.updateUser(2, updatedUser);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.name).toBe(updatedUser.name);
        expect(body.job).toBe(updatedUser.job);
    });

    test('TC030 - PUT should update name', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.updateUser(2, updatedUser);

        const body = await response.json();

        expect(body.name).toBe(updatedUser.name);
    });

    test('TC031 - PUT should update job', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.updateUser(2, updatedUser);

        const body = await response.json();

        expect(body.job).toBe(updatedUser.job);
    });

    test('TC032 - should update user with PATCH', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.patchUser(2, patchUser);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.job).toBe(patchUser.job);
    });

    test('TC033 - PATCH should update supplied field', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.patchUser(2, {
            name: 'Updated Name'
        });

        const body = await response.json();

        expect(body.name).toBe('Updated Name');
    });

    test('TC034 - PATCH should update job', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.patchUser(2, {
            job: 'QA Lead'
        });

        const body = await response.json();

        expect(body.job).toBe('QA Lead');
    });

    test('TC035 - should delete a user', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.deleteUser(2);

        expect(response.status()).toBe(204);
    });

    test('TC036 - should handle deleting the same user twice', async ({ request }) => {
        const api = new ApiClient(request);

        await api.deleteUser(2);

        const response = await api.deleteUser(2);

        expect([204, 404]).toContain(response.status());
    });

    test('TC037 - should handle deleting invalid user', async ({ request }) => {
        const api = new ApiClient(request);

        const response = await api.deleteUser(999);

        expect([204, 404]).toContain(response.status());
    });
});