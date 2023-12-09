import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {useEffect, useState} from "react";
import {Database} from "@/lib/database.types";
import {cn} from "@/utils/twMergeClsx";
import {createClientComponentClient, SupabaseClient} from "@supabase/auth-helpers-nextjs";
import {RiLoader3Line} from "react-icons/ri";


type Profile = Database['public']['Tables']['profiles']['Row']
type Artwork = Database['public']['Tables']['artworks']['Row'] & {
  profile: Profile
}

type Props = {
  className?: string
  artworksCount: number
  getArtworks: (supabase: SupabaseClient, rangeFrom: number, step: number) => Promise<Artwork[]>
};


export const RenderPictures = ({className, artworksCount, getArtworks}: Props) => {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<boolean>(true);
  const [rangeFrom, setRangeFrom] = useState<number>(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const scrollHandler = function (e: Event) {
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
    if (artworksCount <= rangeFrom) {
      return setLoading(false);
    }
    if (loading) {
      console.log('fetching');
      getArtworks(supabase, rangeFrom, 5).then(value => {
        const newRange = rangeFrom + 6;
        setArtworks([...artworks, ...value]);
        setRangeFrom(newRange);
      }).finally(() => setLoading(false));
    }
  }, [loading]);

  useEffect(() => {
    const body = document.body;
    if (!loading && (artworksCount > rangeFrom) && (body.offsetHeight >= body.scrollHeight)) {
      setLoading(true);
    }
  }, [loading]);

  return (
    <>
      <div
        className={cn("grid grid-cols-5 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", {
          [className || '']: className
        })}>
        {
          artworks.map((v) => {
            return (
              <Link
                href={`/artwork/${v.id}`}
                key={v.id}
                className="relative flex h-full w-full cursor-pointer flex-col justify-end overflow-hidden transition-all group aspect-[1/1] rounded-md bg-t-main">
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
                      {
                        (v.profile.folder && v.profile.avatar)
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
      <div
        className={cn("p-2 flex gap-1 justify-center items-center text-xl text-t-main", {
          'hidden': !loading
        })}>
        Loading
        <span className="animate-spin text-t-hover-2">
          <RiLoader3Line size={30}/>
        </span>
      </div>
    </>
  );
};