import { Pool } from 'pg';
import { readFileSync } from 'fs';
import path from 'path';

// Load the JSON config
const cfg = JSON.parse(readFileSync(
  (process.env.NODE_ENV === 'production') ?
    path.join(__dirname, 'config.json') :
    path.join(__dirname, '..', '..', '..', '..', 'credentials', 'postgres', 'config.json')
));

// Create a pool from the config
const pool = new Pool(cfg);

// Export a singleton client pool
export default pool;
