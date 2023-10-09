import {Metadata} from "next";
import Image from "next/image";
import {HiMapPin} from "react-icons/hi2";
import {PiLinkBold} from "react-icons/pi";
import {UserNav} from "@/components/user/userNav";
import React, {Suspense} from "react";
import {notFound} from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export const metadata: Metadata = {
  title: 'Art',
  description: 'App gallery',
};

export default async function RootLayout({
                                           children,
                                           params
                                         }: {
  children: React.ReactNode
  params: { username: string }
}) {
  const supabase = createServerComponentClient({cookies});
  let {data: users} = await supabase
    .from('users')
    .select().eq('metadata->>site', params.username);
  // console.log('getUser: ', users);

  if (!users || users.length <= 0 || users[0].metadata.site !== params.username) {
    return notFound();
  }
  const user = users?.length === 1 && users[0];

  return (
    <>
      <div
        className="relative flex justify-around overflow-hidden w-[100%] h-[300px]">
        <Image
          src="/123.jpg"
          alt="profile image"
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover object-center w-[100%] h-[300px]"
        />
        <div className="absolute h-full w-full bg-grad-5"></div>
        <div
          className="absolute flex flex-col items-center self-end px-[1px] text-t-hover-4 text-[14px] mb-[25px] item-end lg:mb-[15px]">
          <div
            className="mb-5 rounded-full relatives w-[100px] h-[100px] bg-t-main"></div>
          <div className="flex flex-col items-center">
            <h2
              className="font-bold capitalize text-t-hover-1 text-[33px]">{user.metadata.name}</h2>
            <span>Small description</span>
            <div className="flex"><span className="mr-1">Location</span><HiMapPin/>
            </div>
            <div className="flex transition-all text-t-hover-5 hover:text-t-hover-6"><a
              className="mr-1"
              href="https://google.com">google.com</a><PiLinkBold/></div>
          </div>
        </div>
      </div>
      <UserNav username={user.metadata.site}/>
      <Suspense>
        {children}
      </Suspense>
    </>
  );
}