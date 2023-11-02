import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {SignUp} from "@/components/auth/signUp";

export default async function SignUpPage() {

  const supabase = createServerComponentClient({cookies});
  const {data: user, error} = await supabase.auth.getUser();
  if (user.user) {
    return redirect('/');
  }

  return (
    <section className='flex h-full w-full items-center justify-center'>
        <SignUp/>
    </section>

  );
}