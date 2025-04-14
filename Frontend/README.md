# GitHub Search

This web app let you search for GitHub users by their login.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

### Search users

Use the search bar to find GitHub users. Request will be automatically sent to the GitHub API after a short delay.

The API has a rate limit, so after 60 request an hour you can't use it anymore.

### Edit users

Once results have been found, you can edit them:

#### Select user card

Select the user cards you want to edit by the checkbox on their card. Or you can select them all by using the checkbox in the menu below the search bar:

- Clicking it once will be select all the cards
- Clicking it a second will unselect all the cards

#### Edit actions

You can create copies of the selected items by clicking the "Duplicate" button. Original cards will still be selected after that, but not the new cards.

Or you can delete them by clicking the "Delete" button.

Both of these actions will not leave a permanent mark, and the modifications will be reset once a new request is sent.

## Running the project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:e2e`

Run the end-to-end test once. If some tests fails, a web page will display the tests results.

If you want to use Playwright options, as for example its ui, you need to run the project in development mode and launch Playwright through npx: `npx playwright test --ui`

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Testing Strategy

### End-to-end tests

The end-to-end tests run with request mocks. These are not automatic, but crafted for each test case.

Each end-to-end test covers a nominal test case for a specific feature. They can have several sequential steps but don't cover all the edge cases.

### Unit tests

The unit tests are made to cover many edge cases of inidivual components, queries, contexts or hooks.

These tests aren't testing with HTTP request, real or mocked, for technical reasons at the moment. For the same reasons, there are no integration tests at the moment.
