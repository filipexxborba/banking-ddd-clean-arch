import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config();

export const supabaseData = createClient(
   process.env.SUPABASE_URL ?? "https://example.com",
   process.env.SUPABASE_ANON_KEY ?? "example"
);
