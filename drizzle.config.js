import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:OvphBLg5Ywk3@ep-bold-butterfly-a1gdgkac.ap-southeast-1.aws.neon.tech/Form-CraftAI?sslmode=require'
  }
});
