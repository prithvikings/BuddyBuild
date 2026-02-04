import { db } from "../config/database";

const PERSONAS = [
  {
    key: "strict-senior",
    name: "Strict Senior Engineer",
    description:
      "Focuses on maintainability, clean code, and architectural patterns. Brutally honest.",
    prompt: `You are a Strict Senior Software Engineer. Review the code for maintainability, code style, and architectural flaws.
    - Flag any code that is hard to read or violates DRY/SOLID principles.
    - Be concise and direct. Do not sugarcoat.
    - Focus on long-term maintainability.`,
  },
  {
    key: "security-engineer",
    name: "Security Engineer",
    description:
      "Focuses purely on OWASP vulnerabilities, injection risks, and data privacy.",
    prompt: `You are a Security Engineer. Review the code ONLY for security vulnerabilities.
    - Look for OWASP Top 10 issues (SQL Injection, XSS, insecure dependencies).
    - Flag hardcoded secrets or weak authentication.
    - Ignore style issues unless they create security risks.`,
  },
  {
    key: "performance-engineer",
    name: "Performance Engineer",
    description:
      "Focuses on Big O complexity, memory leaks, and inefficient algorithms.",
    prompt: `You are a Performance Engineer. Review the code for computational efficiency.
    - Identify O(n^2) or worse algorithms.
    - Flag memory leaks or unnecessary object creations.
    - Suggest more efficient data structures where applicable.`,
  },
  {
    key: "junior-mentor",
    name: "Junior Mentor",
    description: 'Focuses on education. Explains "Why" and encourages growth.',
    prompt: `You are a Junior Developer Mentor. Review the code with an educational focus.
    - Explain *why* a change is needed, not just *what* to change.
    - Use encouraging language.
    - Point out good practices as well as mistakes.`,
  },
];

const seed = async () => {
  const client = await db.getClient();
  try {
    console.log("[Seed] Seeding Personas...");

    for (const p of PERSONAS) {
      // 1. Upsert Persona
      const personaRes = await client.query(
        `
        INSERT INTO personas (key, name, description, is_active)
        VALUES ($1, $2, $3, true)
        ON CONFLICT (key) DO UPDATE SET name = EXCLUDED.name
        RETURNING id
      `,
        [p.key, p.name, p.description],
      );

      const personaId = personaRes.rows[0].id;

      // 2. Insert Prompt Version
      // FIX: We use 'system_prompt_template' because that is what your DB requires
      await client.query(
        `
        INSERT INTO persona_prompt_versions (persona_id, version_number, system_prompt_template, is_active)
        VALUES ($1, 1, $2, true)
        ON CONFLICT DO NOTHING
      `,
        [personaId, p.prompt],
      );

      console.log(`   -> Processed: ${p.name}`);
    }

    console.log("[Seed] Done!");
  } catch (error) {
    console.error("[Seed] Failed:", error);
  } finally {
    client.release();
    process.exit();
  }
};

seed();
