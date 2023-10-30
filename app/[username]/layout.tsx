import {Metadata} from "next";
import {UserNav} from "@/components/user/userNav";
import React, {Suspense} from "react";
import {notFound} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {HeaderDataType, UserHeader} from "@/components/user/userHeader";

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
  const {data: users} = await supabase
    .from('users')
    .select().eq('metadata->>site', params.username);
  // console.log('getUser: ', users);

  if (!users || users.length <= 0 || users[0].metadata.site !== params.username) {
    return notFound();
  }
  const user = users?.length === 1 && users[0];

  const headerData: HeaderDataType = {
    userName: user.metadata.name,
    userSite: 'google.com',
    imageSrc: 'subjects/abstract/1.jpg',
    description: 'i create art',
    location: 'Uganda'

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