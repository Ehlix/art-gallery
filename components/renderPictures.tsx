import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {useEffect, useState} from "react";
import {Database} from "@/lib/database.types";
import {cn} from "@/utils/twMergeClsx";
import {createClientComponentClient, SupabaseClient} from "@supabase/auth-helpers-nextjs";
import {RiLoader3Line} from "react-icons/ri";
import {MdEdit} from "react-icons/md";
import RemoveConfirmation from "@/components/removeConfirmation";


type Profile = Database['public']['Tables']['profiles']['Row']
type Artwork = Database['public']['Tables']['artworks']['Row'] & {
  profile: Profile
}

type Props = {
  className?: string
  artworksCount: number
  mode?: 'edit'
  getArtworks: (supabase: SupabaseClient, rangeFrom: number, step: number) => Promise<Artwork[]>
};


const RenderPictures = ({className, artworksCount, getArtworks, mode}: Props) => {
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

    const body = document.body;
    if (!loading && (body.scrollHeight - body.offsetHeight < 350)) {
      return setLoading(true);
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


  const deleteHandler = async (confirm: boolean, artwork: Artwork) => {
    if (confirm) {
      console.log('art :', artwork);
      const {error} = await supabase.from('artworks').delete().eq('id', artwork.id);
      if (error) {
        return;
      }
      const filesToRemove = artwork.files.map((v) => {
        return `artworks/${artwork.folder}/${v}}`;
      });
      filesToRemove.push(`artworks/${artwork?.folder}/${artwork?.thumbnail}`);
      const {data} = await supabase.storage.from('projects').remove(filesToRemove);
      console.log(data);
    }
  };

  return (
    <>
      <div
        className={cn("grid grid-cols-5 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", {
          [className || '']: className
        })}>
        {
          artworks.map((v) => {
            return (
              mode === 'edit'
                ?
                <div key={v.id}
                     className={cn("relative flex h-full w-full flex-col justify-end overflow-hidden transition-all group aspect-[1/1.3] rounded-sm")}>
                  <Image src={`artworks/${v.folder}/${v.thumbnail}`}
                         alt={v.title}
                         className="h-full w-full object-cover object-center"
                         priority={true}
                         height={10}
                         width={10}
                         quality={40}/>
                  <div
                    className="shadow-[inset_0px_100px_50px_-40px_rgba(0,0,0,0.40)] absolute top-0 right-0 flex h-full w-full justify-between p-1 xs:flex-col xs:justify-normal">
                    <Link
                      href={`/project/${v.id}`}
                      className="pointer-events-auto flex h-fit w-fit items-center justify-center gap-1 rounded-sm border px-3 text-xl transition-all duration-300 text-t-hover-1 border-t-hover-1 bg-t-main-2/70 hover:text-t-hover-3 hover:border-t-hover-3">
                      <MdEdit size={20}/>
                      <span>
                            Edit
                          </span>
                    </Link>
                    <RemoveConfirmation callback={(t) => deleteHandler(t, v)}
                                        className={''}/>
                  </div>
                  <div
                    className="w-full p-1 text-base text-t-main-2 bg-t-main h-[full]">
                    {v.title}
                  </div>
                </div>
                :
                <Link
                  href={mode ? `/project/${v.id}` : `/artwork/${v.id}`}
                  key={v.id}
                  className={cn("relative flex h-full w-full cursor-pointer flex-col justify-end overflow-hidden transition-all group aspect-[1/1] rounded-md bg-t-main")}>
                  <Image src={`artworks/${v.folder}/${v.thumbnail}`}
                         alt={v.title}
                         className="h-full w-full object-cover object-center"
                         priority={true}
                         height={10}
                         width={10}
                         quality={40}/>
                  <div
                    className="absolute top-0 left-0 z-20 flex h-full w-full flex-col">
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
                </Link>
            );
          })
        }
      </div>
      {loading
        ?
        <div
          className={cn("h-[40px] flex gap-1 justify-center items-center text-xl text-t-main w-full")}>
          Loading
          <span className="animate-spin text-t-hover-2">
          <RiLoader3Line size={30}/>
        </span>
        </div>
        :
        <div
          className="w-full h-[40px]">
        </div>
      }
    </>
  );
};

export default RenderPictures;