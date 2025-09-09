import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/supabase/check-env-vars";
import { db } from "@/db";
import { instruments } from "@/db/schema";

export default async function Index() {
  const allInstruments = await db.select().from(instruments);
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="rounded-md border-l-4 border-primary bg-muted/60 p-4 mb-2">
          <div className="font-semibold text-primary mb-1">Tip</div>
          <p className="text-sm text-muted-foreground">
            Run <span className="font-mono bg-muted px-1 py-0.5 rounded border text-xs">pnpm db:reset-seed</span> to reset the database and seed it with sample data,
            or continue with the tutorial below to better understand Supabase, Drizzle, and Next.js. Then login with <span className="font-mono bg-muted px-1 py-0.5 rounded border text-xs">test@test.com / password: test</span>.
          </p>
        </div>
        <h2 className="font-medium text-xl mb-4" role="heading">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        <pre data-testid="drizzle-test-result" className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(allInstruments, null, 2)}
        </pre>
      </main>
    </>
  );
}
