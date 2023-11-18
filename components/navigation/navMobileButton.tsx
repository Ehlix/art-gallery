'use client';
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {MdCreate} from "react-icons/md";

import {PiList, PiX} from "react-icons/pi";
import NavInput from "@/components/navigation/NavInput";
import {useClickOutside} from "@/hooks/useClickOutside";
import {usePathname} from "next/navigation";

interface Status {
  isAuthorized: boolean;
}

export default function NavMobileButton({isAuthorized}: Status) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    if (open) setTimeout(() => setOpen(false), 0);
  }, [path]);

  useClickOutside(menuRef, () => {
    if (open) setTimeout(() => setOpen(false), 170);
  });
  const ButtonHandler = () => {
    setOpen(!open);
  };


  return (
    <>
      <div
        className="hidden cursor-pointer transition-all text-t-main md:block"
        onClick={ButtonHandler}>
        {open
          ?
          <PiX size={35}/>
          :
          <PiList size={35}/>
        }
      </div>
      {open &&
        <div
          ref={menuRef}
          className="container fixed left-0 z-50 hidden h-fit w-full flex-col bg-t-main-2 pt-3 pb-5 top-[45px] gap-5 md:flex">
          <div className="flex gap-5">
            <NavInput/>
            {!isAuthorized &&
              <Link href="/auth/signup"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center transition-all min-w-[100px] gap-1 text-t-hover-4 rounded-md hover:text-t-hover-1 md:text-base">
                <div className="text-xl pb-0.5">
                  <MdCreate/>
                </div>
                <span>
                  Sing up
                </span>
              </Link>
            }
          </div>
          <Link href="/"
                className="relative w-fit transition-all decoration-t-hover-2 hover:text-t-hover-1">
            Home
          </Link>
          <Link href="/"
                className="relative w-fit transition-all decoration-t-hover-2 hover:text-t-hover-1">
            Blogs
          </Link>
          <Link href="/"
                className="relative w-fit transition-all decoration-t-hover-2 hover:text-t-hover-1">
            Shop
          </Link>
          <Link href="/"
                className="relative w-fit transition-all decoration-t-hover-2 hover:text-t-hover-1">
            Jobs
          </Link>
        </div>
      }
    </>
  );
}