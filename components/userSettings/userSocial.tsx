'use client';
import React, {useState} from "react";
import {SocialObject} from "@/components/newProfile/newProfileMain";
import {Social} from "@/components/newProfile/social";
import {cutNameFromSite} from "@/utils/utils";

type Props = {
  socialObject: SocialObject | null
};

export function UserSocial({socialObject}: Props) {
  const [isLoading] = useState<boolean>(false);
  const [social, setSocial
  ] = useState<SocialObject>({
    publicEmail: cutNameFromSite(socialObject?.publicEmail || ''),
    website: socialObject?.website || '',
    twitter: socialObject?.twitter || '',
    facebook: socialObject?.facebook || '',
    instagram: socialObject?.instagram || '',
  });

  return (
    <div className="flex flex-col items-end gap-5 md:items-center">
      <button
        disabled={isLoading}
        // onClick={handleSubmit(onSubmit)}
        className="mt-2 flex w-fit items-center justify-center rounded-md px-16 pb-1 font-medium leading-none transition-all duration-200 bg-t-hover-2 text-t-main-2 h-[40px] hover:bg-t-hover-3 disabled:bg-t-main disabled:text-t-hover-1">
        {isLoading ? 'Loading..' : 'Save'}
      </button>
      <Social social={social} setSocial={setSocial}
              customClassName="flex h-full flex-col gap-5 rounded-md p-10 text-lg bg-t-main/20 w-[70vw] md:w-full lg:w-[60vw] lg:p-5 lg:pb-10 sm:pb-10 md:pb-10"/>
    </div>
  );
}