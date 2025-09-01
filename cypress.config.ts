import { defineConfig } from "cypress"
import * as dotenv from "dotenv"

dotenv.config() // Adicione esta linha!

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack"
    }
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      config.env.testUsername = process.env.TEST_USERNAME
      config.env.testPassword = process.env.TEST_PASSWORD

      return config
    }
  }
})
