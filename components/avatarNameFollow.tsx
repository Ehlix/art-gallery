'use client';
import Link from "next/link";
import Image from "next/image";
import {FollowButton} from "@/components/followButton";
import React, {useEffect, useState} from "react";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";


type Props = {
  profile: Database['public']['Tables']['profiles']['Row']
  currentUser: User | null
  site: string
  isFollow?: boolean
};

const AvatarNameFollow = ({
                            profile,
                            site,
                            currentUser,
                            isFollow
                          }: Props) => {
  const [firstLoad, setFirstLoad] = useState<boolean>(isFollow === undefined);
  const [isFollowed, setFollowed] = useState<boolean>(isFollow !==undefined ? isFollow: false);
  const supabase = createClientComponentClient<Database>();
  useEffect(() => {
    if (isFollow !== undefined) return
    !currentUser
      ? setFirstLoad(false)
      :
      supabase.from('users_followers').select().match({
        user_id: profile.user_id,
        follower_id: currentUser.id,
      }).then(res => {
        (res.data && res.data[0]) ? (setFollowed(true), setFirstLoad(false)) : setFirstLoad(false);
      });
  }, [firstLoad]);

  return (
    site && !firstLoad &&
    <div className="flex gap-5">
      <Link
        href={`/${site}`}
        className="overflow-hidden rounded-full min-h-[110px] h-[110px] min-w-[110px] bg-t-main w-[110px]">
        {(profile.folder && profile.avatar)
          ?
          <Image
            className="h-full w-full object-cover"
            src={`avatars/${profile.folder}/${profile.avatar}`}
            alt="avatar"
            priority={true}
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
        <Link
          href={`/${site}`}>
              <span className="text-2xl text-t-hover-1">
                {profile.name}
              </span>
        </Link>
        {profile.headline &&
          <span className="text-lg">
                {profile.headline}
                </span>
        }
        {profile.user_id !== currentUser?.id
          &&
          <FollowButton
            userId={profile.user_id}
            currentUser={currentUser}
            isFollow={isFollowed}/>
        }
      </div>
    </div>
  );
};

export default AvatarNameFollow;