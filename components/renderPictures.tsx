import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Database } from "@/lib/database.types";
import { cn } from "@/utils/twMergeClsx";
import {
  createClientComponentClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { MdEdit } from "react-icons/md";
import { RemoveConfirmation } from "@/components/removeConfirmation";
import { LoadingSpinner } from "@/components/loadingSpinner";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Artwork = Database["public"]["Tables"]["artworks"]["Row"] & {
  profile: Profile;
};

type Props = {
  className?: string;
  artworksCount: number;
  mode?: "edit";
  getArtworks: (
    supabase: SupabaseClient,
    rangeFrom: number,
    step: number,
    filter: string,
  ) => Promise<Artwork[]>;
  filter?: string;
};

export const RenderPictures = ({
  className,
  artworksCount,
  getArtworks,
  mode,
  filter,
}: Props) => {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<boolean>(true);
  const [rangeFrom, setRangeFrom] = useState<number>(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const scrollHandler = function (e: Event) {
    const target = e.currentTarget as Document;
    if (
      target.documentElement.scrollHeight -
        (target.documentElement.scrollTop + window.innerHeight) <
      window.innerHeight / 4
    ) {
      loading && setLoading(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (artworksCount <= rangeFrom) {
      return setLoading(false);
    }

    const body = document.body;
    if (!loading && body.scrollHeight - body.offsetHeight < 350) {
      return setLoading(true);
    }

    if (loading) {
      console.log("fetching");
      getArtworks(supabase, rangeFrom, 5, filter || "")
        .then((value) => {
          const newRange = rangeFrom + 6;
          setArtworks([...artworks, ...value]);
          setRangeFrom(newRange);
        })
        .finally(() => setLoading(false));
    }
  }, [loading]);

  const deleteHandler = async (confirm: boolean, artwork: Artwork) => {
    if (confirm) {
      console.log("art :", artwork);
      const { error } = await supabase
        .from("artworks")
        .delete()
        .eq("id", artwork.id);
      if (error) {
        return;
      }
      const filesToRemove = artwork.files.map((v) => {
        return `artworks/${artwork.folder}/${v}}`;
      });
      filesToRemove.push(`artworks/${artwork?.folder}/${artwork?.thumbnail}`);
      const { data } = await supabase.storage
        .from("projects")
        .remove(filesToRemove);
      console.log(data);
    }
  };

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-5 gap-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1",
          {
            [className || ""]: className,
          },
        )}
      >
        {artworks.map((v) => {
          return mode === "edit" ? (
            <div
              key={v.id}
              className={cn(
                "group relative flex aspect-[1/1.3] h-full w-full flex-col justify-end overflow-hidden rounded-sm transition-all",
              )}
            >
              <Image
                src={`artworks/${v.folder}/${v.thumbnail}`}
                alt={v.title}
                className="h-full w-full object-cover object-center"
                priority={true}
                height={10}
                width={10}
                quality={40}
              />
              <div className="absolute right-0 top-0 flex h-full w-full justify-between p-1 shadow-[inset_0px_100px_50px_-40px_rgba(0,0,0,0.40)] xs:flex-col xs:justify-normal">
                <Link
                  href={`/project/${v.id}`}
                  className="pointer-events-auto flex h-fit w-fit items-center justify-center gap-1 rounded-sm border border-t-hover-1 bg-t-main-2/70 px-3 text-xl text-t-hover-1 transition-all duration-300 hover:border-t-hover-3 hover:text-t-hover-3"
                >
                  <MdEdit size={20} />
                  <span>Edit</span>
                </Link>
                <RemoveConfirmation
                  callback={(t) => deleteHandler(t, v)}
                  className={""}
                />
              </div>
              <div className="h-[full] w-full bg-t-main p-1 text-base text-t-main-2">
                {v.title}
              </div>
            </div>
          ) : (
            <Link
              href={mode ? `/project/${v.id}` : `/artwork/${v.id}`}
              key={v.id}
              className={cn(
                "group relative flex aspect-[1/1] h-full w-full cursor-pointer flex-col justify-end overflow-hidden rounded-md bg-t-main transition-all",
              )}
            >
              <Image
                src={`artworks/${v.folder}/${v.thumbnail}`}
                alt={v.title}
                className="h-full w-full object-cover object-center"
                priority={true}
                height={10}
                width={10}
                quality={20}
              />
              <div className="absolute left-0 top-0 z-20 flex h-full w-full flex-col">
                <div className="h-full w-full"></div>
                <div className="relative top-full z-20 flex h-fit w-full items-center gap-2 p-2 px-2 pt-10 opacity-0 shadow-[inset_0px_-100px_35px_-50px_rgba(0,0,0,0.60)] transition-all duration-500 ease-in-out group-hover:top-0 group-hover:opacity-100 md:hidden ">
                  {v.profile.folder && v.profile.avatar ? (
                    <Image
                      src={`avatars/${v.profile?.folder}/${v.profile?.avatar}`}
                      alt="navigation profile image"
                      priority={true}
                      width={100}
                      height={100}
                      quality={40}
                      className="h-[40px] w-[40px] rounded-full object-cover object-center"
                    />
                  ) : (
                    <Image
                      unoptimized
                      priority={true}
                      src="/default_avatar.png"
                      alt="navigation profile image"
                      width={100}
                      height={100}
                      quality={40}
                      className="h-[40px] w-[40px] rounded-full object-cover object-center"
                    />
                  )}
                  <div className="flex flex-col items-start text-sm text-t-hover-1">
                    <p className="font-bold leading-none -tracking-tight">
                      {v.title}
                    </p>
                    <p className="text-xs leading-5 text-t-hover-1/70">
                      {v.profile.name}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <LoadingSpinner isLoading={loading} />
    </>
  );
};
