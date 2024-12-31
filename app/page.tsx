import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { db } from "@/db";
import { notes } from "@/db/schema";

export default async function Index() {
  const allNotes = await db.select().from(notes);
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4" role="heading">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        <pre data-testid="drizzle-test-result" className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(allNotes, null, 2)}
        </pre>
      </main>
    </>
  );
}
