import * as React from 'react';
import Link from "next/link";
import {MdCreate} from "react-icons/md";
import {BiLogIn} from "react-icons/bi";


export function AuthButton() {
  return (
    <>
      <Link href="/auth/signup"
            className="flex items-center justify-center font-medium transition-all duration-200 w-[100px] gap-1 bg-t-main/70 text-t-hover-1 rounded-md hover:bg-t-hover-4/70 md:hidden">
        <MdCreate size={20}/>
        <span>Sing up</span>
      </Link>
      <Link href="/auth/sign_in"
            className="font-medium flex items-center justify-center transition-all duration-200 w-[100px] gap-1 bg-t-hover-2 text-t-main-2 rounded-md hover:bg-t-hover-3">
        <BiLogIn size={20}/>
        <span>Sing in</span>
      </Link>
    </>
  );
}