// Appwrite service configuration for backend

const {Client, Account} = require("node-appwrite");

// Initialize Appwrite client
const client = new Client();

// Set Appwrite endpoint and project
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID || "68b537520017ae952ec0")
  .setKey(process.env.APPWRITE_API_KEY || "");

// Initialize Appwrite services
const account = new Account(client);

module.exports = {
  client,
  account,
};
