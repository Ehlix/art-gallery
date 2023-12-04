'use client';
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {useEffect} from "react";
import {Database} from "@/lib/database.types";
import {cn} from "@/utils/twMergeClsx";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

type Artworks2 = Database['public']['Tables']['artworks']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

type Artworks = Artworks2 & {
  profile: Profile
}

type Props = {
  artworks: Artworks[]
  className?: string
  setLoading?: React.Dispatch<boolean>
};


export const UsersPictures = ({artworks, className, setLoading}: Props) => {
  const supabase = createClientComponentClient<Database>();

  async function getUserProfile(userId: string): Promise<Profile | null> {
    const {data: profile} = await supabase.from('profiles').select().eq('user_id', userId);
    if (profile) {
      return profile[0];
    }
    return null;
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = function (e: Event) {
    const target = e.currentTarget as Document;
    if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < (window.innerHeight / 4)) {
      setLoading && setLoading(true);
    }
  };


  return (
    <div
      className={cn("grid grid-cols-5 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", {
        [className || '']: className
      })}>
      {
        artworks.map((v) => {
          // const profile = await getUserProfile(v.user_id);
          return (
            <Link
              href={`/artwork/${v.id}`}
              key={v.id}
              className="relative flex h-full w-full cursor-pointer flex-col justify-end overflow-hidden transition-all group aspect-[1/1] rounded-[5px] bg-t-main">
              <Image src={`artworks/${v.folder}/${v.thumbnail}`}
                     alt={v.title}
                     className="h-full w-full object-cover object-center"
                     priority={true}
                     height={10}
                     width={10}
                     quality={50}/>
              {
                <div className="absolute top-0 left-0 z-20 flex h-full w-full flex-col">
                  <div className="h-full w-full"></div>
                  <div
                    className="shadow-[inset_0px_-100px_35px_-50px_rgba(0,0,0,0.60)] relative z-20 flex h-fit w-full items-center opacity-0 transition-all ease-in-out top-full gap-2 duration-500 px-2 p-2 pt-10 group-hover:top-0 group-hover:opacity-100 md:hidden ">
                    {v.profile.folder && v.profile.avatar
                      ?
                      <Image
                        src={`avatars/${v.profile?.folder}/${v.profile?.avatar}`}
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
                        {v.title}
                      </p>
                      <p
                        className="text-xs leading-5 text-t-hover-1/70">
                        {v.profile.name}
                      </p>
                    </div>
                  </div>
                </div>
              }
            </Link>
          );
        })
      }
    </div>
  );
};