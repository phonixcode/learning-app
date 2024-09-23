# Project Overview

This project is a learning application consisting of a backend built with NestJS and a frontend using React. Both components work together to provide a seamless user experience for managing subjects, topics, and user progress.

## Backend Overview

The backend is developed using **NestJS**, leveraging **TypeORM** for database interactions with PostgreSQL. It provides RESTful APIs for:

- User authentication (login and registration)
- Managing subjects and topics
- Tracking user progress and rankings

### Key Features
- JWT authentication
- Database seeding functionality for development
- Modular architecture for scalability

## Frontend Overview

The frontend is built with **React** and is designed to consume the backend APIs. It provides user interfaces for:

- User login and registration
- Displaying subjects and topics
- User progress tracking

### Key Features
- Responsive design using Tailwind CSS
- State management through React context
- User-friendly interfaces for managing learning materials

## Docker Setup Instructions

This project is set up to run using Docker. Follow these instructions to get both the backend and frontend running:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Build and start the containers**:
   ```bash
   docker-compose up --build
   ```

3. **Access the applications**:
   - Backend API: `http://localhost:4000`
   - Frontend: `http://localhost:3000`

4. **Database Connection**:
   The backend connects to a PostgreSQL database, which is automatically set up in a Docker container.

5. **Seeding the Database**:
   After the containers are up, you can seed the database by sending a POST request to the `/seed` endpoint in the backend.

## Conclusion

This repository contains both the frontend and backend components of the learning application. The modular design allows for easy maintenance and scalability. For detailed setup instructions, refer to the individual README files in the `/backend` and `/frontend` directories.