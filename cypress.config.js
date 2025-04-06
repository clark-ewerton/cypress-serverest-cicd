const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    setupNodeEvents (on, config) {
      config.env.apiBaseUrl = 'https://serverest.dev'
      return config
    }
  },
   video: true,
    screenshotOnRunFailure: true,
  retries: {
    runMode: 2,
    openMode: 0
  }
})
