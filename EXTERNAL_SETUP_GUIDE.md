# Minglee App - External Setup Guide

This document outlines tasks and configurations that need to be done outside of VS Code for the proper functioning of the Minglee application.

## 1. Stream Chat API Setup

### Stream Chat Backend

1. **Create a Stream Chat Account**:
   - Go to [https://getstream.io](https://getstream.io) and create an account
   - Create a new Stream Chat application
   - Get your API Key and API Secret from the Stream Dashboard

2. **Set up Stream Chat Backend API**:
   - Create an API endpoint at `${Config.API_URL}/api/stream/token` that:
     - Accepts a POST request with a user ID
     - Generates a Stream Chat token for the user
     - Returns the token in the response

3. **Authentication Token Management**:
   - Implement a secure method to pass authentication tokens to your backend API
   - Update the code in `services/streamChat.ts` to use this method
   - Options include:
     - Using Secure Storage
     - Using AsyncStorage (less secure)
     - Setting up a token refresh mechanism

## 2. Appwrite Backend Configuration

### Database Schema Setup

1. **Create Appwrite Project**:
   - Set up an Appwrite project at [https://cloud.appwrite.io](https://cloud.appwrite.io)
   - Configure authentication settings (email/password, social logins, etc.)
   - Set up CORS settings for your application domains

2. **Create 'profiles' Collection**:
   - Database ID: `main`
   - Collection ID: `profiles`
   - Required attributes:
     - `user_id`: string (unique)
     - `matched_profiles`: array of strings
     - Other profile fields as needed

3. **Update Appwrite Rules**:
   - Ensure proper read/write permissions for the profiles collection
   - Set up functions for profile matching if needed

## 3. Environment Configuration

1. **Create Environment Files**:
   - Create `.env.local` for local development
   - Add the following variables:
     ```
     EXPO_PUBLIC_APPWRITE_ENDPOINT=your-appwrite-endpoint
     EXPO_PUBLIC_APPWRITE_PROJECT_ID=your-appwrite-project-id
     EXPO_PUBLIC_STREAM_API_KEY=your-stream-api-key
     EXPO_PUBLIC_API_URL=your-backend-api-url
     STREAM_API_SECRET=your-stream-api-secret
     ```

2. **Deployment Environment Setup**:
   - Configure these same variables in your deployment environment

## 4. Backend API for Stream Chat Token Generation

### Example Implementation (Node.js + Express)

```javascript
const express = require('express');
const { StreamChat } = require('stream-chat');

const app = express();
app.use(express.json());

const serverSideClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

app.post('/api/stream/token', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Validate user authentication here
    // ...
    
    // Generate token
    const token = serverSideClient.createToken(userId);
    
    res.json({ 
      success: true, 
      token 
    });
  } catch (error) {
    console.error('Error generating Stream token:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error generating token' 
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## 5. Authentication Flow Updates

1. **Session Management**:
   - Replace `localStorage` with React Native's `AsyncStorage`:
     ```
     import AsyncStorage from '@react-native-async-storage/async-storage';
     
     // Store token
     await AsyncStorage.setItem('appwriteSession', token);
     
     // Retrieve token
     const token = await AsyncStorage.getItem('appwriteSession');
     ```

2. **Token Refresh**:
   - Implement a token refresh mechanism to keep users logged in
   - Update your authentication flows accordingly

## 6. Debugging Tips

1. **Stream Chat Issues**:
   - Check Stream Chat dashboard for connection status
   - Verify user tokens are being generated correctly
   - Monitor Stream Chat logs for errors

2. **Appwrite Issues**:
   - Check Appwrite console for database access issues
   - Verify document structure matches expected schema
   - Use Appwrite functions to debug user profile issues

3. **React Native Specific**:
   - Remember that web APIs like `localStorage` are not available in React Native
   - Use platform-specific alternatives from Expo or React Native libraries
   - Test on both iOS and Android for platform-specific issues

## 7. Next Steps

1. **Implement Authentication Flow**:
   - Set up proper session management with AsyncStorage
   - Integrate with Appwrite authentication
   - Create a secure token handling system

2. **Profile Matching Logic**:
   - Implement the matching algorithm
   - Update the `matched_profiles` array correctly
   - Handle empty or undefined matched profiles gracefully

3. **Streaming Chat Integration**:
   - Complete the Stream Chat implementation
   - Test real-time messaging between users
   - Implement chat UI components for the best user experience
