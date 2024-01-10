import * as React from 'react';
import Link from "next/link";
import {MdCreate} from "react-icons/md";
import {BiLogIn} from "react-icons/bi";


export const AuthButton = () => (
  <>
    <Link href="/auth/signup"
          className="flex items-center justify-center gap-1 rounded-md font-medium transition-all duration-200 w-[100px] bg-t-main/70 text-t-hover-1 hover:bg-t-hover-4/70 md:hidden">
      <MdCreate size={20}/>
      <span>Sing up</span>
    </Link>
    <Link href="/auth/sign-in"
          className="flex items-center justify-center gap-1 rounded-md font-medium transition-all duration-200 w-[100px] bg-t-hover-2 text-t-main-2 hover:bg-t-hover-3">
      <BiLogIn size={20}/>
      <span>Sing in</span>
    </Link>
  </>
);