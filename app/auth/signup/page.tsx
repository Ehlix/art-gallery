import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignUp } from "@/components/auth/signUp";
import { Database } from "@/lib/database.types";

export default async function SignUpPage() {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  });
  const { data: user } = await supabase.auth.getUser();
  if (user.user) {
    return redirect("/");
  }

  return (
    <section className="flex h-full w-full items-center justify-center">
      <SignUp />
    </section>
  );
}
