🎉 Event Management System

A simple Event Management System built using Node.js, Express, MongoDB, and React that allows users to create, view, and manage events. This project enables users to add event details, like title, description, date, and location, while offering a responsive frontend built with React

📚 Table of Contents

    Features
    Tech Stack
    Installation
        Backend Setup
        Frontend Setup
    API Endpoints
        POST /api/events
        GET /api/events
    Project Structure
    Error Handling
    Screenshots
    License
    Contact
    Acknowledgments


    🚀 Features

    Create Events: Allows users to add new events with details like title, description, date, and location. 🎉
    View Events: View a list of all created events. 📅
    Event Form Validation: Ensures that all event details are correctly filled out. ✔️
    Responsive UI: Optimized for both desktop and mobile devices. 📱
    User Authentication: Secure login and registration using JWT. 🔐
    Simple Event Management: Easy-to-use interface for managing events. ⚙️
    Modern Tech Stack: Built with React for frontend and Node.js/Express for backend. ⚡


    🛠️ Tech Stack

    Frontend:
        React 🖥️
        CSS 🎨 (for styling)
     
    Backend:
        Node.js 🚀
        Express ⚡
        MongoDB 🍃 (with Mongoose for data modeling)
        JWT Authentication 🔑 (for secure login)
    Utilities:
        bcryptjs 🔐 (for password hashing)
        dotenv 🗝️ (for managing environment variables)


        📥 Installation
⚙️ Prerequisites

Make sure you have the following installed:

    Node.js: Install Node.js
    MongoDB: Install MongoDB

    Certainly! Here's a colorful version of the README with icons, providing a more visually appealing layout:
🎉 Event Management System

A simple Event Management System built using Node.js, Express, MongoDB, and React that allows users to create, view, and manage events. This project enables users to add event details, like title, description, date, and location, while offering a responsive frontend built with React.
📚 Table of Contents

    Features
    Tech Stack
    Installation
        Backend Setup
        Frontend Setup
    API Endpoints
        POST /api/events
        GET /api/events
    Project Structure
    Error Handling
    Screenshots
    License
    Contact
    Acknowledgments

 🚀 Features

    Create Events: Allows users to add new events with details like title, description, date, and location. 🎉
    View Events: View a list of all created events. 📅
    Event Form Validation: Ensures that all event details are correctly filled out. ✔️
    Responsive UI: Optimized for both desktop and mobile devices. 📱
    User Authentication: Secure login and registration using JWT. 🔐
    Simple Event Management: Easy-to-use interface for managing events. ⚙️
    Modern Tech Stack: Built with React for frontend and Node.js/Express for backend. ⚡

🛠️ Tech Stack

    Frontend:
        React 🖥️
        CSS 🎨 (for styling)
        Axios 🌐 (for HTTP requests)
    Backend:
        Node.js 🚀
        Express ⚡
        MongoDB 🍃 (with Mongoose for data modeling)
        JWT Authentication 🔑 (for secure login)
    Utilities:
        bcryptjs 🔐 (for password hashing)
        dotenv 🗝️ (for managing environment variables)

📥 Installation
⚙️ Prerequisites

Make sure you have the following installed:

    Node.js: Install Node.js
    MongoDB: Install MongoDB

Backend Setup

    Clone the repository to your local machine:

git clone https://github.com/hanane987/Sport_Event.git

cd sport-event-project

Navigate to the /server directory (backend):

cd backend
    Install the backend dependencies:

npm install
Certainly! Here's a colorful version of the README with icons, providing a more visually appealing layout:
🎉 Event Management System

A simple Event Management System built using Node.js, Express, MongoDB, and React that allows users to create, view, and manage events. This project enables users to add event details, like title, description, date, and location, while offering a responsive frontend built with React.
📚 Table of Contents

    Features
    Tech Stack
    Installation
        Backend Setup
        Frontend Setup
     API Endpoints
        POST /api/events
        GET /api/events
    Project Structure
    Error Handling
    Screenshots
    License
    Contact
    Acknowledgments

🚀 Features

    Create Events: Allows users to add new events with details like title, description, date, and location. 🎉
    View Events: View a list of all created events. 📅
    Event Form Validation: Ensures that all event details are correctly filled out. ✔️
    Responsive UI: Optimized for both desktop and mobile devices. 📱
    User Authentication: Secure login and registration using JWT. 🔐
    Simple Event Management: Easy-to-use interface for managing events. ⚙️
    Modern Tech Stack: Built with React for frontend and Node.js/Express for backend. ⚡

🛠️ Tech Stack

    Frontend:
        React 🖥️
        CSS 🎨 (for styling)
        Axios 🌐 (for HTTP requests)
    Backend:
        Node.js 🚀
        Express ⚡
        MongoDB 🍃 (with Mongoose for data modeling)
        JWT Authentication 🔑 (for secure login)
    Utilities:
        bcryptjs 🔐 (for password hashing)
        dotenv 🗝️ (for managing environment variables)

📥 Installation
⚙️ Prerequisites

Make sure you have the following installed:

    Node.js: Install Node.js
    MongoDB: Install MongoDB

Backend Setup

 Clone the repository to your local machine:

git clone https://github.com/your-username/event-management-system.git
cd event-management-system

Navigate to the /server directory (backend):

cd server

Install the backend dependencies:

npm install

Create a .env file in the root of the /server directory and add your MongoDB URI and other secrets:

MONGO_URI=mongodb://localhost:27017/event-management
JWT_SECRET=your_jwt_secret_key
PORT=3000

Start the backend server:

npm start

Your backend server will now be running on http://localhost:3000.
Frontend Setup


 Navigate to the /client directory (frontend):

cd ../frontend 

Install the frontend dependencies:

npm install

Start the React development server:

npm start

API Endpoints
🎯 Event Management

    POST /api/events
        Description: Create a new event.
        Body:

    {
      "title": "Event Title",
      "description": "Event Description",
      "date": "2024-12-20T09:00:00Z",
      "location": "Event Location"
    }

    GET /api/events
       Description: Retrieve all events.
        Body:

    {
      "title": "Event Title",
      "description": "Event Description",
      "date": "2024-12-20T09:00:00Z",
      "location": "Event Location"
    }



    

