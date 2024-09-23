## Overview

This frontend application is built using React with TypeScript and Tailwind CSS. Its primary purpose is to consume the API provided by the backend, allowing users to interact with various features such as user authentication, subject and topic management, and ranking systems.

## Setup Instructions

### Prerequisites

- Node.js (version >= 18.x)
- Yarn or npm (for package management)

### Installation

1. **Clone the repository**:
   ```bash
    git clone `https://github.com/phonixcode/learning-app.git`
   cd `learning-app`
   cd `frontend`
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   or if using Yarn:

   ```bash
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

   or with Yarn:

   ```bash
   yarn start
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000` to view the application.

## Approach

The frontend application follows a component-based architecture using React. It makes HTTP requests to the backend API to manage data, including user authentication and subject/topic interactions. The application employs hooks for managing state and side effects, ensuring a responsive user experience.

Key features include:

- **Authentication**: Users can register and log in to access protected resources.
- **Dynamic UI**: The application updates dynamically based on API responses, providing a seamless user experience.
- **Responsive Design**: Tailwind CSS is used for styling, ensuring that the application looks great on various devices.

## Assumptions Made

- **API Consumption**: It is assumed that the backend API is fully functional and adheres to the documented endpoints.
- **CORS Configuration**: The backend API is configured to allow requests from the frontend's origin to avoid CORS issues.
- **User Roles**: The frontend logic handles different user roles based on the responses from the backend, enabling role-specific features.
- **Error Handling**: Basic error handling is implemented for API requests, with plans for further refinements based on user feedback.

## Login Instructions

You can log in to the application using the following credentials:

### Admin Login
- **Username:** admin
- **Password:** password

### Leaner Login
- Use your registered username and password.

Make sure to create an account if you're logging in as a leaner.