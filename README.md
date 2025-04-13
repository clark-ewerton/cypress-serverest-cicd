# Cypress ServeRest Challenge

Sample project to experiment with [Cypress](https://cypress.io) to test the ServeRest app along with CI/CD using GitHub Actions and Pages.

[![Cypress Tests](https://github.com/clark-ewerton/cypress-serverest-challenge/actions/workflows/cypress.yml/badge.svg)](https://github.com/clark-ewerton/cypress-serverest-challenge/actions)
![Node.js](https://img.shields.io/badge/node.js-20.16.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Table of Contents

- [Pre-requirements](#pre-requirements)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Implemented Patterns](#implemented-patterns)
- [Tests](#tests)
- [User Flow test](#user-flow-test)
- [Headless mode](#headless-mode)
- [Interactive mode](#interactive-mode)
- [CI/CD Pipeline](#cicd-pipeline)
- [Test Artifacts](#test-artifacts)
- [Test Reports](#test-reports)
- [GitHub Pages](#github-pages)
- [Contributing](#contributing)
- [License](#license)

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
│   │       └── loginAPI.cy.js
│   └── gui/
│       └── authentication/
│           └── loginGUI.cy.js
├── fixtures/
├── support/
│   ├── commands.js
│   └── e2e.js
|   └── context.js
├── factories/
│   └── userFactory.js
├── services/
│   └── userService.js
cypress.config.js
.gitHub/
├── workflows/
│   └── cypress.yml
public/
└── videos/
```
- Support: Utilities like custom commands and common hooks
- Fixture: Mocked data for testing (contract testing)
- E2E: Test specifications
- factories: Data factory layer for dynamic test data creation using Faker
- services: Service layer to abstract API calls
- context.js: Context configuration for reporting (attach videos to reports)
- public/videos: Folder where test videos are copied for publishing on GitHub Pages

## Implemented Patterns

✅ Data Factory Pattern — Generates dynamic data for tests

✅ Service Layer Pattern — Abstraction for API requests (For API)

✅ Custom Commands — Simplifies and reuses test actions (For GUI)

✅ Test Context Attachment — Attaches videos and artifacts to reports

✅ GitHub Pages — Publishes test artifacts and videos for public access

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
   - [`cypress/e2e/gui/authentication/loginGUI.cy.js`](./cypress/e2e/gui/authentication/loginGUI.cy.js)
   - [`cypress/e2e/api/authentication/loginAPI.cy.js`](./cypress/e2e/api/authentication/loginAPI.cy.js)
5. Wait for the tests to finish!

## CI/CD Pipeline

This project uses **GitHub Actions** to run tests automatically on every push or pull request.

In this project CI is responsible for compile, build and run e2e automated test.
CD is responsible to upload the reports and video files on GitHub Pages.

Videos and screenshots (in case of failures) are uploaded as artifacts in the pipeline.

## Test Artifacts

- 🎥 **Videos:** `cypress/videos/` (copied to `public/videos/` for GitHub Pages)
- 🖼️ **Screenshots:** `cypress/screenshots/` (only on failure)

Note: Artifacts are generated during pipeline execution and may not exist locally until tests are run.

## Test Reports

This project uses Mochawesome reporter for test reporting. After test execution:

- Individual JSON reports are generated for each test spec

- Reports are merged into a single file

- A comprehensive HTML report is generated

Reports are available in `cypress/reports/mochawesome/` and are uploaded as artifacts in the CI/CD pipeline.

## GitHub Pages

Test artifacts (videos and reports) are automatically published via GitHub Pages.

You can access them at:

https://clark-ewerton.github.io/cypress-serverest-challenge/report.html

## Contributing

Contributions are welcome!  
If you find a bug or have a feature request, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
