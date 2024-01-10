'use client';
import * as React from "react";
import {useEffect, useState} from "react";
import {Database} from "@/lib/database.types";
import {RenderPictures} from "@/components/renderPictures";
import {createClientComponentClient, SupabaseClient} from "@supabase/auth-helpers-nextjs";
import {FilterList} from "@/components/main/filterList";
import {useSearchParams} from "next/navigation";
import {SUBJECTS} from "@/lib/categories_data";
import {MdSentimentVeryDissatisfied} from "react-icons/md";
import {cn} from "@/utils/twMergeClsx";


type Artwork = Database['public']['Tables']['artworks']['Row'] & {
  profile: Database['public']['Tables']['profiles']['Row']
}

type Props = {
  dateStart: string
}

export const HomeMain = ({dateStart}: Props) => {
  const [filter, setFilter] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const [notFounded, setNotFounded] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const param = searchParams.get('subject');
    const ff = SUBJECTS.filter((v) => v.params === param);
    setFilter(ff[0]?.name || '');
  }, [searchParams]);

  useEffect(() => {
    setCount(0);
    supabase
      .from('artworks')
      .select('*', {count: 'exact'})
      .lte('created_at', dateStart)
      .contains('subject', [filter])
      .then(({count}) => {
        count === 0 ? setNotFounded(true) : setNotFounded(false);
        setCount(count || 0);
      });
  }, [filter]);


  const getArtworks = async (supabase: SupabaseClient<Database>, rangeFrom: number, step: number, filter: string): Promise<Artwork[]> => {
    console.log('getArtworks');
    const newArtworks: Artwork[] = [];
    const {data: artworks} = await supabase
      .from('artworks')
      .select()
      .range(rangeFrom, rangeFrom + step)
      .lte('created_at', dateStart)
      .contains('subject', [filter]);

    if (artworks && (artworks.length > 0)) {
      for (const artwork of artworks) {
        const {data: profile} = await supabase
          .from('profiles')
          .select()
          .eq('user_id', artwork.user_id);
        if (profile) {
          newArtworks.push({...artwork, profile: profile[0]});
        }
      }
    }
    return newArtworks || [];
  };

  return (
    <div className={'flex flex-col gap-2 sm:gap-1'}>
      <FilterList/>
      {
        (count && filter !== null)
          ?
          <RenderPictures filter={filter}
                          artworksCount={count}
                          getArtworks={getArtworks}
                          className={"grid-cols-6 xs:grid-cols-1 gap-2 sm:gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}/>
          :
          <div>
          </div>
      }
      <div className={cn("flex items-center justify-center gap-2 text-xl", {
        'hidden': !notFounded
      })}>
          <span>
            Artworks not found
          </span>
        <MdSentimentVeryDissatisfied size={30}/>
      </div>
    </div>
  );
};