'use client';
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import {useClickOutside} from "@/hooks/useClickOutside";
import {ModalUserOption} from "@/components/navigation/modalUserOption";
import {usePathname} from "next/navigation";
import {NavUser} from "@/components/navigation/userNavPanel";


export function UserNavLogo({user}: { user: NavUser }) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const path = usePathname();

  useClickOutside(menuRef, () => {
    if (open) setTimeout(() => setOpen(false), 170);
  });

  useEffect(() => {
    if (open) setTimeout(() => setOpen(false), 0);
  }, [path]);


  function buttonHandler() {
    setOpen(!open);
  }

  return (
    <>
      <button onClick={buttonHandler}
              className="rounded-full w-[43px] h-[43px] group">
        {user.avatarLink
          ?
          <Image
            src={user.avatarLink}
            alt="navigation profile image"
            width={100}
            height={100}
            className="object-cover object-center w-[40px] h-[40px] rounded-full
        "
          />
          :
          <Image
            unoptimized
            src="/default_avatar.png"
            alt="navigation profile image"
            width={100}
            height={100}
            className="rounded-full object-cover object-center w-[40px] h-[40px]"/>
        }
      </button>

      {open &&
        <div
          ref={menuRef}
          className="absolute right-0 z-50 flex flex-col rounded-t-none shadow-black/25 shadow-[inset_0_-500px_150px_-200px] backdrop-blur-[10px] top-[60px] text-[20px] bg-t-main-2/80 rounded-[5px] w-[300px] pt-[5px] p-[10px] text-t-hover-1 sm:bg-t-main-2 sm:backdrop-blur-[0px] sm:w-[100%] sm:rounded-none sm:shadow-black/30 md:top-[45px]">
          <ModalUserOption user={user}/>
        </div>
      }
    </>
  );
}