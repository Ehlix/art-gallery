import React from "react";
import {UserPictures} from "@/components/user/userPictures";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export type ProfileData = {
  name: string
  website: string
  headline: string,
  avatarLink: string
}
export default async function UserPage({params}: {
  params: {
    username: string;
  }
}) {
  const supabase = createServerComponentClient({cookies});
  const {data: user} = await supabase
    .from('users')
    .select().eq('metadata->>site', params.username);

  const {data: artworks, error} = await supabase
    .from('artworks')
    .select().eq('user_id', user && user[0].id);
  const {data: profiles} = await supabase.from('profiles').select().eq('user_id', user && user[0].id);
  const profile = profiles && profiles[0];
  const profileData: ProfileData = {
    name: profile?.name,
    website: profile?.name || (user && user[0].metadata.name),
    headline: profile?.headline,
    avatarLink: (profile?.folder && profile?.avatar) ? `avatars/${profile?.folder}/${profile?.avatar}` : ''
  };


  return (
    <div className="container relative h-full">
      {artworks && user &&
        <UserPictures profileData={profileData} artworks={artworks}/>
      }
    </div>
  );
}

