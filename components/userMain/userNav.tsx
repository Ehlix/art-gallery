'use client';
import Link from 'next/link';
import React from 'react';
import { MdSend } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { FollowButton } from '@/components/followButton';
import { User } from '@supabase/auth-helpers-nextjs';

type UserNavTagType =
  | {
      title: 'portfolio' | 'about' | 'blog';
      link: string;
      count: false;
    }
  | {
      title: 'likes' | 'following' | 'followers';
      link: string;
      count: true;
    };

const userNavTags: UserNavTagType[] = [
  {
    title: 'portfolio',
    link: '',
    count: false,
  },
  {
    title: 'about',
    link: '/about',
    count: false,
  },
  // {
  //   title: 'blog',
  //   link: '/blog',
  //   count: false,
  // },
  {
    title: 'likes',
    link: '/likes',
    count: true,
  },
  {
    title: 'following',
    link: '/following',
    count: true,
  },
  {
    title: 'followers',
    link: '/followers',
    count: true,
  },
];

type Props = {
  userNavData: {
    username: string;
    likes: number;
    following: number;
    followers: number;
    userId: string;
    currentUser: User | null;
    isFollow: boolean;
  };
};

export const UserNav = ({ userNavData }: Props) => {
  const path = usePathname();

  return (
    <>
      <div className="container sticky z-30 flex w-full select-none items-center justify-center gap-8 overflow-x-auto overflow-y-hidden py-2 text-base capitalize text-t-hover-1 bg-t-main-2 h-[45px] no-wrap content top-[55px] md:top-[45px] lg:h-[60px] lg:justify-start">
        <div className="flex h-full w-fit items-center gap-7">
          {userNavTags.map((v) => {
            const isCurrent = path === `/${userNavData.username}${v.link}`;
            return isCurrent ? (
              <div
                key={v.title}
                className="flex items-center text-xl transition-all text-t-hover-3"
              >
                <span>{v.title}</span>
                {v.count && (
                  <span className="ml-1 text-base text-t-hover-3">
                    ({userNavData[v.title]})
                  </span>
                )}
              </div>
            ) : (
              <Link
                key={v.title}
                href={`/${userNavData.username}${v.link}`}
                className="flex items-center text-xl transition-all decoration-t-hover-2 text-t-main decoration-[2.5px] hover:text-t-hover-1"
              >
                <span>{v.title}</span>
                {v.count && (
                  <span className="ml-1 text-base text-t-main">
                    ({userNavData[v.title]})
                  </span>
                )}
              </Link>
            );
          })}
          {userNavData.userId !== userNavData.currentUser?.id && (
            <div className="flex h-full w-auto items-center justify-center gap-5 text-sm text-t-main-2">
              <FollowButton
                userId={userNavData.userId}
                currentUser={userNavData.currentUser}
                isFollow={userNavData.isFollow}
                classNameFollow="bg-t-hover-2 hover:bg-t-hover-3 text-t-main-2 border-0 hover:text-t-main-2 m-0 px-2 w-[120px] disabled:bg-t-hover-2/70 disabled:text-t-main-2"
                classNameUnFollow="border border-t-main/0 m-0 px-2 w-[120px] hover:border-t-error hover:bg-t-error/30 justify-center disabled:border-t-error"
              />
              <button className="flex items-center justify-center gap-2 rounded-sm px-2 transition-all duration-300 h-[28px] min-w-[100px] bg-t-hover-5 hover:bg-t-hover-6">
                <div className="text-xl pb-0.5">
                  <MdSend />
                </div>
                <span>Message</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
