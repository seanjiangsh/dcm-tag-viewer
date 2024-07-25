import { defineConfig } from "cypress";
import cypressCoverageTask from "@cypress/code-coverage/task";

const setupNodeEvents = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  cypressCoverageTask(on, config);
  return config;
};

export default defineConfig({
  env: {
    codeCoverage: { exclude: "cypress/**/*.*" },
  },
  component: {
    devServer: { framework: "react", bundler: "vite" },
    setupNodeEvents,
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents,
  },
});
