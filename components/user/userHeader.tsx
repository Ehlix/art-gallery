import * as React from 'react';
import Image from "next/image";
import {HiMapPin} from "react-icons/hi2";
import {PiLinkBold} from "react-icons/pi";

export type HeaderDataType = {
  userName: string
  imageSrc: string
  description: string
  location: string
  userSite: string
}

type Props = {
  headerData: HeaderDataType;
};

export function UserHeader({headerData}: Props) {
  return (
    <div
      className="relative flex justify-around overflow-hidden w-[100%] h-[300px]">
      <Image
        src={headerData.imageSrc}
        alt="profile image"
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover object-center w-[100%] h-[300px]"
      />
      <div className="absolute h-full w-full bg-grad-5"></div>
      <div
        className="absolute flex flex-col items-center self-end px-[1px] text-t-hover-4 text-[14px] mb-[25px] item-end lg:mb-[15px]">
        <div
          className="mb-5 rounded-full relatives w-[100px] h-[100px] bg-t-main"></div>
        <div className="flex flex-col items-center">
          <h2
            className="font-bold capitalize text-t-hover-1 text-[33px]">{headerData.userName}</h2>
          <span>{headerData.description}</span>
          <div className="flex">
            <span className="mr-1">{headerData.location}</span>
            <HiMapPin/>
          </div>
          <div className="flex transition-all text-t-hover-5 hover:text-t-hover-6">
            <a
              target='_blank'
              className="flex"
              href={"https://" + headerData.userSite}>
              {headerData.userSite}
              <PiLinkBold/>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}