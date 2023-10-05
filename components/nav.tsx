import Link from "next/link";
import React from "react";
import {BiLogIn} from "react-icons/bi";
import {MdCreate} from "react-icons/md";
import NavMobileButton from "@/components/navMobileButton";
import Image from "next/image";
import NavInput from "@/components/NavInput";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import SignOutButton from "@/components/SignOutButton";

export async function Nav() {
  const supabase = createServerComponentClient({cookies});
  const {data, error} = await supabase.auth.getSession();
  console.log('111111111', data);


  return (
    <>
      <nav
        className="container fixed top-0 z-40 flex w-full select-none items-center justify-between text-t-main bg-t-main-2 gap-[28px] h-[69px] no-wrap">

        <NavMobileButton/>

        <Link href="/1"
              className="min-w-[40px] min-h-[40px] md:w-[40px] md:absolute md:right-0 md:left-0 md:mx-auto">
          <Image src="/logo.svg" alt="1231" width={0}
                 height={0}
                 sizes="100vw"
                 className="w-[40px] h-[40px]"
          />
        </Link>

        <div className="flex w-full items-center gap-[28px] md:hidden">
          <Link href="/"
                className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            ">Home</Link>
          <Link href="/"
                className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            ">Blogs</Link>
          <Link href="/"
                className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            ">Shop</Link>
          <Link href="/"
                className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            ">Jobs</Link>
          <NavInput/>
        </div>

        <div className="flex w-auto gap-[20px] h-[35px] text-[15px]">
          {data?.session?.user ?

            <SignOutButton/> :

            <><Link href="/auth/signup"
                    className="flex items-center justify-center transition-all w-[100px] gap-[5px] bg-t-main/70 text-t-hover-1 rounded-[5px] hover:bg-t-hover-4/70 md:hidden">
              <div className="text-xl pb-[2px]"><MdCreate/></div>
              <span>Sing up</span>
            </Link>
              <Link href="/auth/sign_in"
                    className="flex items-center justify-center transition-all w-[100px] gap-[5px] bg-grad-1 text-t-main-2 rounded-[5px] hover:bg-grad-2">
                <div className="text-xl pb-[2px]"><BiLogIn/></div>
                <span>Sing in</span>
              </Link>
            </>}

        </div>
      </nav>

      <div
        className="top-0 w-full min-h-[69px]">
      </div>
    </>
  );
};