'use client';
import Image from "next/image";
import Link from "next/link";
import {MdBookmarkBorder, MdFavoriteBorder, MdPersonAdd} from "react-icons/md";
import React from "react";
import {ArtworkProfileData} from "@/app/artwork/[id]/page";
import {Database} from "@/lib/database.types";
import ArtworkComments from "@/components/artwork/artworkComments";

type ArtType2 = Database['public']['Tables']['artworks']['Row']


type Props = {
  artwork: ArtType2
  artworkData: ArtworkProfileData
};

export function ArtworkMain({artwork, artworkData}: Props) {
  function createdAt(): string {
    const dateNow = new Date();
    const dateCreate = new Date(artwork.created_at);
    const month = dateNow.getMonth() - dateCreate.getMonth();

    if (month <= 0) {
      const day = dateNow.getDate() - dateCreate.getDate();
      if (day <= 0) {
        return 'Posted today';
      }
      if (day === 1) {
        return 'Posted yesterday';
      }
      return `Posted ${day} days ago`;
    }
    if (month === 1) {
      return 'Posted last month';
    }
    return `Posted ${month} months ago`;
  }


  return (
    <div className="flex h-[100%] w-[100%] gap-[20px] md:flex-col">
      <div
        className="h-fit overflow-hidden bg-t-main/20 w-[100%] rounded-[5px] md:order-2">
        {artwork.files?.map(v => {
          return (
            <Image key={v} src={`artworks/${artwork.folder}/${v}`} alt="art"
                   className="w-[100%]"
                   height={1000}
                   width={1000}/>
          );
        })}
      </div>
      <div className="flex flex-col gap-[20px] h-fit w-[600px] md:w-[100%]">
        <div
          className="flex h-fit flex-col p-[20px] bg-t-main/20 rounded-[5px] gap-[20px]">
          <div className="flex gap-[20px]">
            <Link href={`/${artworkData.site}`}
                  className="overflow-hidden rounded-full h-[110px] w-[110px] bg-t-main">
              {artworkData.avatarLink
                ?
                <Image
                  className="h-full w-full object-cover"
                  src={artworkData.avatarLink}
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
            </Link>
            <div className="flex justify-center flex-col">
              <Link href={`/${artworkData.site}`}>
              <span className="text-t-hover-1 text-[25px]">
                {artworkData.name}
              </span>
              </Link>
              {artworkData.website &&
                <span className="text-[18px]">
                {artworkData.website}
                </span>
              }
            </div>
          </div>
          <button
            className="flex items-center justify-center bg-none transition-all duration-300 mt-[-10px] border-t-hover-2 border-[1px] text-t-hover-2 text-[16px] h-[25px] min-w-[100px] gap-[5px] rounded-[3px] hover:border-t-hover-3 hover:text-t-hover-3">
            <div className="text-xl pb-[2px]">
              <MdPersonAdd/>
            </div>
            <span>
              Follow
            </span>
          </button>
          <div className="flex justify-between gap-[20px]">
            <button
              className="flex grow items-center justify-center transition-all duration-300 text-t-main-2 min-w-[100px] gap-[5px] bg-t-hover-5 rounded-[3px] h-[35px] hover:bg-t-hover-6">
              <div className="text-xl pb-[2px]">
                <MdFavoriteBorder/>
              </div>
              <span>
                Like
              </span>
            </button>
            <button
              className="flex grow items-center justify-center transition-all duration-300 text-t-main-2 min-w-[100px] gap-[5px] bg-t-main rounded-[3px] h-[35px] hover:bg-t-hover-1/70">
              <div className="text-xl pb-[2px]">
                <MdBookmarkBorder/>
              </div>
              <span>
                Save
              </span>
            </button>
          </div>
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-t-hover-1 text-[25px]">
              {artwork.title}
            </h2>
            <p>
              {artwork.description}
            </p>
          </div>
          <p className="italic text-[14px]">
            {createdAt()}
          </p>
        </div>
        <ArtworkComments/>
        <div className="flex flex-col h-fit p-[20px] bg-t-main/20 rounded-[5px] gap-[10px]">
          <span>Tags</span>
          <div className='flex gap-[10px]'>
            {artwork.medium?.map((v)=>{
              return (
                <Link href='/'
                      key={v}
                      className='bg-t-main/80 text-[18px] p-[5px] leading-none px-[10px] rounded-[4px] text-t-main-2 hover:bg-t-hover-4 transition-all duration-300'>
                  {`#${v}`}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}