import { MongoClient } from "mongodb";
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let db: any;
async function connect() {
  try {
    console.log("mongodb - connecting to mongodb");
    const conn = await client.connect();
    db = conn?.db("whos-your-main");
  } catch (e) {
    console.error(e);
  }
}
await connect();
console.log("mongodb - db:", db);
export default db;
