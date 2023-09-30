#Test_Task

## Table of Contents
- [Backend](#backend)
  - [Prerequisites](#prerequisites)
  - [Running the Backend](#running-the-backend)
- [Frontend](#frontend)
  - [Prerequisites](#prerequisites-1)
  - [Running the Frontend](#running-the-frontend-1)

## Backend

### Prerequisites

Before you run the backend, make sure you have the following dependencies installed on your system:

- Node.js
- npm
- Other dependencies, specified in `package.json`

### Running the Backend

1. Open a terminal and navigate to the backend directory.

2. Install the required Node.js packages using `npm install`.

3. To seed your application with initial data (users, channels, channel members), run `npm run seed`.
    p.s: When seeding in logs you can see all the generated usersnames,for all users password is hardcoded as 'password'. So that you can login to any user page.

4. Start the backend server:

   - For production: `npm run start`

   - For development (with auto-reloading on code changes): `npm run start:dev`

The backend should now be running. You can access it via `http://localhost:your-backend-port`.

### Postman Collection

You can find a Postman collection for testing the API in the `backend/docs` directory. Import the collection into Postman to test your API endpoints.

**Note**: Don't forget to rename the `.env.example` file to `.env` in the backend directory to configure your environment settings properly.

## Frontend

### Prerequisites

Before you run the frontend, ensure that you have the following software installed:

- http-server (you can install it globally using npm)

### Running the Frontend

1. Open a terminal and navigate to the frontend directory.

2. Start the frontend server using `http-server -p <port>`. Replace `<port>` with your desired port number.

3. Your frontend should now be accessible in a web browser at `http://localhost:<port>`.
