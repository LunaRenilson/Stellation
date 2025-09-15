import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "db",             // name of the container service on docker-compose
  database: "dappdb",
  password: "postgres",
  port: 5432,
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}