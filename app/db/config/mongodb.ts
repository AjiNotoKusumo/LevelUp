import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI as string;

export const client = new MongoClient(uri)
export const db = client.db("gc02")