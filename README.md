# Nexxt.js + Supabase CRUD

To use:
1. `git pull` this repository
2. Run `npm install`
3. Create `.env.local` in the project directory and setup your actual supabase configuration like this:
```
NEXT_PUBLIC_SUPABASE_URL=https://<your-actual-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-actual-supabase-anon-key>
```
4. Run `npm run dev`, as easy as that!

## Dependencies
- `npm install axios`
- `npm install @supabase/supabase-js`
- `npm install @supabase/ssr`
- `npx shadcn@latest init`
    - `npx shadcn@latest add input`
    - `npx shadcn@latest add label`
    - `npx shadcn@latest add button`
    - `npx shadcn@latest add alert`