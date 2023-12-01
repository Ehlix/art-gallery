'use client';
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {Database} from "@/lib/database.types";
import {cn} from "@/utils/twMergeClsx";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

type Artworks = Database['public']['Tables']['artworks']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

type Props = {
  artworks: Artworks[]
  profile?: Profile
  className?: string
};

export function UsersPictures({artworks, className}: Props) {
  const supabase = createClientComponentClient<Database>();

  async function getUserProfile(userId: string): Promise<Profile | null> {
    const {data: profile} = await supabase.from('profiles').select().eq('user_id', userId);
    if (profile) {
      return profile[0];
    }
    return null;
  }


  return (
    <div
      className={cn("grid grid-cols-5 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", {
        [`${className}`]: className
      })}>
      {
        artworks.map(async (a) => {
          const profile = await getUserProfile(a.user_id);
          return (
            <Link
              href={`/artwork/${a.id}`}
              key={a.id}
              className="relative flex h-full w-full cursor-pointer flex-col justify-end overflow-hidden transition-all group aspect-[1/1] rounded-[5px] bg-t-main">
              <Image src={`artworks/${a.folder}/${a.thumbnail}`}
                     alt={a.title}
                     className="h-full w-full"
                     priority={true}
                     height={10}
                     width={10}/>
              {
                profile &&
                <div className="absolute top-0 left-0 z-20 flex h-full w-full flex-col">
                  <div className="h-full w-full"></div>
                  <div
                    className="shadow-[inset_0px_-100px_35px_-50px_rgba(0,0,0,0.60)] relative z-20 flex h-fit w-full items-center opacity-0 transition-all ease-in-out top-full gap-2 duration-500 px-2 p-2 pt-10 group-hover:top-0 group-hover:opacity-100 md:hidden">
                    {profile.folder && profile.avatar
                      ?
                      <Image
                        src={`avatars/${profile?.folder}/${profile?.avatar}`}
                        alt="navigation profile image"
                        priority={true}
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
                    <div className="flex flex-col items-start text-sm text-t-hover-1">
                      <p className="font-bold leading-none -tracking-tight">
                        {a.title}
                      </p>
                      <p
                        className="text-xs leading-5 text-t-hover-1/70">
                        {profile.name}
                      </p>
                    </div>
                  </div>
                </div>}
            </Link>
          );
        })
      }
    </div>
  );
}