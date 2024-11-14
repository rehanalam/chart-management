Here’s the README in markdown format that you can copy-paste into your `README.md` file:

# FRED Series Data Charts Monorepo Project

This monorepo includes two separate projects:

1. **web-app**: A React application for managing and displaying chart data.
2. **proxy-server**: An Express-based proxy server to handle CORS and API requests.

## Monorepo Setup

The projects are managed with Yarn Workspaces and share dependencies where possible.

### Requirements

- **Node.js** (>= 14.x)
- **Yarn** (>= 1.22)

### Installation

Clone the repository and navigate to the root directory.

Run the following command to install all dependencies for both projects:

```bash
yarn install
```

### Running the Projects

Both projects can be run together using a single command:

```bash
yarn start
```

This command uses `concurrently` to start:

- **web-app** on port 3000 (default for Vite).
- **proxy-server** on port 4000 (default for Express).

---

## Project 1: Chart Management

### Overview

`web-app` is a React application designed to handle and display various types of charts (e.g., line, bar charts). It utilizes libraries like Ant Design, ChartJs, and RTK for state management.

### Available Commands

- **Development**: Start the React app in development mode.

  ```bash
  yarn dev:web-app
  ```

- **Build**: Generate a production build of the app.

  ```bash
  yarn build:web-app
  ```

- **Build**: Run unit test

  ```bash
  yarn test:web-app
  ```

### Dependencies

Key libraries:

- `chart.js`: Charting Library.
- `@ant-design`: Core Components with Ant Design styling.
- `@reduxjs/toolkit`: Simplifies Redux state management.
- `dayjs`: Lightweight date library.
- `tailwindcss`: Utility-first CSS framework.

### Folder Structure

- `src/components`: Contains reusable components.
- `src/store`: Redux store setup.
- `src/utils`: Utility functions and modules.

### Configuration

Prettier and ESLint configurations are included for code formatting and linting.

---

## Project 2: Proxy Server

### Overview

`proxy-server` is a lightweight Express server designed to handle CORS and proxy API requests to bypass restrictions, enhancing the security and stability of API requests.

### Available Commands

- **Start**: Run the proxy server.

  ```bash
  yarn dev:proxy-server
  ```

### Dependencies

Key libraries:

- `express`: Server framework.
- `http-proxy-middleware`: Proxy middleware for Express.
- `cors`: Middleware for handling CORS.

### Folder Structure

- `index.js`: Main server file.
- `middlewares`: Contains any middleware functions, such as CORS handling.
- `routes`: Define API routes and request handling.

### Configuration

The server is set up to run on port 4000 by default, but you can adjust this in `index.js` if needed.

---

## Monorepo Scripts

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `yarn start`            | Runs both the React app and proxy server |
| `yarn dev:web-app`      | Runs the React app only                  |
| `yarn dev:proxy-server` | Runs the proxy server only               |
| `yarn build:web-app`    | Builds the React app                     |
| `yarn test:web-app`     | Run the React app unit test              |

---

## Additional Notes

- **Configuration**: All configurations (for both ESLint, Prettier, and server settings) are located within each project folder.
- **Contribution**: Contributions are welcome. Please follow the project's code style and make sure to run linters before submitting.

```

You can paste this directly into your `README.md` file. Let me know if you need any further modifications!
```
