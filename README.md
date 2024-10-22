# Swifty Companion App

Welcome to the Swifty Companion App. This application is designed to provide a comprehensive view of user profiles from the 42 network, showcasing their skills, projects, and achievements in a clean and minimalistic interface.

## Features

- **User Authentication**: Securely authenticate users using OAuth2 with the 42 API.
- **Profile Overview**: Display detailed user information including login, email, and full name.
- **Skills Display**: View user skills with levels and percentage completion.
- **Project Showcase**: List all user projects, including completed and failed ones, with status and final marks.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/swifty-companion.git
   cd swifty-companion
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add your 42 API credentials:
   ```
   EXPO_PUBLIC_CLIENT_ID=your_client_id
   EXPO_PUBLIC_CLIENT_SECRET=client_secret
   ```

4. **Run the App**:
   ```bash
   npm start
   ```

## Usage

- **Authentication**: Click the "Authenticate with 42" button to log in using your 42 account.
- **Profile View**: Once authenticated, your profile information will be displayed, including skills and projects.
- **Navigation**: Use the tabs to switch between different sections of the app.

## Code Structure

- **TabTwoScreen**: Displays user skills and projects.
- **User Store**: Manages user data state.
- **Authentication Logic**: Handles OAuth2 flow and user data fetching.

  
<img width="373" alt="Capture d’écran 2024-10-22 à 17 17 47" src="https://github.com/user-attachments/assets/ff64b15e-315e-4d38-9db8-a645e8fcc88c">
