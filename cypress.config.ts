import { defineConfig } from "cypress";
import cypressCoverageTask from "@cypress/code-coverage/task";
import { configureVisualRegression } from "cypress-visual-regression/dist/plugin";

const setupNodeEvents = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  cypressCoverageTask(on, config);
  configureVisualRegression(on);
  // on("before:browser:launch", (browser, launchOptions) => {
  //   const { name } = browser;
  //   if (name === "chrome") {
  //     launchOptions.args.push("--window-size=1000,660");
  //     launchOptions.args.push("--force-device-scale-factor=1");
  //   } else if (name === "electron") {
  //     launchOptions.preferences.width = 1000;
  //     launchOptions.preferences.height = 660;
  //   } else if (name === "firefox") {
  //     launchOptions.args.push("--width=1000");
  //     launchOptions.args.push("--height=660");
  //   }
  //   return launchOptions;
  // });
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
    viewportWidth: 1000,
    viewportHeight: 660,
    env: {
      visualRegressionType: "regression",
      visualRegressionBaseDirectory: "cypress/snapshot/base",
      visualRegressionDiffDirectory: "cypress/snapshot/diff",
    },
  },
});
