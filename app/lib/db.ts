import { Pool } from 'pg';

const NPool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default NPool;

