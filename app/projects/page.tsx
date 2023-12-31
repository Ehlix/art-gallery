import React from "react";
import UserMain from "@/components/userMain/userMain";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const ProjectsPage = async () => {
  const supabase = createServerComponentClient<Database>({cookies});
  const date = new Date;
  const dateStart = date.toUTCString();
  const {data: user} = await supabase.auth.getUser();
  const {count} = await supabase.from('artworks').select('*', {count: 'exact'}).lte('created_at', dateStart).eq('user_id', user.user?.id || '');
  const {data: profiles} = await supabase.from('profiles').select().eq('user_id', user.user?.id || '');
  const profile = profiles && profiles[0];
  if (!user.user || !profile) {
    redirect('/auth/sign-in');
  }
  return (
    <>
      <UserMain dateStart={dateStart}
                user={user.user}
                profile={profile}
                count={count || 0}
                mode={'edit'}/>
    </>
  );
};

export default ProjectsPage;