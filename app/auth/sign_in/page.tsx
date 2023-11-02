import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {SignIn} from "@/components/auth/sign_in";

export default async function SignInPage() {

  const supabase = createServerComponentClient({cookies});
  const {data: user, error} = await supabase.auth.getUser();
  if (user.user) {
    return redirect('/');
  }

  return (
    <section className="flex h-full w-full items-center justify-center">
      <SignIn/>
    </section>
  );
};