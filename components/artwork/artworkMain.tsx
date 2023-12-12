'use client';
import Image from "next/image";
import Link from "next/link";
import {MdClose, MdFullscreen} from "react-icons/md";
import React from "react";
import {CurrentUserSocialActivity} from "@/app/artwork/[id]/page";
import {Database} from "@/lib/database.types";
import ArtworkComments from "@/components/artwork/artworkComments";
import Env from "@/lib/env";
import {ArtworkLike} from "@/components/artwork/artworkLike";
import {ArtworkBookmark} from "@/components/artwork/artworkBookmark";
import AvatarNameFollow from "@/components/avatarNameFollow";
import {User} from "@supabase/auth-helpers-nextjs";

type ArtType = Database['public']['Tables']['artworks']['Row']


type Props = {
  artwork: ArtType
  artworkProfileData: Database['public']['Tables']['profiles']['Row']
  currentUser: User | null
  currentUserSocialActivity: CurrentUserSocialActivity
  thisProfileUser: Database['public']['Tables']['users']['Row'] | null
};
const ArtworkMain = ({
                       artwork,
                       artworkProfileData,
                       currentUser,
                       currentUserSocialActivity,
                       thisProfileUser
                     }: Props) => {
  const createdAt = (): string => {
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
  };


  return (
    <div className="flex h-full w-full gap-5 md:flex-col">
      <div
        className="flex h-full w-full flex-col gap-5 overflow-hidden rounded-md md:order-2">
        {artwork.files?.map(v => (
            <div key={v}
                 className="relative flex w-full items-center justify-center overflow-hidden rounded-md bg-t-main/20 min-h-[250px] max-h-[2000px]">
              <Image src={`artworks/${artwork.folder}/${v}`}
                     alt="art"
                     priority={true}
                     className="h-full w-full object-contain"
                     height={1000}
                     width={1000}/>
              <div hidden
                   className="pointer-events-none absolute top-0 left-0 flex h-full w-full items-end justify-center gap-2 p-4 leading-none text-t-hover-1 lg:p-2">
                {/*<a*/}
                {/*  download*/}
                {/*  href={`https://${Env.PROJECTS_ID}.supabase.co/storage/v1/object/public/projects/artworks/${artwork.folder}/${v}`}>*/}
                {/*  <MdArrowDownward size={26} className='mb-0.5'/>*/}
                {/*</a>*/}
                <Link
                  className="pointer-events-auto"
                  href={`https://${Env.PROJECTS_ID}.supabase.co/storage/v1/object/public/projects/artworks/${artwork.folder}/${v}`}
                  target={'_blank'}>
                  <MdFullscreen size={30}/>
                </Link>
              </div>
            </div>
          )
        )}
      </div>
      <div className="relative flex h-fit flex-col gap-5 w-[600px] md:w-full">
        <div
          className="flex h-fit flex-col gap-5 rounded-md p-5 bg-t-main/20">
          <div className='absolute top-0 right-0 p-2 hover:text-t-hover-1 transition duration-300'>
            <Link
              // @ts-expect-error
              href={`/${thisProfileUser?.metadata?.site || '/'}`}
              >
              <MdClose size={25}/>
            </Link>
          </div>

          <AvatarNameFollow profile={artworkProfileData}
            // @ts-expect-error
                            site={thisProfileUser?.metadata?.site || "/"}
                            currentUser={currentUser}
                            isFollow={!!currentUserSocialActivity.follow}/>
          <div className="flex flex-wrap justify-between gap-5">
            <ArtworkLike
              artworkId={artwork.id}
              currentUser={currentUser}
              like={!!currentUserSocialActivity.like}/>
            <ArtworkBookmark
              artwork_id={artwork.id}
              currentUser={currentUser}
              bookmarks={!!currentUserSocialActivity.bookmark}/>
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
          <span className="text-xl">
            Tags
          </span>
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
};

export default ArtworkMain;