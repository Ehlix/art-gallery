import * as React from "react";
import { useRef } from "react";
import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";
import {
  MdFavorite,
  MdGroups,
  MdImage,
  MdLibraryBooks,
  MdSchool,
  MdSettings,
} from "react-icons/md";
import Image from "next/image";
import { NavUser } from "@/components/navigation/userNavPanel";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SignOutButton } from "@/components/navigation/signOutButton";

const modalTags = [
  { title: "My learning", icon: MdSchool, href: "/" },
  { title: "My connections", icon: MdGroups, href: "/" },
  { title: "My library", icon: MdLibraryBooks, href: "/" },
  { title: "My wishlist", icon: MdFavorite, href: "/" },
  { separator: true },
  { title: "Manage portfolio", icon: MdImage, href: "/projects" },
  { separator: true },
  { title: "Setting", icon: MdSettings, href: "/user/settings/general" },
];

type Props = {
  user: NavUser;
  closeHandler: () => void;
};

export const ModalUserOption = ({ user, closeHandler }: Props) => {
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    closeHandler();
  });

  return (
    <div
      ref={menuRef}
      className=" absolute right-0 top-[60px] z-50 flex h-fit max-h-[92vh] w-[300px] flex-col overflow-y-auto overflow-x-hidden rounded-t-none rounded-bl-md bg-t-main-2/80 p-3 text-xl text-t-hover-1 shadow-lg shadow-t-shadow-1 backdrop-blur-md md:top-[45px] sm:w-[100%] sm:rounded-none sm:bg-t-main-2 sm:shadow-black/30 sm:backdrop-blur-[0px]"
    >
      <Link
        href={`/${user?.site}`}
        className="hover:before:l-[0px] befor:text-t-hover-1 mb-5 flex min-h-[50px] w-full items-center justify-start gap-3
         rounded-sm pl-3 text-t-hover-1/80
        transition-all before:absolute before:top-[80px] before:ml-[-10px] before:h-[1px] before:w-[110%] before:rounded-md before:bg-t-main hover:text-t-hover-1 hover:before:absolute hover:before:top-20 hover:before:h-[1.3px] hover:before:w-full
        hover:before:rounded-md hover:before:bg-grad-1"
      >
        {user.avatarLink ? (
          <Image
            src={user.avatarLink}
            alt="navigation profile image"
            width={100}
            height={100}
            className="h-[40px] w-[40px] rounded-full object-cover object-center"
          />
        ) : (
          <Image
            unoptimized
            src="/default_avatar.png"
            alt="navigation profile image"
            width={100}
            height={100}
            className="h-[40px] w-[40px] rounded-full object-cover object-center"
          />
        )}
        <span>{user?.name}</span>
      </Link>
      <div className="mt-1.5">
        {modalTags.map((v, i) => {
          if (v.separator) {
            return (
              <Separator.Root
                key={i}
                className="my-3 -mr-52 ml-0 bg-t-main data-[orientation=horizontal]:h-[1px]"
                decorative
                orientation="horizontal"
              />
            );
          }
          if (v.href) {
            return (
              <Link
                key={i}
                href={v.href}
                className="flex w-full items-center justify-start gap-3 rounded-md p-3 py-2 transition-all hover:bg-t-main/70"
              >
                <v.icon className="mt-0.5" />
                <span>{v.title}</span>
              </Link>
            );
          }
        })}
      </div>
      <SignOutButton />
    </div>
  );
};
