'use client';
import React from "react";
import Link from "next/link";
import {MdMoreVert, MdNotifications, MdSend, MdUpload} from "react-icons/md";
import {UserNavLogo} from "@/components/navigation/userNavLogo";

export default function UserNavPanel() {
  return (

    <div className="flex w-full items-center gap-[15px]">
      <Link
        href="/project/new"
        className="flex flex-col items-center w-[30px] h-[30px] text-[29px] relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            "
      >
        <MdUpload/>
      </Link>
      <Link
        href="/"
        className="flex flex-col items-center w-[30px] h-[29px] text-[26px] relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            "
      >
        <MdNotifications/>
      </Link>
      <Link
        href="/"
        className="flex flex-col items-center w-[30px] h-[30px] text-[26px] relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            "
      >
        <MdSend/>
      </Link>

      <UserNavLogo/>

      <Link
        href="/"
        className="text-[27px] flex flex-col items-center w-[17px] h-[30px] relative transition-all decoration-t-hover-2 decoration-[2.5px]


        hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            "
      >
        <MdMoreVert/>
      </Link>
    </div>
  );
}