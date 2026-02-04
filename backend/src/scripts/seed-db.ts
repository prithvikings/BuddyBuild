import { db } from "../config/database";

async function seed() {
  const client = await db.getClient();
  try {
    await client.query("BEGIN");

    // 1. Create Base Persona
    const res = await client.query(`
      INSERT INTO personas (key, name, description) 
      VALUES ('strict-senior', 'Senior Engineer', 'Focuses on clean code and maintainability.')
      ON CONFLICT (key) DO UPDATE SET name = EXCLUDED.name
      RETURNING id;
    `);
    const personaId = res.rows[0].id;

    // 2. Add Initial Prompt Version
    await client.query(
      `
      INSERT INTO persona_prompt_versions (persona_id, version_number, system_prompt_template, is_current)
      VALUES ($1, 1, 'You are a Senior Engineer. Be strict...', true)
      ON CONFLICT DO NOTHING;
    `,
      [personaId],
    );

    await client.query("COMMIT");
    console.log("Database seeded successfully");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
  } finally {
    client.release();
    process.exit();
  }
}

seed();
