import { TutorialStep } from "./tutorial-step";
import { CodeBlock } from "./code-block";

const create = `-- Create the table (or just run npx drizzle-kit push in this repo) 
create table instruments (
  id bigint primary key generated always as identity,
  name text not null
);

-- Insert some sample data into the table
insert into instruments (name)
values
  ('violin'),
  ('viola'),
  ('cello');
alter table instruments enable row level security;
`.trim();

const server = `import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const { data: instruments } = await supabase.from('instruments').select()

  return <pre>{JSON.stringify(instruments, null, 2)}</pre>
}
`.trim();

const client = `'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [instruments, setInstruments] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('instruments').select()
      setInstruments(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(instruments, null, 2)}</pre>
}
`.trim();

export default function FetchDataSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Create some tables and insert some data">
        <p>
          Head over to the{" "}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            Table Editor
          </a>{" "}
          for your Supabase project to create a table and insert some example
          data. If you're stuck for creativity, you can copy and paste the
          following into the{" "}
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            SQL Editor
          </a>{" "}
          and click RUN!
        </p>
        <CodeBlock code={create} />
      </TutorialStep>

      <TutorialStep title="Query Supabase data from Next.js">
        <p>
          To create a Supabase client and query data from an Async Server
          Component, create a new page.tsx file at{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            /app/instruments/page.tsx
          </span>{" "}
          and add the following.
        </p>
        <CodeBlock code={server} />
        <p>Alternatively, you can use a Client Component.</p>
        <CodeBlock code={client} />
      </TutorialStep>

      <TutorialStep title="Build in a weekend and scale to millions!">
        <p>You're ready to launch your product to the world! 🚀</p>
      </TutorialStep>
    </ol>
  );
}
