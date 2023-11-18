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
      className="relative flex w-full justify-around overflow-hidden h-[350px]">
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
        className="absolute mb-6 flex flex-col items-center gap-3 self-end px-1 text-sm text-t-hover-4 item-end lg:mb-sm">
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
        <div className="flex flex-col items-center gap-1">
          <h2
            className="text-4xl font-bold capitalize text-t-hover-1">{headerData.username}
          </h2>
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