import React from "react";
import Link from "next/link";
import Image from "next/image";
import {ImSearch} from "react-icons/im";
import {LoadingSpinner} from "@/components/loadingSpinner";

const NavSuspense = () => {
  return (
    <>
      <header>
        <>
          <nav
            className="container fixed top-0 z-40 flex w-full select-none items-center justify-between gap-7 no-wrap text-t-main bg-t-main-2 h-[60px] md:h-[45px]">
            <Link href="/public"
                  className="min-w-[40px] min-h-[40px] md:w-[40px] md:absolute md:right-0 md:left-0 md:mx-auto">
              <Image src="/logo.svg" alt="1231" width={100}
                     height={100}
                     sizes="100vw"
                     className="w-[40px] h-[40px]"
                     unoptimized
                     priority={true}/>
            </Link>
            <div className="relative flex w-full items-center gap-7 md:hidden">
              <div className="relative flex justify-center group">
                <Link
                  href="/public"
                  className="capitalize relative decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-full hover:before:w-full hover:before:l-0 hover:before:h-[3px] hover:before:rounded-md hover:before:bg-t-hover-2
            ">
                  Explore
                </Link>
                <div className="absolute top-full -mt-2 hidden flex-col group-hover:flex">
                  <div
                    className="p-3 px-5 gap-3 flex-col flex bg-t-main-3 mt-4 rounded-md hover:*:text-t-hover-1">
                    <Link href={'/?sort_by=trending'}>Trending</Link>
                    <Link href={'/?sort_by=latest'}>Latest</Link>
                  </div>
                </div>
              </div>
              {/*search bar*/}
              <div
                className="relative flex shrink grow items-center rounded-full group h-[35px] bg-grad-1">
                <div
                  className="absolute pl-3 text-base transition-all group-focus-within:text-t-hover-2">
                  <ImSearch/>
                </div>
                <input type="text"
                       placeholder="Search"
                       className="h-full w-full grow rounded-full border-2 pl-9 text-base outline-none transition duration-200 bg-t-main-2 border-t-main placeholder:text-t-main/30 hover:border-t-hover-1 focus:border-t-hover-2 focus:box-decoration-clone"/>
              </div>
            </div>
            <div className="flex items-center justify-center pr-2">
              <LoadingSpinner isLoading={true}/>
            </div>
          </nav>

          <div
            className="relative top-0 w-full min-h-[60px] md:min-h-[45px]">
          </div>
        </>
      </header>
    </>
  );
};

export default NavSuspense;