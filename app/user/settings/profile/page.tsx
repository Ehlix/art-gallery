import {UserProfile} from "@/components/userSettings/userProfile";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";

const ProfilePage = async () => {
  // cookies();
  const cookiesStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  });
  const {data: user} = await supabase.auth.getUser();
  const {data: profiles} = await supabase.from('profiles').select().eq('user_id', user.user?.id || '');
  const profile = profiles && profiles[0];

  return (
    <UserProfile profileObject={profile}/>
  );
};
export default ProfilePage;
