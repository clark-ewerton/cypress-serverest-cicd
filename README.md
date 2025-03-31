# Cypress ServeRest Challenge

Sample project to experiment with [Cypress](https://cypress.io) to test the ServeRest app.

## Pre-requirements

You also need to have [Node.js](https://nodejs.org/) and npm installed on your computer.

For this project, the following versions of Node.js and npm were used:

```sh
$ node -v
v20.16.0

$ npm -v
10.9.0
```

## Installation

Run `npm i` to install the dev dependencies.

## Tests

> By default, the tests will run against `[https://front.serverest.dev]`, but if you need to run them in a different URL (e.g.: `http://localhost:3000/`), change the `baseUrl` property in the [`cypress.config.js`](./cypress.config.js) file.
> For API, the tests will run against `[https://serverest.dev']`.
>
### User Flow test

Basically i've chose to only cover 3 functionalities for login feature for both API and GUI. The 3 scenarios are: Validate User Signup and Log in successfully, Validate login throws an error when using invalid credentials, Validate login throws an error when using invalid email format

### Headless mode

Run `npm test` to run all tests in headless mode.

### Interactive mode

1. Run `npm run cy:open` to open the Cypress App;
2. Select E2E Testing;
3. Select one of the available browsers (e.g., Electron), and click the Start button;
4. **Run the [`cypress/e2e/gui/authentication/loginAPI.cy.js`](./cypress/e2e/gui/authentication/loginAPI.cy.js) test;**
   And **Run the [`cypress/e2e/api/authentication/loginGUI.cy.js`](./cypress/e2e/api/authentication/loginGUI.cy.js) test;**
6. Finally, click on the test file you want to run and wait for it to finish.
