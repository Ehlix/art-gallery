import {Metadata} from "next";
import {Nav} from "@/components/nav";
import Image from "next/image";
import {HiMapPin} from "react-icons/hi2";
import {PiLinkBold} from "react-icons/pi";
import {UserNav} from "@/components/userNav";
import React, {Suspense} from "react";

export const metadata: Metadata = {
  title: 'Art',
  description: 'App gallery',
};

export default function RootLayout({
                                     children,params
                                   }: {
  children: React.ReactNode
  params: { user: string }
}) {
  return (
    <Suspense>
      <div className="relative flex flex-col">
        <div className="relative flex justify-center items-center w-full overflow-hidden h-[30vw]">
          <Image
            src="/123.jpg"
            alt="profile image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full object-cover object-center h-[40vh]]"
          />
          <div className="absolute h-full w-full bg-grad-5"></div>

          <div className="text-t-hover-4 text-[14px] mb-[30px] item-end self-end absolute flex flex-col justify-center items-center">
            <div className="relatives rounded-full w-[100px] h-[100px] bg-t-main mb-5"></div>
            <h3 className='font-bold capitalize text-t-hover-1 text-[33px]'>{params.user}</h3>
            <span>Small description</span>
            <div className="flex"><span className="mr-1">Location</span><HiMapPin/></div>
            <div className="flex text-t-hover-5 hover:text-t-hover-6 transition-all"><a className="mr-1"
                                                                                        href="https://google.com">google.com</a><PiLinkBold/></div>
          </div>
        </div>

      </div>
      <UserNav username={params.user}/>
      {children}
    </Suspense>

  );
}