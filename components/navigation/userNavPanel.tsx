import React from "react";
import Link from "next/link";
import {MdMoreVert, MdNotifications, MdSend, MdUpload} from "react-icons/md";
import {UserNavLogo} from "@/components/navigation/userNavLogo";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export type NavUser = {
  name: string
  site: string
  avatarLink: string
}

export default async function UserNavPanel() {
  const supabase = createServerComponentClient({cookies});
  const {data} = await supabase.auth.getUser();
  const {data: profiles} = await supabase.from('profiles').select().eq('user_id', data?.user?.id);
  const profile = profiles && profiles[0];
  const user: NavUser = {
    name: profile?.name || data.user?.user_metadata.name,
    site: data.user?.user_metadata.site,
    avatarLink: (profile?.folder && profile?.avatar) ? `avatars/${profile?.folder}/${profile?.avatar}` : ''
  };

  return (
    <div className="flex w-full items-center gap-[15px]">
      <Link
        href="/project/new"
        className="flex flex-col items-center w-[30px] h-[30px] text-[29px] relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1">
        <MdUpload/>
      </Link>
      <Link
        href="/"
        className="flex flex-col items-center w-[30px] h-[29px] text-[26px] relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1">
        <MdNotifications/>
      </Link>
      <Link
        href="/"
        className="flex flex-col items-center w-[30px] h-[30px] text-[26px] relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1">
        <MdSend/>
      </Link>
      <UserNavLogo user={user}/>
      <Link
        href="/"
        className="relative flex flex-col items-center transition-all text-[27px] w-[17px] h-[30px] decoration-t-hover-2 decoration-[2.5px] hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1 hover:before:absolute hover:text-t-hover-1">
        <MdMoreVert/>
      </Link>
    </div>
  );
}