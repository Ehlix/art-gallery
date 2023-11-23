'use client';
import Image from "next/image";
import Link from "next/link";
import {MdBookmarkBorder, MdFavoriteBorder, MdPersonAdd} from "react-icons/md";
import React from "react";
import {ArtworkProfileData} from "@/app/artwork/[id]/page";
import {Database} from "@/lib/database.types";
import ArtworkComments from "@/components/artwork/artworkComments";
import {User} from "@supabase/auth-helpers-nextjs";

type ArtType = Database['public']['Tables']['artworks']['Row']


type Props = {
  artwork: ArtType
  artworkData: ArtworkProfileData
  currentUser: User | null
};

export function ArtworkMain({artwork, artworkData, currentUser}: Props) {
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
    <div className="flex h-full w-full gap-5 md:flex-col">
      <div
        className="flex h-full w-full flex-col gap-5 overflow-hidden rounded-md md:order-2">
        {artwork.files?.map(v => {
          return (
            <div key={v}
                 className="flex w-full items-center justify-center overflow-hidden rounded-md bg-t-main/20 min-h-[250px] max-h-2000px">
              <Image src={`artworks/${artwork.folder}/${v}`} alt="art"
                     className="h-full w-full object-contain"
                     height={1000}
                     width={1000}/>
            </div>
          );
        })}
      </div>
      <div className="flex h-fit flex-col gap-5 w-[600px] md:w-full">
        <div
          className="flex h-fit flex-col gap-5 rounded-md p-5 bg-t-main/20">
          <div className="flex gap-5">
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
            <div className="flex flex-col justify-center">
              <Link href={`/${artworkData.site}`}>
              <span className="text-2xl text-t-hover-1">
                {artworkData.name}
              </span>
              </Link>
              {artworkData.website &&
                <span className="text-lg">
                {artworkData.website}
                </span>
              }
            </div>
          </div>
          <button
            className="flex items-center justify-center gap-1 rounded-sm border bg-none text-base transition-all duration-300 border-t-hover-2 text-t-hover-2 h-[28px] min-w-[100px] hover:border-t-hover-3 hover:text-t-hover-3">
            <div className="text-xl">
              <MdPersonAdd/>
            </div>
            <span>
              Follow
            </span>
          </button>
          <div className="flex justify-between gap-5">
            <button
              className="flex grow items-center justify-center gap-1 rounded-sm transition-all duration-300 text-t-main-2 min-w-[100px] bg-t-hover-5 h-[35px] pb-0.5 hover:bg-t-hover-6">
              <div className="text-xl">
                <MdFavoriteBorder/>
              </div>
              <span>
                Like
              </span>
            </button>
            <button
              className="flex grow items-center justify-center gap-1 rounded-sm transition-all duration-300 text-t-main-2 min-w-[100px] bg-t-main h-[35px] pb-0.5 hover:bg-t-hover-1/70">
              <div className="text-xl">
                <MdBookmarkBorder/>
              </div>
              <span>
                Save
              </span>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl text-t-hover-1">
              {artwork.title}
            </h2>
            <p>
              {artwork.description}
            </p>
          </div>
          <p className="text-sm italic">
            {createdAt()}
          </p>
        </div>
        <ArtworkComments
          artwork_id={artwork.id}
          currentUser={currentUser}/>
        <div className="flex h-fit flex-col gap-2 rounded-md p-5 bg-t-main/20">
          <span>Tags</span>
          <div className="flex gap-2">
            {artwork.medium?.map((v) => {
              return (
                <Link href="/"
                      key={v}
                      className="rounded-sm p-1 px-2 text-lg leading-none transition-all duration-300 bg-t-main/80 text-t-main-2 hover:bg-t-hover-4">
                  {`#${v}`}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}