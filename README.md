## Table of Contents

- [About the Project](#about-the-project)
- [Pre-requirements](#pre-requirements)
- [Installation](#installation)
- [Tests](#tests)
- [User Flow test](#user-flow-test)
- [Headless mode](#headless-mode)
- [Interactive mode](#interactive-mode)
- [License](#license)

# Cypress ServeRest Challenge

Sample project to experiment with [Cypress](https://cypress.io) to test the ServeRest app.

![Cypress Tests](https://github.com/clark-ewerton/cypress-serverest-challenge/actions/workflows/cypress.yml/badge.svg)
![Node.js](https://img.shields.io/badge/node.js-20.16.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Pre-requirements

You need to have [Node.js](https://nodejs.org/) and npm installed on your computer.

For this project, the following versions were used:

```sh
$ node -v
v20.16.0

$ npm -v
10.9.0
```

## Installation

Clone the repository and install the dependencies:

```sh
git clone https://github.com/clark-ewerton/cypress-serverest-challenge.git
cd cypress-serverest-challenge
npm install
```

## Project Structure

```
cypress/
├── e2e/
│   ├── api/
│   │   └── authentication/
│   │       └── loginGUI.cy.js
│   └── gui/
│       └── authentication/
│           └── loginAPI.cy.js
└── config.js
```

## Tests

> By default, the tests will run against [`https://front.serverest.dev`], but if you need to run them in a different URL (e.g.: `http://localhost:3000/`), change the `baseUrl` property in the [`cypress.config.js`](./cypress.config.js) file.
>
> For API, the tests will run against [`https://serverest.dev`].

### User Flow test

For this challenge, I covered three scenarios for the login feature in both API and GUI:

- ✅ Validate User Signup and Log in successfully
- ❌ Validate login throws an error with invalid credentials
- ❌ Validate login throws an error with invalid email format

### Headless mode

Run all tests in headless mode:

```sh
npm test
```

### Interactive mode

1. Run `npm run cy:open` to open the Cypress App;
2. Select **E2E Testing**;
3. Select one of the available browsers (e.g., Electron), and click **Start**;
4. Run the following test files manually:
   - [`cypress/e2e/gui/authentication/loginAPI.cy.js`](./cypress/e2e/gui/authentication/loginAPI.cy.js)
   - [`cypress/e2e/api/authentication/loginGUI.cy.js`](./cypress/e2e/api/authentication/loginGUI.cy.js)
5. Wait for the tests to finish!

## CI/CD Pipeline

This project uses **GitHub Actions** to run tests automatically on every push or pull request.

Test results are visible in the repository as status checks.  
Videos and screenshots (in case of failures) are uploaded as artifacts in the pipeline.

## Test Artifacts

- 🎥 **Videos:** `cypress/videos/`
- 🖼️ **Screenshots:** `cypress/screenshots/` (only on failure)

Note: Artifacts are generated during pipeline execution and may not exist locally until tests are run.

## Contributing

Contributions are welcome!  
If you find a bug or have a feature request, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
