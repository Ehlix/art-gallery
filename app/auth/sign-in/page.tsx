import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {SignIn} from "@/components/auth/sign_in";
import {Database} from "@/lib/database.types";

export default async function SignInPage() {

  const supabase = createServerComponentClient<Database>({cookies});
  const {data: user} = await supabase.auth.getUser();
  const {data:profile} = await supabase.from('profiles').select().eq('user_id', user.user?.id || '')
  if (user.user && profile?.length === 0) {
    return redirect('/user/create-profile');
  }
  if (user.user) {
    return redirect('/')
  }

  return (
    <section className="flex h-full w-full items-center justify-center">
      <SignIn/>
    </section>
  );
};