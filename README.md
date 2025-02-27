# Online Coding Collaboration App

## Project Overview

This project is a real-time, collaborative coding application where a **mentor** can share a code block with a **student** and both can work on it simultaneously. The mentor can only view the code, while the student can edit it. Changes to the code are reflected in real-time for both users.

- **Frontend**: React (with TypeScript)
- **Backend**: Node.js (with TypeScript), Express, Socket.io
- **Database**: MongoDB (for storing code blocks)

## Features

- **Real-time Collaboration**: Mentor and student can view and edit the same code block in real-time.
- **Syntax Highlighting**: Highlight.js is used for syntax highlighting of code.
- **Persistent Code Storage**: Code blocks are stored in MongoDB and can be retrieved after refreshing the page or leaving and rejoining the room.
- **Role-based Access**: The first user joining a room is assigned the "mentor" role, and others are students.

## Technologies Used

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB

## How to Run the Project

### Backend (Server)

1. **Install Dependencies**
   - Navigate to the `server` directory and run:
     ```bash
     npm install
     ```

2. **Run in Development Mode**
   - To start the server in development mode (with TypeScript), run:
     ```bash
     npm run dev
     ```

3. **Build and Run for Production**
   - To build the server:
     ```bash
     npm run build
     ```
   - To start the server in production mode (after building):
     ```bash
     npm start
     ```

### Frontend (Client)

1. **Install Dependencies**
   - Navigate to the `client` directory and run:
     ```bash
     npm install
     ```

2. **Run the Client in Development Mode**
   - To start the client in development mode, run:
     ```bash
     npm run dev
     ```
   - This will start a local development server and open the application in the default browser.

3. **Build for Production**
   - To build the frontend for production:
     ```bash
     npm run build
     ```

4. **Preview the Build**
   - To preview the built frontend locally:
     ```bash
     npm run preview
     ```

## Project Structure

- **Client**: Contains the React frontend application, which is built using TypeScript. The `client/dist` folder holds the production build after running `npm run build`.
- **Server**: Contains the Node.js backend with Express and Socket.io for real-time communication. The server is written in TypeScript and compiled to the `dist` directory.

## Deployment

- **Frontend**: The frontend is deployed at [https://moveo-app-1.onrender.com](https://moveo-app-1.onrender.com). This URL provides access to the live site, where users can join as either mentors or students and collaborate on code blocks in real-time.

### Note:
- The backend is hosted on a separate URL and is not required to be manually accessed by the user. The frontend communicates with the backend automatically for real-time functionality.

## License

This project is licensed under the MIT License.
