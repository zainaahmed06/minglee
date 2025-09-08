# Stream Chat Setup Guide for MingLee App

This guide will help you set up the Stream Chat integration for the MingLee dating app.

## Prerequisites

1. Create a Stream account at [getstream.io](https://getstream.io/) and create a new app
2. Create an Appwrite account at [appwrite.io](https://appwrite.io/) and create a new project

## Configuration Steps

### 1. Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a `.env` file with the following contents:
   ```
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your_appwrite_project_id
   APPWRITE_API_KEY=your_appwrite_api_key
   PORT=3000
   ```

3. Install the backend dependencies:
   ```
   npm install
   ```

4. Start the backend server:
   ```
   npm start
   ```

### 2. Frontend Configuration

1. In the root directory, create a `.env` file with:
   ```
   EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   EXPO_PUBLIC_STREAM_API_KEY=your_stream_api_key
   EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
   ```

2. Install the frontend dependencies:
   ```
   npm install
   ```

3. Start the Expo development server:
   ```
   npm start
   ```

## Testing Chat Functionality

1. Log in to the app with a valid user account
2. Navigate to the Matches tab and match with another user
3. Go to the Chat tab to see the list of conversations
4. Tap on a conversation to start chatting

## Troubleshooting

- If you encounter authentication errors, make sure your Appwrite session is valid
- For connection issues, check that your backend server is running properly
- Ensure your Stream Chat API keys are correctly set in both frontend and backend
- Use the Network tab in developer tools to inspect API calls

## Additional Resources

- [Stream Chat Documentation](https://getstream.io/chat/docs/)
- [Appwrite Documentation](https://appwrite.io/docs)
