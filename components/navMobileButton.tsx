'use client';
import React, {useState} from "react";
import Link from "next/link";
import {MdCreate} from "react-icons/md";

import {PiList, PiX} from "react-icons/pi";
import NavInput from "@/components/NavInput";

export default function NavMobileButton() {
  const [status, setStatus] = useState<boolean>(false);
  const ButtonHandler = () => {
    setStatus(!status);
  };
  const blurHandler = () => {
    setStatus(true);
  };
  return (
    <>
      <div
        className="hidden cursor-pointer transition-all text-t-main m-[-6px] text-[40px] md:block"
        onClick={ButtonHandler}>
        {status ? <PiX/> : <PiList/>}
      </div>
      {status && <div onBlur={blurHandler}
                      className="container fixed left-0 z-50 hidden h-fit w-full flex-col bg-t-main-2 pt-[15px] pb-[20px] top-[69px] gap-[20px] md:pb-[10px] md:flex">
        <div className="flex gap-[20px]">
          <NavInput/>
          <Link href="/auth/signup"
                onClick={()=>setStatus(false)}
                className="flex items-center justify-center transition-all min-w-[100px] gap-[5px] text-t-hover-4 rounded-[5px] hover:text-t-hover-1 md:text-[16px]">
            <div className="text-xl pb-[2px]"><MdCreate/></div>
            <span>Sing up</span>
          </Link>
        </div>
        <Link href="/"
              className="w-fit relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            ">Home</Link>
        <Link href="/"
              className="w-fit relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            ">Blogs</Link>
        <Link href="/"
              className="w-fit relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            ">Shop</Link>
        <Link href="/"
              className="w-fit relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            ">Jobs</Link>
      </div>}
    </>
  );
}