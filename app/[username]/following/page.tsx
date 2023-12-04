import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";
import {cookies} from "next/headers";
import {UsersFollows} from "@/components/userMain/usersFollows";

type Profile = Database['public']['Tables']['profiles']['Row']
type Followers = Database['public']['Tables']['users_followers']['Row']

type Props = {
  params: { username: string };
};

export default async function FollowingPage({params}: Props) {
  const supabase = createServerComponentClient<Database>({cookies});
  const {data: users} = await supabase.from('users').select().eq('metadata->>site', params.username);
  const user = users?.length ? users[0] : null;
  const {data: followingUser} = await supabase.from('users_followers').select().eq('follower_id', user?.id || '').order('created_at', {ascending: false});

  async function getFollowingProfiles(followingUser: Followers[]): Promise<Profile[] | null> {
    if (followingUser.length < 1) {
      return null;
    }
    const profiles: Profile[] = [];
    for (const v of followingUser) {
      const {data: profile} = await supabase.from('profiles').select().eq('user_id', v.user_id);
      if (profile) {
        profiles.push(profile[0]);
      }
    }
    return profiles;
  }

  const profiles: Profile[] | null = await getFollowingProfiles(followingUser || []);

  return (
    <div className="container relative h-full">
      {
        profiles &&
        <UsersFollows profiles={profiles}/>
      }
    </div>
  );
}