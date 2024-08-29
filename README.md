# Budget Tracker App

![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-green)
![React Version](https://img.shields.io/badge/react-17.0.2-blue)
![Express Version](https://img.shields.io/badge/express-4.17.1-yellow)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

Welcome to the Budget Tracker app! This application allows users to manage their monthly budget effectively, track expenses, and stay within their budget limits. It includes features like user authentication, budget entry management, filtering, and detailed reporting.

## Features

### User Authentication/Authorization

- **SignIn and SignUp Flows**: Secure user authentication using JWT.
- **Registration**: Users are required to provide their email, name, password, and budget limit during registration.

### Budget Management

- **Add Budget Entry**: Users can add new budget entries, including details like date/time, transaction name, and amount.
- **Edit/Delete Entries**: Users can update or remove existing budget entries.
- **Exceeding Budget Notifications**: Users are notified when they exceed their monthly budget.

### Filtering by Dates

- **Date Picker**: Users can filter budget entries using a calendar or date picker, with the current date selected by default.

### Reporting

- **Budget Trends**: Users can view their budget trends over the last month, 6 months, or 12 months.
- **Exceeded Limits**: The chart highlights when and where the user exceeded their budget limits.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Authentication**: JWT-based secure token system

## Installation

To run this app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ZarinaAttaria/Budget_Tracker_App.git
   ```

2. Execute the frontend:
   cd frontend,
   npm install,
   npm run dev

3. Execute the backend:
   cd backend,
   npm install,
   npm start
