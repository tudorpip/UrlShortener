<h1 align="center" id="title">Url Shortener</h1>

<p align="center"><img src="https://socialify.git.ci/tudorpip/UrlShortener/image?font=Inter&amp;language=1&amp;name=1&amp;owner=1&amp;stargazers=1&amp;theme=Auto" alt="project-image"></p>

<p id="description">The URL Shortener Project is a dynamic and efficient web application designed to simplify the process of shortening URLs. Built with a modern tech stack this project combines a React-based frontend with an Express.js backend offering a seamless and interactive user experience for creating and managing shortened URLs. The application is structured to ensure ease of use with a focus on providing a straightforward interface for users to input and shorten their URLs enhancing shareability and management.</p>

# 🚀 Demo

[https://url.app.genez.io/](https://url.app.genez.io/)

<h2>Project Screenshots:</h2>

<img src="https://i.gyazo.com/ed37ceba7181c32917082e368ae25228.png" alt="project-screenshot" width="240" height="100/">

<img src="https://i.gyazo.com/bfb78f6807af575a22a895352673794d.png" alt="project-screenshot" width="230" height="100/">

<img src="https://i.gyazo.com/d509db59c7ae39c354dcc91d2fb92bca.png" alt="project-screenshot" width="230" height="100/">

  
  
# 🧐 Features

This project boasts a range of impressive features designed to provide a comprehensive URL shortening service. Below are some of the key highlights:

## Sleek Responsive Interface

- **Technology**: Built with React, ensuring a dynamic and responsive user experience.
- **Implementation**: The `client/` directory structure and dependencies such as `react` and `react-dom` in the `client/package.json` file underline the use of React for frontend development.

## Express Backend

- **Functionality**: Manages URL shortening logic and database interactions efficiently.
- **Technology Stack**: Utilizes Express.js, a robust server framework for Node.js.
- **Evidence**: The `server/` directory's structure and the inclusion of `express` in the `server/package.json` dependencies highlight the backend's foundation.

## PostgreSQL Database

- **Database Management**: Employs PostgreSQL for storing original and shortened URLs, facilitating quick data retrieval.
- **ORM Utilization**: Incorporates Sequelize as an ORM (Object-Relational Mapping) tool, simplifying database interactions.
- **Configuration**: The presence of `pg` and `sequelize` in the `server/package.json` dependencies confirms the use of PostgreSQL and Sequelize.

## Easy Deployment

- **Deployment Tool**: Leverages Genezio for straightforward deployment, particularly beneficial for serverless applications.
- **Configuration and Documentation**: The `genezio.yaml` file in the `server/` directory, along with deployment instructions in the `README.md`, guide the deployment process.

These features collectively make the project not only a powerful tool for URL management but also a showcase of modern web development practices and technologies.

# 🛠️ Installation Steps:

<p>1. Clone the Repository</p>

```
git clone {repository-url}
```

<p>2. Install Dependencies</p>

```
npm install
```

<p>3. Navigate to frontend directory</p>

```
cd client
```

<p>4. Run the client</p>

```
npm run --dev 
```

<p>5. Navigate to the server directory</p>

```
cd server
```

<p>6. Start the server</p>

```
node app.mjs
```

<p>7. Deploy from root directory</p>

```
genezio deploy --env server/.env
```

# 🍰 Contribution Guidelines:

Contributions are welcome! Please feel free to submit a pull request or open an issue.

# 🛡️ License:

This project is licensed under the MIT License
