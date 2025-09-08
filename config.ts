// Configuration for the application
const Config = {
  // Appwrite
  APPWRITE_ENDPOINT:
    process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  APPWRITE_PROJECT_ID:
    process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "68b537520017ae952ec0",

  // GetStream
  STREAM_API_KEY: process.env.EXPO_PUBLIC_STREAM_API_KEY || "m5respd2e4hq",

  // API
  API_URL: process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:3000", // Use 10.0.2.2 for Android emulator to access host machine's localhost
};

export default Config;
