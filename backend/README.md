## Overview

This application is designed to facilitate user interactions with a structured content platform. It includes user authentication, subject and topic management, and a ranking system. The backend is built using **NestJS** with **TypeORM** for database interactions.

## Setup Instructions

### Prerequisites

- Node.js (version >= 18.x)
- PostgreSQL 
- TypeScript
- NestJS CLI

### Installation

1. **Clone the repository**:
   ```bash
   git clone `https://github.com/phonixcode/learning-app.git`
   cd `learning-app`
   cd `backend`
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the environment variables**:
   Create a `.env` file in the root directory of your project and add the following configurations:
   ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_DATABASE=learning_app

    JWT_SECRET=MqjZHHTbmKf+k0KZbAkkcuGD4qElxPixdIfzB68iLVw=
   ```

4. **Run database migrations**:
   If using TypeORM, run:
   ```bash
   npm run typeorm migration:run
   ```
5. **Seed the database**: To populate the database with initial records (users, subjects, topics, etc.), use the following endpoint:

  ```bash
    POST /seed
  ```
6. **Start the application**:
   ```bash
   npm run start:dev
   ```

### Assumptions Made

- **User Roles**: The application includes role-based access control, assuming users can have multiple roles such as admin and teacher.
- **Authentication**: JWT is used for user authentication and session management.
- **Database Design**: It is assumed that the database is structured to handle relationships between users, subjects, topics, and rankings.
- **Error Handling**: Basic error handling is implemented, but further refinements may be necessary based on user feedback.

## API Endpoints

### Authentication

- **POST /auth/login**
  - Request Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token", "user": { ... } }`

- **POST /auth/register**
  - Request Body: `{ "username": "string", "password": "string", "role": "string" }`
  - Response: `{ "message": "User registered successfully." }`

### Users

- **GET /users**
  - Response: `[ { "id": "number", "username": "string", "role": "string" }, ... ]`

- **GET /users/:id**
  - Response: `{ "id": "number", "username": "string", "role": "string" }`

- **PATCH /users/:id**
  - Request Body: `{ "username": "string", "role": "string" }`
  - Response: `{ "message": "User updated successfully." }`

- **DELETE /users/:id**
  - Response: `{ "message": "User deleted successfully." }`

### Subjects

- **GET /subjects**
  - Response: `[ { "id": "number", "title": "string" }, ... ]`

- **GET /subjects/:id**
  - Response: `{ "id": "number", "title": "string", "topics": [...] }`

- **POST /subjects**
  - Request Body: `{ "title": "string" }`
  - Response: `{ "message": "Subject created successfully." }`

- **PATCH /subjects/:id**
  - Request Body: `{ "title": "string" }`
  - Response: `{ "message": "Subject updated successfully." }`

- **DELETE /subjects/:id**
  - Response: `{ "message": "Subject deleted successfully." }`

### Topics

- **GET /topics**
  - Response: `[ { "id": "number", "title": "string" }, ... ]`

- **POST /topics**
  - Request Body: `{ "title": "string", "subjectId": "number" }`
  - Response: `{ "message": "Topic created successfully." }`

### Rankings

- **GET /ranking/:subjectId**
  - Response: `[ { "userId": "number", "rank": "number" }, ... ]`

### Progress

- **POST /progress/:userId/:topicId**
  - Response: `{ "message": "Progress recorded successfully." }`

- **GET /progress/:userId/:topicId**
  - Response: `{ "progress": "number" }`


