import { db } from "../config/database";

const fixSchema = async () => {
  const client = await db.getClient();
  try {
    console.log("[Fix] Checking schema...");

    // 1. Add 'prompt_text' (You already did this, but keeping it is safe)
    await client.query(`
      ALTER TABLE persona_prompt_versions 
      ADD COLUMN IF NOT EXISTS prompt_text TEXT;
    `);

    // 2. Add 'is_active' (The new missing column)
    await client.query(`
      ALTER TABLE persona_prompt_versions 
      ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
    `);

    console.log("[Fix] Schema updated successfully.");
  } catch (error) {
    console.error("[Fix] Failed:", error);
  } finally {
    client.release();
    process.exit();
  }
};

fixSchema();
