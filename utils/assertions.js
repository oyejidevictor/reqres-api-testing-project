const { expect } = require('@playwright/test');

async function expectJson(response) {
    const contentType = response.headers()['content-type'];

    expect(contentType).toContain('application/json');
}

function validateUser(user) {
    expect(user).toHaveProperty('id');
    expect(typeof user.id).toBe('number');

    expect(user).toHaveProperty('email');
    expect(typeof user.email).toBe('string');

    expect(user).toHaveProperty('first_name');
    expect(typeof user.first_name).toBe('string');

    expect(user).toHaveProperty('last_name');
    expect(typeof user.last_name).toBe('string');

    expect(user).toHaveProperty('avatar');
    expect(typeof user.avatar).toBe('string');
}

module.exports = {
    expectJson,
    validateUser
};