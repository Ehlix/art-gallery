"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MdCreate } from "react-icons/md";
import { PiList, PiX } from "react-icons/pi";
import { SearchBar } from "@/components/navigation/searchBar";
import { useClickOutside } from "@/hooks/useClickOutside";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Status = {
  isAuthorized: boolean;
};

export const NavMobileButton = ({ isAuthorized }: Status) => {
  const menuRef = useRef(null);
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open) setTimeout(() => setOpen(false), 0);
  }, [path]);

  useClickOutside(menuRef, () => {
    if (open) setTimeout(() => setOpen(false), 170);
  });
  const ButtonHandler = () => {
    setOpen(!open);
  };

  const changeExplore = (
    e: React.MouseEvent<HTMLButtonElement>,
    search: string,
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("sort_by", search);
    router.replace(`/?${params.toString()}`);
  };

  return (
    <>
      <div
        className="hidden cursor-pointer text-t-main transition-all md:block"
        onClick={ButtonHandler}
      >
        {open ? <PiX size={35} /> : <PiList size={35} />}
      </div>
      {open && (
        <div
          ref={menuRef}
          className="container fixed left-0 top-[45px] z-50 hidden h-fit w-full flex-col gap-5 bg-t-main-2 pb-5 pt-3 shadow-lg shadow-t-shadow-1 md:flex"
        >
          <div className="flex items-center justify-center gap-5">
            <SearchBar />
            {!isAuthorized && (
              <Link
                href="/auth/signup"
                onClick={() => setOpen(false)}
                className="flex min-w-[100px] items-center justify-center gap-1 rounded-md text-t-hover-4 transition-all hover:text-t-hover-1 md:text-base"
              >
                <div className="pb-0.5 text-xl">
                  <MdCreate />
                </div>
                <span>Sing up</span>
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-5 *:flex *:justify-start hover:*:text-t-hover-1">
            <button onClick={(e) => changeExplore(e, "trending")}>
              Trending
            </button>
            <button onClick={(e) => changeExplore(e, "latest")}>Latest</button>
            {isAuthorized && (
              <button onClick={(e) => changeExplore(e, "following")}>
                Following
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
