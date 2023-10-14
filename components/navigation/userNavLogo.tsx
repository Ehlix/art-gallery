'use client';
import * as React from 'react';
import {useRef, useState} from 'react';
import Image from "next/image";
import {useClickOutside} from "@/hooks/useClickOutside";
import {ModalUserOption} from "@/components/navigation/modalUserOption";

type Props = {};

export function UserNavLogo(props: Props) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);


  useClickOutside(menuRef, () => {
    if (open) setTimeout(() => setOpen(false), 170);
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
        className="absolute right-0 z-50 flex flex-col rounded-t-none shadow-black/25 shadow-[inset_0_-500px_150px_-200px] backdrop-blur-[10px] top-[60px] text-[20px] bg-t-main-2/80 rounded-[5px] w-[300px] p-[10px] text-t-hover-1 sm:top-[45px] sm:bg-t-main-2 sm:backdrop-blur-[0px] sm:w-[100%] sm:rounded-none sm:shadow-black/30">
        <ModalUserOption/>

      </div>
      }

    </>
  );
};