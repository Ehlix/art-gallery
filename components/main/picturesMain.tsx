'use client';
import * as React from "react";
import {useEffect, useState} from "react";
import {Database} from "@/lib/database.types";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {UsersPictures} from "@/components/userMain/usersPictures";

type Profile = Database['public']['Tables']['profiles']['Row']
type Artwork = Database['public']['Tables']['artworks']['Row'] & {
  profile: Profile
}

type Props = {
  artworksCount: number
}

export const PicturesMain = ({artworksCount}: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [rangeFrom, setRangeFrom] = useState<number>(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const supabase = createClientComponentClient<Database>();

  const getArtworks = async function (rangeFrom: number, step: number): Promise<Artwork[]> {
    console.log('getArtworks');
    const newArtworks: Artwork[] = [];
    const {data: artworks} = await supabase.from('artworks').select().range(rangeFrom, rangeFrom + step);
    // const {data: artworks} = await supabase.from('artworks').select('*, artworks_likes(*)').order('created_at', {ascending: false}).range(rangeFrom, rangeFrom + step);
    if (artworks) {
      for (const artwork of artworks) {
        const {data: profile} = await supabase.from('profiles').select().eq('user_id', artwork.user_id);
        if (profile) {
          newArtworks.push({...artwork, profile: profile[0]});
        }
      }
    }
    return newArtworks || [];
  };

  useEffect(() => {
    if (artworksCount <= rangeFrom) return;
    if (loading) {
      console.log('fetching');
      getArtworks(rangeFrom, 9).then(value => {
        const newRange = rangeFrom + 10;
        setArtworks([...artworks, ...value]);
        setRangeFrom(newRange);
      }).finally(() => setLoading(false));
    }
  }, [loading]);


  return (
    <>
      {
        (artworks.length > 0) &&
        <UsersPictures artworks={artworks}
                       setLoading={setLoading}
                       className={"grid-cols-6 xs:grid-cols-1 gap-2 sm:gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}/>
      }
    </>

  );
};