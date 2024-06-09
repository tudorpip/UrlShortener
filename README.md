# URL Shortener Project

This project consists of a URL shortening service, designed to transform long URLs into short, manageable links. It includes both a frontend React application and a backend service built with Express.js.

## Project Structure

- `frontend/`: Contains the React application for the user interface.
  - `src/`: Source code including components and styles.
  - `public/`: Public assets like HTML template and icons.
- `server/`: Contains the Express.js backend.
  - `app.mjs`: Entry point for the backend server.
  - `db/`: Database connection and setup.
  - `models/`: Database models.
  - `services/`: Business logic for URL shortening.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- PostgreSQL database setup (refer to `.env` file for connection details).

### Setup

1. Clone the repository.
2. Navigate to both `frontend/` and `server/` directories in separate terminal windows and run `npm install` to install dependencies.

### Running the Application

#### Frontend

```sh
cd frontend
npm start
```

This will run the React app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### Backend

This will start the Express.js server on port 8080. The server is now ready to handle requests for URL shortening.

## Available Scripts

In the `frontend/` directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

## Deployment

Refer to `genezio.yaml` for backend deployment configuration. The frontend can be deployed using your preferred static site hosting service.

## Environment Variables

- `POSTGRES_URL`: Connection string for the PostgreSQL database.
- `DEPLOYED_URL`: The URL where the backend is deployed.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
