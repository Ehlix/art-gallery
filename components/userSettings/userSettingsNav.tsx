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
import React, {Fragment} from "react";
import {IconType} from "react-icons";
import * as Separator from '@radix-ui/react-separator';
import {usePathname} from "next/navigation";
import {cn} from "@/utils/twMergeClsx";
import {Database} from "@/lib/database.types";

type ProfileObject = Database['public']['Tables']['profiles']['Row']

type Props = {
  profile: ProfileObject | null
  site: string
  date: string
};

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
    title: 'General',
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

export default function UserSettingsNav({profile, site, date}: Props) {
  const pathname = usePathname();
  const userDate = new Date(date);
  const userMember = userDate.toLocaleDateString();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        <Link href={`/${site}`}
              className="overflow-hidden rounded-full w-[80px] bg-t-main h-[80px]">
          {(profile?.folder && profile?.avatar)
            ?
            <Image
              className="h-full w-full object-cover"
              src={`avatars/${profile.folder}/${profile.avatar}`}
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
        <div className="flex w-fit flex-col justify-evenly gap-1 leading-none">
          <span className="text-sm">
            Settings
          </span>
          <Link href={`/${site}`} className="object-center text-2xl text-t-hover-1">
            {profile?.name}
          </Link>
          <span className="text-xs">
            Member since {userMember}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-wrap gap-3 md:flex-row">
        <Separator.Root
          decorative
          className="bg-t-main data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-1"/>
        {navTags.map((v) => {
          const current = pathname === `/user/settings/${v.link}`;
          return (
            <Fragment key={v.link}>
              <Link
                href={`${v.link}`}
                className={cn("rounded-md flex items-center leading-none gap-1 p-3 px-3 hover:bg-t-main-3 hover:text-t-hover-1", {
                  'bg-t-main-3 text-t-hover-1 border-l-[2px] border-l-t-hover-2 pl-3 rounded-l-sm': current
                })}>
                <v.icon/>
                <span>
              {v.title}
              </span>
              </Link>
              {v.separator &&
                <Separator.Root
                  decorative
                  className="bg-t-main data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-1"/>
              }
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}