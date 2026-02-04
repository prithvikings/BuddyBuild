import fs from 'fs';
import path from 'path';
import { db } from '../config/database';

async function initDb() {
  const client = await db.getClient();
  
  try {
    console.log('[Init] Starting Database Schema initialization...');
    
    // 1. Read the SQL file
    // We go up two levels (../../) from src/scripts to reach database/
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // 2. Execute the entire SQL dump
    // BEGIN/COMMIT ensures either ALL tables are created, or NONE (atomic)
    await client.query('BEGIN');
    await client.query(schemaSql);
    await client.query('COMMIT');
    
    console.log('[Init] Schema applied successfully! Tables created.');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('[Fatal] Failed to initialize database:', error);
    process.exit(1);
  } finally {
    client.release();
    await db.close(); // Close the pool so the script exits
  }
}

initDb();