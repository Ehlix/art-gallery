import Image from "next/image";
import Link from "next/link";
import {ProfileData} from "@/app/[username]/page";
import * as React from "react";

type Props = {
  artworks: any[]
  profileData: ProfileData
};

export function UserPictures({artworks, profileData}: Props) {
  return (
    <div
      className="grid grid-cols-5 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {
        artworks.map((a) => {
          return (
            <Link
              href={`/artwork/${a.id}`}
              key={a.id}
              className="relative transition-all cursor-pointer overflow-hidden group aspect-[1/1] flex flex-col justify-end rounded-[5px] w-full h-full bg-t-main">
              <Image src={`artworks/${a.folder}/${a.thumbnail}`}
                     alt={a.id}
                     className="h-full w-full"
                     height={10}
                     width={10}/>
              <div className="absolute top-0 left-0 z-20 flex h-full w-full flex-col">
                <div className="h-full w-full"></div>
                <div
                  className="shadow-[inset_0px_-100px_35px_-50px_rgba(0,0,0,0.60)] relative z-20 flex h-fit w-full items-center opacity-0 transition-all ease-in-out top-full gap-2 duration-500 px-2 p-2 pt-10 group-hover:top-0 group-hover:opacity-100 md:hidden">
                  {profileData.avatarLink
                    ?
                    <Image
                      src={profileData.avatarLink}
                      alt="navigation profile image"
                      width={100}
                      height={100}
                      className="rounded-full object-cover object-center w-[40px] h-[40px]"/>
                    :
                    <Image
                      unoptimized
                      src="/default_avatar.png"
                      alt="navigation profile image"
                      width={100}
                      height={100}
                      className="rounded-full object-cover object-center w-[40px] h-[40px]"/>
                  }
                  <div className="flex flex-col items-start text-t-hover-1 text-sm">
                    <p className="font-bold leading-none -tracking-tight">
                      {a.title}
                    </p>
                    <p
                      className="leading-5 text-t-hover-1/70 text-xs">
                      {profileData.name}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      }
    </div>
  );
}