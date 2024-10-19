# Full Stack Portfolio Application

## Overview
This project is a full stack web application designed to manage and display professional experiences and projects. It serves as a live portfolio showcasing my skills and accomplishments in software development.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Other Tools:**
  - Webpack and Babel for bundling and transpilation
  - Passport.js for authentication
  - Nodemailer for email handling
  - CSRF tokens for security

## Features
- **Dynamic Content Management:** Admin panel allows for CRUD operations on various contents such as blogs, projects, skills, and biographies.
- **API Integration:** React front end fetches data through well-defined API routes, ensuring real-time content updates.
- **Security:** Uses Passport.js for secure authentication and CSRF tokens to protect against CSRF attacks.
- **Responsive Design:** Ensures a seamless user experience across all devices.

## File Structure
- `client/`: Contains all frontend code including React components and utilities.
  - `admin/`: Frontend pages and components for the admin panel.
  - `build/`: Compiled code used by Digital Ocean for deployment.
  - `public/`: Holds the static files like `index.html`.
- `server/`: Root directory for all backend code.
  - `controllers/`: Contains `authController.js` for user authentication.
  - `models/`: Database models for various entities.
  - `providers/`: Service providers for authentication (`auth.js`), email (`mailer.js`), and database connection (`mongooseProvider.js`).
  - `routes/`: API routes for different data types.
  - `server.js`: Main server file configuring middleware and starting the server.

## Setup Instructions
1. Clone the repository: `git clone https://github.com/Dimitrius504/cms-portfolio-2024.git`
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file in the root directory.
4. Start the server: `npm start`
5. Access the application at `http://localhost:5000`

## Demo
Check out the live application here: [dimitriusmckinnon.com](http://dimitriusmckinnon.com)
