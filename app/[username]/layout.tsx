import {Metadata} from "next";
import {UserNav} from "@/components/user/userNav";
import React, {Suspense} from "react";
import {notFound, redirect} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {UserHeader} from "@/components/user/userHeader";

export type HeaderDataType = {
  username: string
  headline: string
  city: string
  country: string
  website: string
  avatarLink: string
  coverLink: string
}

export const metadata: Metadata = {
  title: 'Art',
  description: 'App gallery',
};

export default async function UserLayout({
                                           children,
                                           params
                                         }: {
  children: React.ReactNode
  params: { username: string }
}) {
  const supabase = createServerComponentClient({cookies});
  const {data:autoUser} = await supabase.auth.getUser()
  const {data: users} = await supabase
    .from('users')
    .select().eq('metadata->>site', params.username);

  if (!users || users.length <= 0 || users[0].metadata.site !== params.username) {
    return notFound();
  }
  const user = users?.length === 1 && users[0];

  const {data: profiles} = await supabase.from('profiles').select().eq('user_id', user.id);
  const profile = profiles && profiles[0];

  if (!profile && (!autoUser.user || autoUser.user?.id !== user.id)) {
    return notFound()
  }
  if (!profile && (autoUser.user?.id === user.id)) {
    redirect('/user/create_profile')
  }

  const headerData: HeaderDataType = {
    username: profile?.name || '',
    headline: profile?.headline || '',
    city: profile?.city || '',
    country: profile?.country || '',
    website: profile?.social?.website || '',
    avatarLink: (profile.folder && profile.avatar) ? `avatars/${profile.folder}/${profile.avatar}` : '',
    coverLink: (profile.folder && profile.cover) ? `avatars/${profile.folder}/${profile.cover}` : '',
  };

  return (
    <section>
      <UserHeader headerData={headerData}/>
      <UserNav username={user.metadata.site}/>
      <Suspense>
        {children}
      </Suspense>
    </section>
  );
}