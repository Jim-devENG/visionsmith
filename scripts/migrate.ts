import { Client } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import path from "node:path";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not set.");

  const schema = readFileSync(path.join(process.cwd(), "db/schema.sql"), "utf8");

  const client = new Client(databaseUrl);
  await client.connect();
  try {
    await client.query(schema);
    console.log("Schema applied.");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
