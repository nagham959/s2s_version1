const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    apiUrl: 'https://api.s2sai.online',
    specPattern: 'src/tests/cypress/integration/**/*.spec.js',
    supportFile: 'src/tests/cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    retries: {
      runMode: 0,
      openMode: 0,
    },
    env: {
      testEmail: 'yousefmasoud81@gmail.com',
      testPassword: 'Joe@joe221652004',
    },
  },
});