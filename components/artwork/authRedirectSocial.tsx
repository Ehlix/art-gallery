import {MdBookmarkBorder, MdFavoriteBorder, MdPersonAdd} from "react-icons/md";
import React from "react";
import Link from "next/link";

type Props = {};

export default function AuthRedirectSocial(props: Props) {
  return (
    <>
      <Link
        href={'/auth/sign-in'}
        className="flex w-full items-center justify-center gap-1 rounded-sm border bg-none text-base transition-all duration-300 border-t-hover-2 text-t-hover-2 h-[28px] min-w-[100px] hover:border-t-hover-3 hover:text-t-hover-3">
        <div className="text-xl">
          <MdPersonAdd/>
        </div>
        <span>
          Follow
        </span>
      </Link>
      <Link
        href={'/auth/sign-in'}
        className="flex grow items-center justify-center gap-1 rounded-sm transition-all duration-300 text-t-main-2 min-w-[100px] bg-t-hover-5 h-[35px] pb-0.5 hover:bg-t-hover-6">
        <MdFavoriteBorder size={22}/>
        <span>
        Like
      </span>
      </Link>
      <Link
        href={'/auth/sign-in'}
        className="flex grow items-center justify-center gap-1 rounded-sm transition-all duration-300 text-t-main-2 min-w-[100px] bg-t-main h-[35px] pb-0.5 hover:bg-t-hover-1/70">
        <div className="text-xl">
          <MdBookmarkBorder/>
        </div>
        <span>
          Save
        </span>
      </Link>
    </>
  );
}