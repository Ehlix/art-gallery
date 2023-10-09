'use client';
import * as React from 'react';
import {useRef, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import * as Separator from '@radix-ui/react-separator';
import {useClickOutside} from "@/hooks/useClickOutside";
import {ModalUserOption} from "@/components/navigation/modalUserOption";

type Props = {};

export function UserNavLogo(props: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    if (open) setTimeout(() => setOpen(false), 200);
  });


  function buttonHandler() {
    setOpen(!open);
  }

  return (
    <>
      <button onClick={buttonHandler}
              className="rounded-full w-[43px] h-[43px] group">
        <Image
          src="/123.jpg"
          alt="navigation profile image"
          width={100}
          height={100}
          className="object-cover object-center w-[40px] h-[40px] rounded-full
        "
        />
      </button>

      {open && <div
        ref={menuRef}
        className="absolute right-0 z-50 flex flex-col rounded-t-none shadow-black/50 top-[60px] text-[20px] bg-t-main-2/95 rounded-[5px] w-[300px] p-[10px] text-t-hover-1 sm:w-[100%]">
        <ModalUserOption/>

      </div>
      }

    </>
  );
};