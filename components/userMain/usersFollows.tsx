'use client';
import {cn} from "@/utils/twMergeClsx";
import {Database} from "@/lib/database.types";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";

type Profile = Database['public']['Tables']['profiles']['Row']

type Props = {
  profiles: Profile[]
  className?: string
};

export function UsersFollows({profiles, className}: Props) {
  return (
    <div
      className={cn("grid grid-cols-5 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", {
        [className || '']: className
      })}>
      {
        profiles.map((v) => {
          return (
            <div key={v.id} className='flex justify-center flex-col items-center'>
              <Link
              href={'/'}>
                <div className="overflow-hidden rounded-full h-[110px] w-[110px] bg-t-main">
                  {
                    (v.folder && v.avatar)
                      ?
                      <Image
                        className="h-full w-full object-cover"
                        src={`avatars/${v.folder}/${v.avatar}`}
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
              </Link>
            </div>
          );
        })
      }
    </div>
  );
}