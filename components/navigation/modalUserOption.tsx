import * as React from 'react';
import {useRef} from 'react';
import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {
  MdFavorite,
  MdGroups,
  MdImage,
  MdLibraryBooks,
  MdLogout,
  MdSchool,
  MdSettings
} from "react-icons/md";
import Image from "next/image";
import {NavUser} from "@/components/navigation/userNavPanel";
import {useClickOutside} from "@/hooks/useClickOutside";

const modalTags = [
  {title: 'My learning', icon: MdSchool, href: '/'},
  {title: 'My connections', icon: MdGroups, href: '/'},
  {title: 'My library', icon: MdLibraryBooks, href: '/'},
  {title: 'My wishlist', icon: MdFavorite, href: '/'},
  {separator: true},
  {title: 'Manage portfolio', icon: MdImage, href: '/'},
  {separator: true},
  {title: 'Setting', icon: MdSettings, href: '/user/settings/general'},
];

type Props = {
  user: NavUser,
  closeHandler: () => void
}

export function ModalUserOption({user, closeHandler}:Props) {
  const menuRef = useRef(null);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

  useClickOutside(menuRef, () => {
    closeHandler();
  });

  return (
    <div
      ref={menuRef}
      className="absolute right-0 z-50 flex flex-col rounded-t-none shadow-black/25 shadow-[inset_0_-500px_150px_-200px] backdrop-blur-[10px] top-[60px] text-xl bg-t-main-2/80 rounded-bl-md w-[300px] p-3 text-t-hover-1 sm:bg-t-main-2 sm:backdrop-blur-[0px] sm:w-[100%] sm:rounded-none sm:shadow-black/30 md:top-[45px] overflow-x-hidden overflow-y-auto h-fit max-h-[92vh]">
      <Link
        href={`/${user?.site}`}
        className="text-t-hover-1/80 flex items-center justify-start transition-all w-full min-h-[50px] gap-3 hover:text-t-hover-1
         rounded-sm pl-3 mb-5
        hover:before:absolute hover:before:top-20 hover:before:w-full hover:before:l-[0px] hover:before:h-[1.3px] hover:before:rounded-md hover:before:bg-grad-1 befor:text-t-hover-1 before:absolute before:top-[80px] before:w-[110%] before:ml-[-10px] before:h-[1px]
        before:rounded-md before:bg-t-main">
        {user.avatarLink
          ?
          <Image
            src={user.avatarLink}
            alt="navigation profile image"
            width={100}
            height={100}
            className="rounded-full object-cover object-center w-[40px] h-[40px]"/>
          :
          <Image
            unoptimized
            src="/default_avatar.png"
            alt="navigation profile image"
            width={100}
            height={100}
            className="rounded-full object-cover object-center w-[40px] h-[40px]"/>
        }
        <span>
          {user?.name}
        </span>
      </Link>
      <div className="mt-1.5">
        {modalTags.map((v, i) => {
          if (v.separator) {
            return (
              <Separator.Root
                key={i}
                className="bg-t-main data-[orientation=horizontal]:h-[1px] ml-0 my-3 -mr-52"
                decorative orientation="horizontal"
              />);
          }
          if (v.href) {
            return (
              <Link key={i}
                    href={v.href}
                    className="flex items-center justify-start transition-all w-full gap-3 rounded-md py-2 p-3 hover:bg-t-main/70">
                 <v.icon className='mt-0.5'/>
                <span>
                  {v.title}
                </span>
              </Link>
            );
          }
        })}
      </div>

      <button
        onClick={logout}
        className="flex items-center justify-start transition-all w-full gap-3 rounded-md py-2 p-3 hover:bg-t-main/70">
          <MdLogout className='mt-0.5'/>
        <span>
          Sign out
        </span>
      </button>
    </div>
  );
}