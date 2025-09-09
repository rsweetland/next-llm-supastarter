
<h1 align="center">Vibecode Supastarter 🤩 🎸</h1>
<p role="heading" align="center">
   Standard tooling with testing and prompts configured – just what your LLM needs to iterate its way to success. 
</p>

- Next.js v15 (App Router)  
- Supabase (PostgreSQL, Auth)  
- Drizzle ORM v0.43.1  
- Vitest (run-on-save, debugger-ready)  
- Tailwind CSS, shadcn/ui  
- Embedded LLM prompts & agent tooling for automated code review and self-checks

This starter starts from Vercel-provided boilerplate examples: <a href="https://github.com/vercel/next.js/tree/v15.0.2/examples/with-supabase">with-supabase</a> and <a href="https://github.com/vercel/examples/tree/%40vercel/examples-ui%402.0.3/storage/postgres-drizzle">postgres-drizzle</a>. It fixes a few issues, sets up a hyper-efficient run-on-save, debugger-ready TDD workflow LLMs can use to check their work.

<p align="center">
  <a href="#features"><strong>💎 Features</strong></a> ·
  <a href="#clone-and-run"><strong>🚗 Clone and run</strong></a> ·
  <a href="#testing"><strong>🧪 Streamlined testing</strong></a> ·
  <a href="#feedback-and-issues"><strong>👋 Feedback and issues</strong></a>
</p>
<br/>

## Features
- `agents.md` and `CLAUDE.md` for Claude Code, Cursor, Windsurf, Cline, Aider or other AI dev tool
- Run-on-save [Vitest](https://vitest.dev/) (video below 📺)
- Debugger configured so you can step through and understand your LLMs work
- Works across the [Next.js](https://nextjs.org) stack
  - App Router
  - Middleware
  - Client
  - Server
- User signup, auth and protected routes
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- [Drizzle](https://orm.drizzle.team/) integration, which assumes the [Supabase with Next.js schema](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) 
- Simple migrations

## Clone and run  - Remote

1. Clone this repo
2. Set up Supabase
   <details>
   <summary>Locally</summary>

   1. [Install Supabase CLI](https://supabase.com/docs/guides/cli) if you haven't already:
      ```bash
      npm install -g supabase
      ```
   2. Start Supabase locally (in a new terminal):
      ```bash
      supabase start
      ```
      This will spin up a local Postgres database, Supabase Studio, and Auth.
   3. Copy `.env.example` to `.env` and update:
      - `NEXT_PUBLIC_SUPABASE_URL`  
        <sub>Usually `http://localhost:54321` for local dev</sub>
      - `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
        <sub>Find in the output of `supabase status` or in `supabase/config.toml`</sub>
      - `DATABASE_URL`  
        <sub>Usually `postgres://postgres:postgres@localhost:54322/postgres`</sub>
   </details>
   <details>
   <summary>Remotely</summary>

   4. Set up a [Supabase project](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
   5. Copy settings in Supabase:  
      `Supabase dashboard > Connect (top left) > App Frameworks > Next.js`
   6. Copy `.env.example` to `.env` and update:
      - `NEXT_PUBLIC_SUPABASE_URL`
      - `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
      <sub>Both can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api).</sub>
      - `DATABASE_URL`  
      <sub>Find from the Supabase Dashboard > Connect</sub>
   </details>

3. Install dependencies
    ```bash
    pnpm install
    ```
   
5. Run the Next.js local development server:

   ```bash
   pnpm run dev
   ```
   Run it in debug mode. (Or start `Javascript Debug Terminal` in VS Code'esque browser)
   ```bash
   pnpm run dev:inspect
   ```
   The included `launch.json` file sets up a "Debug Next.js" configuration to attach to this process.

6. Init database either by walking through Supabase tutorial, or by running `pnpm db:reset-seed`


## AI Dev
`agents.md` and `CLAUDE.md` describes versions and conventions in this project. Instruct your AI coding assistant of choice to load it into its default context on specific tasks.

Run `pnpm copy-context` to run [repomix](https://github.com/yamadashy/repomix) and copy the complete codebase to your clipboard. Paste this into a chat conversation with an advanced reasoning model for a productive conversation.

## Testing

<p align="center">
  
[TDD Workflow](https://github.com/user-attachments/assets/06b87ae3-1f16-4b77-b8b9-5d0eb181462e)

</p>


Run and watch tests:

1. Set up test env

   ```bash
   cp .env.test.example .env.test
   ```
   Edit `.env.test` with values from your staging or test database
   
2. Run and debug tests using [Javascript Debug Terminal](https://vitest.dev/guide/debugging). 
   You can also run "Debug Current Test File" launch.json configuration from a VS Code Compatible debugger

After debugger is attached, hit save to run tests. Add breakpoints. See to see what's going on. 👀

## Database Migrations
When your schema changes: 
* Run `pnpm db:generate` to generate Drizzle migrations
* Look in `drizzle/` folder for the newly generated SQL file
* Manually apply the SQL to your database

Additional database commands:
* `pnpm db:push` - Push schema changes directly to database
* `pnpm db:reset` - Reset database and push schema
* `pnpm db:seed` - Seed database with initial data
* `pnpm db:reset-seed` - Reset database and seed with initial data

This is a simple and durable way to operate on your production and dev database.

## UI
This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)


## Feedback and issues

This is not an official Supabase or Vercel project. Create issues, fork and improve this project. Drop a ⭐️ if you'd like. Connect with me on Twitter <a href="https://twitter.com/rsweetland">@rsweetland</a>
