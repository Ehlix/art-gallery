'use client';
import {
  MdLock,
  MdNote,
  MdNotifications,
  MdPerson,
  MdSend,
  MdSettings,
  MdShare
} from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {IconType} from "react-icons";
import * as Separator from '@radix-ui/react-separator';

type Props = {};

type NavTag = {
  title: string,
  icon: IconType,
  link: string
  separator: boolean
}

const navTags: NavTag[] = [
  {
    title: 'Profile',
    icon: MdPerson,
    link: 'profile',
    separator: false,
  },
  {
    title: 'Resume',
    icon: MdNote,
    link: 'resume',
    separator: false,
  },
  {
    title: 'Social',
    icon: MdShare,
    link: 'social',
    separator: true,
  },
  {
    title: 'Account',
    icon: MdSettings,
    link: 'general',
    separator: false,
  },
  {
    title: 'Notifications',
    icon: MdNotifications,
    link: 'notifications',
    separator: false,
  },
  {
    title: 'Messaging',
    icon: MdSend,
    link: 'messaging',
    separator: false,
  },
  {
    title: 'Password',
    icon: MdLock,
    link: 'password',
    separator: false,
  },
];

export default function UserSettingsNav(props: Props) {
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex gap-[10px]">
        <Link href={`/`}
              className="overflow-hidden rounded-full [70px] w-[70px] bg-t-main">
          {false
            ?
            <Image
              className="h-full w-full object-cover"
              src={''}
              alt="avatar"
              height={500}
              width={500}/>
            :
            <Image
              unoptimized
              className="h-full w-full object-cover"
              src="/default_avatar.png"
              alt="avatar"
              height={500}
              width={500}/>
          }
        </Link>
        <div className="flex w-fit flex-col leading-none gap-[5px]">
          <span className="text-[14px]">
            Settings
          </span>
          <Link href="/" className="object-center text-t-hover-1">
            {'Popoa'}
          </Link>
        </div>
      </div>

      {navTags.map((v) => {
        return (
          <>
            <Link key={v.link}
                  href={`${v.link}`}
                  className="flex items-center leading-none gap-[5px] p-[10px] px-[15px] hover:bg-t-main-3 hover:text-t-hover-1">
              <v.icon/>
              <span>
              {v.title}
              </span>
            </Link>
            {v.separator &&
              <Separator.Root
                decorative
                className="bg-t-main data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[5px]"/>
            }
          </>
        );
      })}
    </div>
  );
}