# UpPerScript Portfolio

A responsive web development portfolio built with semantic HTML, modern CSS and vanilla JavaScript. The project demonstrates frontend fundamentals, accessible interactions, API integration, graceful error handling and automated tests.

## Features

- Responsive layout for desktop and mobile screens.
- Accessible mobile navigation with keyboard-visible focus states.
- Project filtering by category, including empty-state handling.
- Live public repository list loaded from the GitHub REST API.
- Loading, empty and API-error states for remote data.
- Contact email validation with clear feedback. The demo does not send or store personal data.
- Unit tests using Node.js's built-in test runner.
- GitHub Actions workflow that runs tests on pushes and pull requests.

## Tech stack

- HTML5 and semantic landmarks
- CSS3, responsive layouts and reduced-motion support
- JavaScript ES modules and Fetch API
- Node.js test runner
- GitHub Actions

## Run locally

Node.js 20 or newer is recommended.

1. Clone the repository.
2. Run the test suite:

   `npm test`

3. Open `index.html` in a local development server. For example:

   `npx serve .`

The GitHub repository section uses the public GitHub API and requires an internet connection. Its username is configured in `src/js/app.js`.

## Project structure

```text
.
├── .github/workflows/tests.yml
├── index.html
├── package.json
├── src/
│   ├── css/styles.css
│   └── js/
│       ├── app.js
│       └── utils.js
└── tests/utils.test.js
```

## Notes

Project cards are illustrative portfolio concepts, not claims of commissioned client work. Replace their content with verified case studies before presenting them as completed client projects.

## License

MIT