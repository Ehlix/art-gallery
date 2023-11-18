import {UserProfile} from "@/components/userSettings/userProfile";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";

export default async function ProfilePage() {
  const supabase = createServerComponentClient<Database>({cookies});
  const {data: user} = await supabase.auth.getUser();
  const {data: profiles} = await supabase.from('profiles').select().eq('user_id', user.user?.id || '');
  const profile = profiles && profiles[0];

  return (
    <UserProfile profileObject={profile}/>
  );
}