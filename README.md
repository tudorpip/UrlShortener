# URL Shortener Project

This project offers a comprehensive solution for shortening URLs, featuring a user-friendly frontend built with React and a robust backend service powered by Express.js. It's designed to transform lengthy URLs into short, manageable links, making it easier to share and manage them.

## Features

- **React Frontend**: A sleek, responsive interface for users to shorten and manage URLs.
- **Express Backend**: A powerful server handling URL shortening logic and database interactions.
- **PostgreSQL Database**: Stores original and shortened URLs for quick retrieval.
- **Easy Deployment**: Supports deployment using Genezio for the backend, ensuring a smooth transition from development to production.

## Project Structure

- `frontend/`: The React application providing the user interface.
  - `src/`: Source code including React components and styles.
  - `public/`: Public assets like the HTML template and icons.
- `server/`: The Express.js backend server.
  - `app.mjs`: The entry point for the backend server.
  - `db/`: Database connection and setup scripts.
  - `models/`: Definitions of database models.
  - `services/`: Business logic for URL shortening and management.

## Getting Started

### Prerequisites

- Node.js and npm must be installed.
- A PostgreSQL database should be set up (refer to the `.env` file for connection details).

### Setup

1. Clone the repository.
2. For both `frontend/` and `server/` directories, run `npm install` in separate terminal windows to install dependencies.

### Running the Application

#### Frontend

Navigate to the `frontend/` directory and run:

```sh
npm start
```

This command runs the React app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### Backend

Navigate to the `server/` directory and run:

```sh
npm start
```

This starts the Express.js server on port 8080, ready to handle URL shortening requests.

## Deployment

### Backend with Genezio

The backend can be easily deployed using Genezio, a deployment tool that simplifies the process of deploying serverless applications. The `genezio.yaml` file in the `server/` directory contains the necessary configuration.

To deploy with Genezio, ensure you have Genezio CLI installed and configured, then run:

```sh
genezio deploy --env .env
```

This command deploys your Express.js application as a serverless function to the cloud, making it accessible worldwide.

### Frontend

The frontend can be deployed using your preferred static site hosting service.

## Environment Variables

Ensure the following environment variables are set:

- `POSTGRES_URL`: Connection string for the PostgreSQL database.
- `DEPLOYED_URL`: The URL where the backend is deployed.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is open source and available under the [MIT License](LICENSE).

This README provides a comprehensive overview of the URL Shortener Project, including its features, structure, setup instructions, and deployment details, with a special highlight on deploying the Express backend using Genezio.
