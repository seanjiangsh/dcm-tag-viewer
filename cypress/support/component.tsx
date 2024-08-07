// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "@cypress/code-coverage/support";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/react18";

import { Provider } from "react-redux";
import { setupStore } from "../../src/redux/root-store";

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

// Cypress.Commands.add("mount", mount);
Cypress.Commands.add("mount", (component, options = {}) => {
  // Use the default store if one is not provided
  const { reduxStore = setupStore(), ...mountOptions } = options;
  const wrapped = <Provider store={reduxStore}>{component}</Provider>;

  return mount(wrapped, mountOptions);
});

// Example use:
// cy.mount(<MyComponent />)
