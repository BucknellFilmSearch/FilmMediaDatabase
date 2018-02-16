import { Pool } from 'pg';
import { readFileSync } from 'fs';
import path from 'path';

// Load the JSON config
const cfg = JSON.parse(readFileSync(path.join(__dirname, 'config.json')));

// Create a pool from the config
const pool = new Pool(cfg);

// Export a singleton client pool
export default pool;
