import Link from "next/link";
import React from "react";
import NavMobileButton from "@/components/navigation/navMobileButton";
import NavInput from "@/components/navigation/NavInput";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import UserNavPanel from "@/components/navigation/userNavPanel";
import {AuthButton} from "@/components/navigation/authButton";
import Image from "next/image";

const navMainTags = ['explore', 'blogs', 'jobs'];

export async function NavMain() {
  const supabase = createServerComponentClient({cookies});
  const {data} = await supabase.auth.getSession();
  // console.log('nav-data', data?.session?.userMain.aud);
  const isAuthorized = data?.session !== null;
  const {data: profile} = await supabase.from('profiles').select().eq('user_id', data?.session?.user.id);
  const createProfileLink = !!data.session && !!profile && !profile[0];
  console.log('Authorized: ', isAuthorized);
  return (
    <>
      <nav
        className="container fixed top-0 z-40 flex w-full select-none items-center justify-between gap-7 text-t-main bg-t-main-2 h-[60px] no-wrap md:h-[45px]">

        <NavMobileButton isAuthorized={isAuthorized}/>

        <Link href="/"
              className="min-w-[40px] min-h-[40px] md:w-[40px] md:absolute md:right-0 md:left-0 md:mx-auto">
          <Image src="/logo.svg" alt="1231" width={100}
                 height={100}
                 sizes="100vw"
                 className="w-[40px] h-[40px]"
                 unoptimized
                 priority={true}/>
        </Link>

        <div className="flex w-full items-center gap-7 md:hidden">
          {navMainTags.map((v, i) => {
            return <Link
              key={i}
              href="/"
              className="capitalize relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-full hover:before:w-full hover:before:l-0 hover:before:h-[3px] hover:before:rounded-md hover:before:bg-t-hover-2
            ">{v}</Link>;
          })}
          <NavInput/>
        </div>

        <div className="flex w-auto gap-5 text-base h-[35px]">
          {isAuthorized
            ?
            <UserNavPanel/>
            :
            <AuthButton/>
          }
        </div>
      </nav>

      <div
        className="relative top-0 w-full min-h-[60px] md:min-h-[45px]">
      </div>
      {createProfileLink &&
        <>
          <div
            className="fixed z-30 flex w-full items-center justify-center bg-t-pop-1 h-[25px]">
            <Link
              className="transition duration-200 text-t-main-2 hover:text-t-hover-1"
              href="/user/create-profile">
              Please complete your profile!
            </Link>
          </div>
          <div
            className="top-0 w-full min-h-[30px]">
          </div>
        </>
      }
    </>
  );
}