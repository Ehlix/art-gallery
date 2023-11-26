import {MdPersonAdd} from "react-icons/md";
import React from "react";
import {User} from "@supabase/auth-helpers-nextjs";

type Props = {
  artwork_id: number
  currentUser: User
  follow: boolean
};

export function ArtworkFollow(props: Props) {
  return (
    <button
      className="flex w-full items-center justify-center gap-1 rounded-sm border bg-none text-base transition-all duration-300 border-t-hover-2 text-t-hover-2 h-[28px] min-w-[100px] hover:border-t-hover-3 hover:text-t-hover-3">
      <div className="text-xl">
        <MdPersonAdd/>
      </div>
      <span>
          Follow
        </span>
    </button>
  );
}