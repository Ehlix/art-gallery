import Link from "next/link";
import React from "react";
import {BiLogIn} from "react-icons/bi";
import {MdCreate} from "react-icons/md";
import {ImSearch} from "react-icons/im";

export const Nav = () => {
  return (
    <>
      <nav
        className="text-t-main z-50 fixed top-0 flex w-full items-center justify-between px-[3vh] py-[17px]  bg-t-main-2 gap-[33px] min-h-[60px] no-wrap">
        <Link href="/"
              className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            ">Home</Link>
        <Link href="/"
              className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            ">Blogs</Link>
        <Link href="/"
              className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            ">Shop</Link>
        <Link href="/"
              className="relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-[100%] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[3px] hover:before:rounded-[5px] hover:before:bg-grad-1
            ">Jobs</Link>
        <div
          className="flex grow items-center rounded-full bg-neutral-800 group h-[35px] bg-grad-1">
          <div
            className="absolute text-lg transition-all group-focus-within:text-t-hover-2 pl-[12px]">
            <ImSearch/></div>
          <input type="text"
                 className="w-full h-full grow rounded-full bg-t-main-2 text-sm outline-none transition pl-[40px] border-t-main placeholder:text-t-main/30
               border-[3px] focus:box-decoration-clone focus:border-t-hover-2 hover:border-t-hover-1"
                 placeholder="Search"></input>
        </div>
        <div className="flex w-auto gap-[20px] h-[35px] text-[15px]">
          <Link href="/"
                className="flex items-center justify-center transition-all w-[100px] gap-[5px] bg-t-main/70 text-t-hover-1 rounded-[5px] hover:bg-t-hover-4/70">
            <div className="text-xl pb-[2px]"><MdCreate/></div>
            <span>Sing up</span>
          </Link>
          <Link href="/"
                className="flex items-center justify-center transition-all w-[100px] gap-[5px] bg-grad-1 text-t-main-2 rounded-[5px] hover:bg-grad-2">
            <div className="text-xl pb-[2px]"><BiLogIn/></div>
            <span>Sing in</span>
          </Link>
        </div>
      </nav>
      <div
        className="text-t-main top-0 w-full py-[20px] bg-t-main-2 gap-[33px] min-h-[69px] no-wrap">

      </div>
    </>
  );
};