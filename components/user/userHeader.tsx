import * as React from 'react';
import Image from "next/image";
import {HiMapPin} from "react-icons/hi2";
import {PiLinkBold} from "react-icons/pi";
import {HeaderDataType} from "@/app/[username]/layout";


type Props = {
  headerData: HeaderDataType;
};

export function UserHeader({headerData}: Props) {

  return (
    <div
      className="relative flex justify-around overflow-hidden w-[100%] h-[350px]">
      <div
        className="h-full w-full overflow-hidden min-w-[550px] aspect-[4/1] bg-t-main/50 xl:min-w-[400px]">
        {headerData.coverLink
          ?
          <Image
            className="h-full w-full object-cover"
            src={headerData.coverLink}
            alt="avatar"
            height={800}
            width={800}/>
          :
          <Image
            unoptimized
            className="h-full w-full object-cover"
            src="/default_cover.png"
            alt="avatar"
            height={800}
            width={800}/>
        }
      </div>
      <div className="absolute h-full w-full bg-grad-5"></div>
      <div
        className="absolute flex flex-col items-center self-end gap-[10px] px-[1px] text-t-hover-4 text-[14px] mb-[25px] item-end lg:mb-[15px]">
        <div className="overflow-hidden rounded-full h-[110px] w-[110px] bg-t-main">
          {headerData.avatarLink
            ?
            <Image
              className="h-full w-full object-cover"
              src={headerData.avatarLink}
              alt="avatar"
              height={500}
              width={500}/>
            :
            <Image
              unoptimized
              className="h-full w-full object-cover"
              src="/default_avatar.png"
              alt="avatar"
              height={500}
              width={500}/>
          }
        </div>
        <div className="flex flex-col items-center">
          <h2
            className="font-bold capitalize text-t-hover-1 text-[33px]">{headerData.username}</h2>
          <span>{headerData.headline}</span>
          <div className="flex">
            <span className="mr-1 capitalize">{headerData.city},</span>
            <span className="mr-1 capitalize">{headerData.country}</span>
            <HiMapPin/>
          </div>
          {headerData.website &&
            <div className="flex transition-all text-t-hover-5 hover:text-t-hover-6">
              <a
                target="_blank"
                className="flex"
                href={headerData.website}>
                {headerData.website}
                <PiLinkBold/>
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  );
}