import {
  Account,
  Client,
  Databases,
  Functions,
  Locale,
} from "react-native-appwrite";

// Appwrite configuration
const APPWRITE_ENDPOINT =
  process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID =
  process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "68b537520017ae952ec0";

// Initialize Appwrite
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setPlatform("com.naveraplus.minglee");

export const account = new Account(client);
export const functions = new Functions(client);
export const locale = new Locale(client);
export const databases = new Databases(client);
