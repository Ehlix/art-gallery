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
        className="container sticky z-30 flex w-full select-none items-center justify-center gap-8 overflow-x-auto overflow-y-hidden py-2 text-base text-t-hover-1 bg-t-main-2 h-[45px] no-wrap content md:top-[45px] lg:h-[60px] lg:justify-start">
        <div className="flex h-full w-fit items-center gap-7">
          {userNavTags.map((v) => {
            const isCurrent = path === `/${username}${v.link}`;
            return (isCurrent
                ?
                <div key={v.title}
                     className="before:absolute relative before:top-full flex before:w-full items-center before:rounded-md text-xl transition-all decoration-t-hover-2 decoration-[2.5px] text-t-main before:l-0 before:h-[2px] before:bg-t-hover-2">
                  <span>
                    {v.title}
                  </span>
                </div>
                :
                <Link key={v.title} href={`/${username}${v.link}`}
                      className="relative flex items-center text-xl transition-all decoration-t-hover-2 text-t-main decoration-[2.5px] hover:text-t-hover-1">
                  <span>
                    {v.title}
                  </span>
                  {v.count && <span className="ml-1 text-base text-t-main">
                    (100)
                  </span>}
                </Link>
            );
          })}
          <div
            className="flex h-full w-auto items-center justify-center gap-5 text-sm text-t-main-2">
            <button
              className="flex items-center justify-center gap-2 rounded-sm transition-all duration-300 min-w-[100px] bg-t-hover-2 hover:bg-t-hover-3">
              <div className="text-xl pb-0.5">
                <MdPersonAdd/>
              </div>
              <span>
                Follow
              </span>
            </button>
            <button
              className="flex items-center justify-center gap-2 rounded-sm transition-all duration-300 min-w-[100px] bg-t-hover-5 hover:bg-t-hover-6">
              <div className="text-xl pb-0.5">
                <MdSend/>
              </div>
              <span>
                Message
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};