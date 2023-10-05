import Link from "next/link";
import React from "react";
import {BsPersonAdd} from "react-icons/bs";
import {RiSendPlaneFill} from "react-icons/ri";

export const UserNav = ({username}: { username: string }) => {
  return (
    <>
      <nav
        className="container sticky z-30 flex w-full select-none items-center justify-center overflow-x-auto overflow-y-hidden text-t-hover-1 text-[16px] top-[65px] pt-[10px] pb-[10px] bg-t-main-2 gap-[33px] h-[45px] no-wrap content md:h-[55px] lg:h-[50px] lg:justify-start">
        <div className="flex w-fit items-center gap-7">
          <Link href={`/${username}`}
                className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-2
            ">Portfolio</Link>
          <Link href={`/${username}/about`}
                className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-2
            ">About</Link>
          <Link href={`/${username}/blog`}
                className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-2
            ">
            <span>Blog</span>
          </Link>
          <Link href={`/${username}/likes`}
                className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-2
            ">
            <span>Likes</span>
            <span className="ml-1 text-sm text-t-main">({'100'})</span></Link>
          <Link href={`/${username}/following`}
                className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-2
            ">
            <span>Following</span>
            <span className="ml-1 text-sm text-t-main">({'100'})</span>
          </Link>
          <Link href={`/${username}/followers`}
                className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-2
            ">
            <span>Followers</span>
            <span className="ml-1 text-sm text-t-main">({'100'})</span>
          </Link>
          <div className="flex w-auto text-t-main-2 gap-[20px] h-[30px] text-[12px]">
            <button
              className="flex items-center justify-center transition-all px-[12px] gap-[5px] bg-grad-1 rounded-[3px] hover:bg-grad-2">
              <div className="text-xl pb-[2px]"><BsPersonAdd/></div>
              <span>Follow</span>
            </button>
            <button
              className="flex items-center justify-center transition-all px-[12px] gap-[5px] bg-grad-3 rounded-[3px] hover:bg-grad-4">
              <div className="text-xl pb-[2px]"><RiSendPlaneFill/></div>
              <span>Message</span>
            </button>
          </div>

        </div>

      </nav>
    </>
  );
};