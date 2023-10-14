import Link from "next/link";
import React from "react";
import NavMobileButton from "@/components/navigation/navMobileButton";
import Image from "next/image";
import NavInput from "@/components/navigation/NavInput";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import UserNavPanel from "@/components/navigation/userNavPanel";
import {AuthButton} from "@/components/navigation/authButton";

const navItem = ['home', 'blogs', 'shop', 'jobs'];

export async function Nav() {
  const supabase = createServerComponentClient({cookies});
  const {data, error} = await supabase.auth.getSession();
  // console.log('nav-data', data?.session?.user.aud);
  const isAuthorized = data?.session !== null;
  console.log('Autorizated: ',isAuthorized);
  return (
    <>
      <nav
        className="container fixed top-0 z-40 flex w-full select-none items-center justify-between text-t-main bg-t-main-2 gap-[28px] h-[60px] sm:h-[45px] no-wrap">

        <NavMobileButton isAuthorized={isAuthorized}/>

        <Link href="/ogog223"
              className="min-w-[40px] min-h-[40px] md:w-[40px] md:absolute md:right-0 md:left-0 md:mx-auto">
          <Image src="/logo.svg" alt="1231" width={0}
                 height={0}
                 sizes="100vw"
                 className="w-[40px] h-[40px]"
          />
        </Link>

        <div className="flex w-full items-center gap-[28px] md:hidden">
          {navItem.map((v, i) => {
            return <Link
              key={i}
              href="/"
              className="capitalize relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            ">{v}</Link>;
          })}
          <NavInput/>
        </div>

        <div className="flex w-auto gap-[20px] h-[35px] text-[15px]">
          {isAuthorized ?
            <UserNavPanel/> :
            <AuthButton/>
          }
        </div>
      </nav>

      <div
        className="top-0 w-full min-h-[60px] sm:min-h-[45px]">
      </div>
    </>
  );
};