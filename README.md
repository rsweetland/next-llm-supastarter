
<h1 align="center">Nextjs LLM Supastarter 🤩<br /> Next.js v15, Supabase, Drizzle, Jest </h1>
<p role="heading" align="center">
  Leverage LLMs to generate and mtaintain durable, documented, tested apps with Next.js 15 and Supabase 
</p>

>   <h3>🧙‍♂️Upcoming Presentation on LLM Oriented Development</h3>
>   <p>This repo is evolving in preparation for for a presentation I will be giving at <a href="https://lu.ma/AISummitSiliconValley2025">AI Summit 2025</a> regarding the use of LLMs to sustainably generate production-grade code. Topics to be covered: maintaining LLM generated systems in production, LLMs as team members, knowledge management, observability simple CLI based workflows. Follow for updates.

This starter (forked from my simpler <a href="https://github.com/rsweetland/next-tdd-supastarter">tdd-next-supastarter</a>) integrates <a href="https://nextjs.org/blog/next-15">Next.js 15</a>, with the Vercel boilerplate examples from <a href="https://github.com/vercel/next.js/tree/v15.0.2/examples/with-supabase">with-supabase</a>, <a href="https://github.com/vercel/next.js/tree/v15.0.2/examples/with-jest">with-jest</a>, and <a href="https://github.com/vercel/examples/tree/%40vercel/examples-ui%402.0.3/storage/postgres-drizzle">postgres-drizzle</a></li>, fixes a few issues, sets up a hyper-efficient run-on-save, debugger-ready TDD workflow, tested in <a href="https://www.cursor.com/">Cursor</a> and ready to be used in LLM dev workflows.</p><br />

<p align="center">
  <a href="#features"><strong>💎 Features</strong></a> ·
  <a href="#clone-and-run"><strong>🚗 Clone and run</strong></a> ·
  <a href="#testing"><strong>🧪 Streamlined testing</strong></a> ·
  <a href="#feedback-and-issues"><strong>👋 Feedback and issues</strong></a>
</p>
<br/>

## Features
- Bash tooling to invoke and manage your LLM (TODO)
- Prompts as first class citizens (TODO)
- Tooling to thoughtfully manage context (TODO)
- Run-on-save [Jest](https://jestjs.io/) tests with VS Code debugging preconfigured (video below 📺)
- Debugger set up for both test and dev scripts. Just add breakpoints
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

## Clone and run

1. Clone this repo
1. [Set up a Supabase project](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
1. Copy settings in Supabase: `Supabase dashboard > Connect (top left) > App Frameworks > Next.js`
2.  Copy `.env.example`  to `.env`  and update:<br />
    * `NEXT_PUBLIC_SUPABASE_URL` 
    * `NEXT_PUBLIC_SUPABASE_ANON_KEY`  Both can be found in [your Supabase project's API settings](https://app.supabase.*com/project/_/settings/api).
    * `DATABASE_URL`  Find from the Supabase Dashboard > Connect
3. Install dependencies
    ```bash
    npm install
    ```
4. Run the Next.js local development server:

   ```bash
   npm run dev
   ```

5. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Testing

<p align="center">
  
[TDD Workflow](https://github.com/user-attachments/assets/06b87ae3-1f16-4b77-b8b9-5d0eb181462e)

</p>


Run and watch tests:

```bash
  npm run test:inspect
```
A VS Code `launch.json` file is included, allowing you to just open Debug sidebar to attach the VS Code.

Just hit save to run tests. Add breakpoints. See to see what's going on. 🔬

## Database Migrations
When your schema changes: 
* run `npm run db:generate`
* look in `drizzle` folder for the newly generated sql file
* manually apply the sql to your database

It's simple and durable way to operate on your production and dev database.

## Feedback and issues

This is not an official Supabase or Vercel project. It's just my own personal preference and dev workflow that I thought I would share. Feel free to create issues, fork and improve this project. Drop a ⭐️ if you'd like. Sometimes I am also hiring. Connect with me on Twitter <a href="https://twitter.com/rsweetland">@rsweetland</a>

