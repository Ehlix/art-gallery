'use client';
import {cn} from "@/utils/twMergeClsx";
import * as React from "react";
import {useEffect, useState} from "react";
import {Database} from "@/lib/database.types";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";
import AvatarNameFollow from "@/components/avatarNameFollow";
import Image from "next/image";
import Link from "next/link";

type Profile = Database['public']['Tables']['profiles']['Row'] & {
  site: string
  artworks: Database['public']['Tables']['artworks']['Row'][]
  isFollowed: boolean
}

type Props = {
  className?: string
  userFromPage: Database['public']['Tables']['users']['Row']
  currentUser: User | null
  followsCount: number
  filtering: 'following' | 'followers'
  dateStart: string
};

const RenderFollows = ({
                         userFromPage,
                         followsCount,
                         className,
                         filtering,
                         currentUser,
                         dateStart
                       }: Props) => {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<boolean>(true);
  const [rangeFrom, setRangeFrom] = useState<number>(0);
  const [profiles, setProfiles] = useState<Profile[]>([]);


  const getProfiles = async (rangeFrom: number, step: number): Promise<Profile[]> => {
    const newProfiles: Profile[] = [];
    switch (filtering) {
      case ('following') : {
        const {data: follows} = await supabase.from('users_followers').select().order('created_at', {ascending: false}).eq('follower_id', userFromPage.id).range(rangeFrom, rangeFrom + step).lte('created_at', dateStart);
        if (follows) {
          for (const follow of follows) {
            const {data: profiles} = await supabase.from('profiles').select().eq('user_id', follow.user_id);
            const {data: users} = await supabase.from('users').select().eq('id', profiles && profiles[0].user_id || '');
            const {data: artworks} = await supabase.from('artworks').select().eq('user_id', profiles && profiles[0].user_id || '').order('created_at', {ascending: false}).range(0, 1);
            const {data: isFollows} = await supabase.from('users_followers').select().match({
              user_id: profiles && profiles[0].user_id || '',
              follower_id: currentUser?.id || '',
            });
            (profiles && users && artworks) && (
              newProfiles.push({
                ...profiles[0],
                // @ts-expect-error
                site: users[0].metadata?.site,
                artworks: artworks,
                isFollowed: !!(isFollows && isFollows[0])
              })
            );
          }
        }
        return newProfiles;
      }
      case ('followers') : {
        const {data: follows} = await supabase.from('users_followers').select().order('created_at', {ascending: false}).eq('user_id', userFromPage.id).range(rangeFrom, rangeFrom + step).lte('created_at', dateStart);
        if (follows) {
          for (const follow of follows) {
            const {data: profiles} = await supabase.from('profiles').select().eq('user_id', follow.follower_id);
            const {data: users} = await supabase.from('users').select().eq('id', profiles && profiles[0].user_id || ' ');
            const {data: artworks} = await supabase.from('artworks').select().eq('user_id', profiles && profiles[0].user_id || ' ').order('created_at', {ascending: false}).range(0, 1);
            const {data: isFollows} = await supabase.from('users_followers').select().match({
              user_id: profiles && profiles[0].user_id || '',
              follower_id: currentUser?.id || '',
            });
            (profiles && users && artworks) && (
              newProfiles.push({
                ...profiles[0],
                // @ts-expect-error
                site: users[0].metadata?.site,
                artworks: artworks,
                isFollowed: !!(isFollows && isFollows[0]),
              })
            );
          }
        }
        return newProfiles;
      }
    }
  };

  const scrollHandler = (e: Event) => {
    const target = e.currentTarget as Document;
    if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < (window.innerHeight / 4)) {
      loading && setLoading(true);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (followsCount <= rangeFrom) {
      return setLoading(false);
    }
    if (loading) {
      console.log('fetching');
      getProfiles(rangeFrom, 4).then(value => {
        const newRange = rangeFrom + 5;
        setProfiles([...profiles, ...value]);
        setRangeFrom(newRange);
      }).finally(() => setLoading(false));
    }
  }, [loading]);

  useEffect(() => {
    const body = document.body;
    if (!loading && (followsCount > rangeFrom) && (body.offsetHeight >= body.scrollHeight)) {
      setLoading(true);
    }
  }, [loading]);

  return (
    <div
      className={cn("grid grid-cols-4 gap-5 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3", {
        [className || '']: className
      })}>
      {
        profiles.map((v) => {
          return (
            <div key={v.id} className="flex bg-t-main-3 flex-col p-5 gap-5 rounded-md">
              <AvatarNameFollow profile={v} currentUser={currentUser} site={v.site}
                                isFollow={v.isFollowed}/>
              <div className="flex gap-5 items-center justify-center">
                {
                  v.artworks[0] ?
                    <Link key={v.artworks[0].id}
                          href={`/artwork/${v.artworks[0].id}`}
                          className="aspect-square rounded-md h-full w-full overflow-hidden">
                      <Image
                        src={`artworks/${v.artworks[0].folder}/${v.artworks[0].thumbnail}`}
                        alt={v.artworks[0].title}
                        className="h-full w-full object-cover object-center"
                        priority={true}
                        height={10}
                        width={10}
                        quality={20}/>
                    </Link> :
                    <div
                      className="aspect-square rounded-md h-full w-full overflow-hidden"></div>
                }
                {
                  v.artworks[1] ?
                    <Link key={v.artworks[1].id}
                          href={`/artwork/${v.artworks[1].id}`}
                          className="aspect-square rounded-md h-full w-full overflow-hidden">
                      <Image
                        src={`artworks/${v.artworks[1].folder}/${v.artworks[1].thumbnail}`}
                        alt={v.artworks[1].title}
                        className="h-full w-full object-cover object-center"
                        priority={true}
                        height={10}
                        width={10}
                        quality={20}/>
                    </Link> :
                    <div
                      className="aspect-square rounded-md h-full w-full overflow-hidden"></div>
                }
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default RenderFollows;