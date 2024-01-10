import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";
import React from "react";
import {UserMain} from "@/components/userMain/userMain";

type Props = {
  params: {
    username: string;
  }
}

type User = Database['public']['Tables']['users']['Row']
const UserPage = async ({params}: Props) => {
  const supabase = createServerComponentClient<Database>({cookies});
  const date = new Date;
  const dateStart = date.toUTCString();
  const {data: users} = await supabase
    .from('users')
    .select()
    .eq('metadata->>site', params.username);
  const user: User | null = users ? users[0] : null;
  const {count} = await supabase
    .from('artworks')
    .select('*', {count: 'exact'})
    .lte('created_at', dateStart)
    .eq('user_id', user?.id || '');
  const {data: profiles} = await supabase
    .from('profiles')
    .select()
    .eq('user_id', user?.id || '');
  const profile = profiles && profiles[0];


  if (user && count && profile) {
    return (
      <div className="container relative h-full">
        <UserMain dateStart={dateStart} user={user} profile={profile} count={count}/>
      </div>
    );
  }
};

export default UserPage;