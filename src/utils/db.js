// PostgreSQL connection utility
import { Pool } from 'pg';
export let pool;

export const connectDB = async () => {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    await pool.connect();
    console.log('Connected to PostgreSQL');
  }
};

