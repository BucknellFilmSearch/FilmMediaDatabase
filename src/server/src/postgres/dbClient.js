import { Pool } from 'pg';
import { readFileSync } from 'fs';
import path from 'path';

// Get the current env
const env = process.env.NODE_ENV || 'development';

// Paths to follow for different envs
const productionPath = path.join(__dirname, 'config.json');
const developmentPath = path.join(__dirname, '..', '..', '..', '..', 'configuration', 'postgres', 'config.json');

// Load the JSON config for the current env
const cfg = JSON.parse(readFileSync((env === 'production') ? productionPath : developmentPath))[env];

// Export a singleton client pool
export default new Pool(cfg);
