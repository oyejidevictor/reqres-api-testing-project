const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
    testDir: './tests',

    timeout: 30000,

    expect: {
        timeout: 5000
    },

    fullyParallel: true,

    reporter: [
        ['list'],
        ['html', {
            outputFolder: 'playwright-report',
            open: 'never'
        }]
    ],

    use: {
        baseURL: process.env.BASE_URL,
        extraHTTPHeaders: {
            'x-api-key': process.env.API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        trace: 'retain-on-failure'
    }
});