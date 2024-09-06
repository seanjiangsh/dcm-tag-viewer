import { defineConfig } from "cypress";
import cypressCoverageTask from "@cypress/code-coverage/task";
import { configureVisualRegression } from "cypress-visual-regression/dist/plugin";

const setupNodeEvents = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  cypressCoverageTask(on, config);
  configureVisualRegression(on);

  on("before:browser:launch", (browser, launchOptions) => {
    console.log(
      "launching browser %s is headless? %s",
      browser.name,
      browser.isHeadless
    );

    // the browser width and height we want to get
    // our screenshots and videos will be of that resolution
    const width = 1000;
    const height = 660;

    console.log("setting the browser window size to %d x %d", width, height);

    if (browser.name === "chrome") {
      launchOptions.args.push(`--window-size=${width},${height}`);

      // force screen to be non-retina and just use our given resolution
      launchOptions.args.push("--force-device-scale-factor=1");
    }

    if (browser.name === "electron") {
      launchOptions.preferences.width = width;
      launchOptions.preferences.height = height;
    }
    return launchOptions;
  });

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
