import {NewProfileMain} from "@/components/newProfile/newProfileMain";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function CreateProfilePage() {
  const supabase = createServerComponentClient({cookies});
  const {data: user} = await supabase.auth.getUser();
  if (!user.user) {
    redirect('/auth/sign-in');
  }
  if (user.user) {
    const {data: profile} = await supabase.from('profiles').select().eq('user_id', user.user.id);
    if (user.user && profile && profile[0]) {
      redirect(`/${user.user.user_metadata.site}`);
    }
  }

  const name = user.user?.user_metadata.name;

  return (
    <section
      className="container flex h-full w-full flex-col items-center justify-center gap-7">
      <NewProfileMain name={name}/>
    </section>
  );
}