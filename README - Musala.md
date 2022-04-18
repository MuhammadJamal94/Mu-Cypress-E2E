# Cypress Test Automation Framework

E2E testing framework
## Installation
### Prerequisites:
 -Node.js (https://nodejs.org/en/download/).
 
-VS code

Use npm install in the project directory.

```bash
npm install
```
Use cypress open to launch the test runner 
```bash
./node_modules/.bin/cypress open
```
## Folders/Files
#### fixtures: Contains test data
#### integration: Contains test suites
#### support: Contains commands file
#### cypress.json: Generic project settings and environment variables
#### package.json: Records important metadata about a project
#### results: Have test reports after execution
#### Video: Recorded video for testcases
#### Screenshots: Screenshots of failed test cases  

## Supporting multiple browsers
This solution supportes chrome, firefox, edge and Electron
User can easily choose the browser from the dropdown list on the top right after using command: 
```bash
npx cypress open
```
You can also run in headless mode for ex:
```bash
cypress run --browser chrome
```

### Findings and limitations
#### -There is "Uncaught SyntaxError: Unexpected token '<'" when visiting Musala.
#### -In Test case 2, there is a limitation in verifying visiting facebook as this is antipatern for cypress, the origin of product under test must be the same.
#### -In Test case 3, no errors appears in case wrong input (ex: incorrect email).
#### -[limitation] In Test case 3 there is a captcha.
#### -[limitation] Parallel execution in cypress requires a pipline, I believe it is not in the scope of this task. 

