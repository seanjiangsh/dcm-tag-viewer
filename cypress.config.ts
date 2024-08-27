import { defineConfig } from "cypress";
import cypressCoverageTask from "@cypress/code-coverage/task";
import { configureVisualRegression } from "cypress-visual-regression/dist/plugin";

const setupNodeEvents = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  cypressCoverageTask(on, config);
  configureVisualRegression(on);
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
    env: {
      visualRegressionType: "regression",
      visualRegressionBaseDirectory: "cypress/snapshot/base",
      visualRegressionDiffDirectory: "cypress/snapshot/diff",
    },
  },
});
