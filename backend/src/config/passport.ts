import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./env";
import { db } from "./database";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback", // Relative path works
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const client = await db.getClient();
      try {
        const email = profile.emails?.[0].value;
        const googleId = profile.id;
        const displayName = profile.displayName;
        const avatarUrl = profile.photos?.[0].value;

        if (!email) throw new Error("No email found from Google");

        // UPSERT: Create user if new, update info if existing
        const result = await client.query(
          `
          INSERT INTO users (email, google_id, full_name, avatar_url)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (email) 
          DO UPDATE SET 
            full_name = EXCLUDED.full_name,
            avatar_url = EXCLUDED.avatar_url,
            google_id = EXCLUDED.google_id,
            updated_at = NOW()
          RETURNING *
        `,
          [email, googleId, displayName, avatarUrl],
        );

        const user = result.rows[0];
        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      } finally {
        client.release();
      }
    },
  ),
);

export default passport;
