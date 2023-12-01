'use client';
import * as React from "react";
import {useEffect, useState} from "react";
import {Database} from "@/lib/database.types";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {UsersPictures} from "@/components/userMain/usersPictures";

type Artwork = Database['public']['Tables']['artworks']['Row']

type Props = {
  artworksCount: number
}

export const PicturesMain = ({artworksCount}: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [rangeFrom, setRangeFrom] = useState<number>(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const supabase = createClientComponentClient<Database>();

  async function getArtworks(rangeFrom: number, step: number): Promise<Artwork[]> {
    console.log('getArtworks')
    const {data: artworks} = await supabase.from('artworks').select('*, artworks_likes(*)').range(rangeFrom, rangeFrom + step);
    // const {data: artworks} = await supabase.from('artworks').select('*, artworks_likes(*)').order('created_at', {ascending: false}).range(rangeFrom, rangeFrom + step);
    return artworks || [];
  }

  useEffect(() => {
    if (loading) {
      console.log('fetching')
      getArtworks(rangeFrom, 20).then(value=>{
        setArtworks(value)
        setRangeFrom(value.length)
        setLoading(false)
      })
    }
  }, [loading]);


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  function scrollHandler(e: Event) {
    const target = e.currentTarget as Document;
    if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < window.innerHeight / 4 && artworksCount > rangeFrom) {
      setLoading(true)
    }
  }

  return (
    <UsersPictures artworks={artworks} className={"grid-cols-6 xs:grid-cols-1 gap-2 sm:gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}/>
  );
};