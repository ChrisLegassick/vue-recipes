import { Client, Databases, Query, ID, Account } from "appwrite";

export function api() {
  const URL = import.meta.env.VITE_DB_ENDPOINT;
  const projectID = import.meta.env.VITE_DB_PROJECT;
  const databaseID = import.meta.env.VITE_DB_ID;
  const collectionID = import.meta.env.VITE_DB_COLLECTION;

  const client = new Client()
  .setEndpoint(URL)
  .setProject(projectID);

const databases = new Databases(client);

const account = new Account(client);

  return { URL, projectID, databaseID, collectionID, databases, Query, ID, account };
}