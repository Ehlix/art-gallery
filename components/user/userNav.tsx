'use client';
import Link from "next/link";
import React from "react";
import {MdPersonAdd, MdSend} from "react-icons/md";
import {usePathname} from "next/navigation";

type UserNavTagType = {
  title: string
  link: string
  count?: boolean
}

const userNavTags: UserNavTagType[] = [
  {
    title: 'Portfolio',
    link: '',
  },
  {
    title: 'About',
    link: '/about',
  },
  {
    title: 'Blog',
    link: '/blog',
  }, {
    title: 'Likes',
    link: '/likes',
    count: true
  }, {
    title: 'Following',
    link: '/following',
    count: true
  }, {
    title: 'Followers',
    link: '/followers',
    count: true
  },
];

export const UserNav = ({username}: { username: string }) => {
  const path = usePathname();
  return (
    <>
      <div
        className="container sticky z-30 flex w-full select-none items-center justify-center overflow-x-auto overflow-y-hidden py-[10px] text-t-hover-1 text-[16px] bg-t-main-2 gap-[33px] h-[45px] no-wrap content md:top-[45px] lg:h-[60px] lg:justify-start">
        <div className="flex h-full w-fit items-center gap-7">
          {userNavTags.map((v) => {
            const isCurrent = path === `/${username}${v.link}`;
            return (isCurrent
                ?
                <div key={v.title}
                     className="before:absolute relative flex items-center transition-all decoration-t-hover-2 text-[18px] decoration-[2.5px] text-t-main before:top-[100%] before:w-[100%] before:l-[0px] before:h-[2px] before:bg-grad-1 before:rounded-[5px]">
                  <span>{v.title}</span>
                </div>
                :
                <Link key={v.title} href={`/${username}${v.link}`}
                      className="relative flex items-center transition-all decoration-t-hover-2 text-[18px] text-t-main decoration-[2.5px] hover:text-t-hover-1">
                  <span>{v.title}</span>
                  {v.count && <span className="ml-1 text-sm text-t-main">(100)</span>}
                </Link>
            );
          })}
          <div
            className="flex h-full w-auto items-center justify-center text-t-main-2 gap-[20px] text-[12px]">
            <button
              className="flex items-center justify-center transition-all min-w-[100px] gap-[5px] bg-grad-1 rounded-[3px] hover:bg-grad-2">
              <div className="text-xl pb-[2px]"><MdPersonAdd/></div>
              <span>Follow</span>
            </button>
            <button
              className="flex items-center justify-center transition-all min-w-[100px] gap-[5px] bg-grad-3 rounded-[3px] hover:bg-grad-4">
              <div className="text-xl pb-[2px]"><MdSend/></div>
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};