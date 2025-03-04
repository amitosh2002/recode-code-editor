import { Client, Account, Teams } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("67c30e7d0000c635915f"); // Replace with your Project ID

export const account = new Account(client); // ✅ Fix: Export `account`
export const teams = new Teams(client);
export const clientInstance = client;
