'use client';
import * as React from 'react';
import {useEffect, useState} from 'react';
import Image from "next/image";
import {ModalUserOption} from "@/components/navigation/modalUserOption";
import {usePathname} from "next/navigation";
import {NavUser} from "@/components/navigation/userNavPanel";


export function UserNavLogo({user}: { user: NavUser }) {

  const [open, setOpen] = useState<boolean>(false);
  const path = usePathname();

function closeHandler() {
    if (open) setTimeout(() => setOpen(false), 170);
  }

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
          <ModalUserOption closeHandler={closeHandler} user={user}/>
      }
    </>
  );
}