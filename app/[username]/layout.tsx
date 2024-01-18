import {UserNav} from "@/components/userMain/userNav";
import React, {Suspense} from "react";
import {notFound, redirect} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {UserHeader} from "@/components/userMain/userHeader";
import {Database} from "@/lib/database.types";

export type HeaderDataType = {
  username: string
  headline: string
  city: string
  country: string
  website: string
  avatarLink: string
  coverLink: string
  isCurrentUserPage: boolean
}

type Props = {
  children: React.ReactNode
  params: { username: string }
}

const UserLayout = async ({
                            children,
                            params
                          }: Props) => {
  const supabase = createServerComponentClient<Database>({cookies});
  const {data: currentUser} = await supabase.auth.getUser();
  const {data: users} = await supabase
    .from('users')
    .select()
    .eq('metadata->>site', params.username);
  const user = users && users[0];

  const {data: profiles} = await supabase
    .from('profiles')
    .select()
    .eq('site', params.username);
  const profile = profiles && profiles[0];

  if (!profile && (currentUser.user?.id === user?.id)) {
    return redirect('/user/create-profile');
  }
  if (!profile) {
    return notFound();
  }

  const headerData: HeaderDataType = {
    username: profile?.name || '',
    headline: profile?.headline || '',
    city: profile?.city || '',
    country: profile?.country || '',
    // @ts-ignore
    website: profile?.social?.website || '',
    avatarLink: (profile?.folder && profile.avatar) ? `avatars/${profile.folder}/${profile.avatar}` : '',
    coverLink: (profile?.folder && profile.cover) ? `avatars/${profile.folder}/${profile.cover}` : '',
    isCurrentUserPage: currentUser.user?.id === profile?.user_id,
  };

  const {data: following} = await supabase
    .from('users_followers')
    .select()
    .match({
      follower_id: user?.id,
    });
  const {data: followers} = await supabase
    .from('users_followers')
    .select()
    .match({
      user_id: user?.id,
    });
  const {data: likes} = await supabase.from('artworks_likes')
    .select()
    .match({
      user_id: user?.id,
    });
  const {data: follow} = await supabase
    .from('users_followers')
    .select()
    .match({
      user_id: user?.id,
      follower_id: currentUser.user?.id,
    });

  const userNavData = {
    username: profile.site,
    likes: likes?.length || 0,
    following: following?.length || 0,
    followers: followers?.length || 0,
    userId: user?.id || '',
    currentUser: currentUser.user,
    isFollow: follow ? !!follow[0] : false
  };

  return (
    <section>
      <UserHeader headerData={headerData}/>
      <UserNav userNavData={userNavData}/>
      <Suspense>
        {children}
      </Suspense>
    </section>
  );
};

export default UserLayout;