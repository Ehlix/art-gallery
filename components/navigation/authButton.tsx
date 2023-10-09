// @flow
import * as React from 'react';
import Link from "next/link";
import {MdCreate} from "react-icons/md";
import {BiLogIn} from "react-icons/bi";

type Props = {};

export function AuthButton(props: Props) {
  return (
    <>
      <Link href="/auth/signup"
            className="flex items-center justify-center transition-all w-[100px] gap-[5px] bg-t-main/70 text-t-hover-1 rounded-[5px] hover:bg-t-hover-4/70 md:hidden">
        <div className="text-xl pb-[2px]"><MdCreate/></div>
        <span>Sing up</span>
      </Link>
      <Link href="/auth/sign_in"
            className="flex items-center justify-center transition-all w-[100px] gap-[5px] bg-grad-1 text-t-main-2 rounded-[5px] hover:bg-grad-2">
        <div className="text-xl pb-[2px]"><BiLogIn/></div>
        <span>Sing in</span>
      </Link>
    </>
  );
};