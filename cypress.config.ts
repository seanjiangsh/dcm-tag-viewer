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
  component: {
    devServer: { framework: "react", bundler: "vite" },
    setupNodeEvents,
  },

  e2e: { setupNodeEvents },
});
