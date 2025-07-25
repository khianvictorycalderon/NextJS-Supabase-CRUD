import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createClient = () => {
  // const cookieStore = cookies(); // ✅ this is synchronous

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get() {
        return null;
      },
      set() {
        // You can implement this if you’re using Auth
      },
      remove() {
        // Optional
      },
    },
  });
};
