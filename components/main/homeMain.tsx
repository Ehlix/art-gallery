'use client';
import * as React from "react";
import {Database} from "@/lib/database.types";
import {RenderPictures} from "@/components/renderPictures";
import {SupabaseClient} from "@supabase/auth-helpers-nextjs";


type Artwork = Database['public']['Tables']['artworks']['Row'] & {
  profile: Database['public']['Tables']['profiles']['Row']
}

type Props = {
  artworksCount: number
  dateStart: string
}

const HomeMain = ({artworksCount, dateStart}: Props) => {

  const getArtworks = async function (supabase: SupabaseClient, rangeFrom: number, step: number): Promise<Artwork[]> {
    console.log('getArtworks');
    const newArtworks: Artwork[] = [];
    const {data: artworks} = await supabase.from('artworks').select().range(rangeFrom, rangeFrom + step).lte('created_at', dateStart);
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
  if (artworksCount) {
    return (
      <>
        <RenderPictures artworksCount={artworksCount}
                        getArtworks={getArtworks}
                        className={"grid-cols-6 xs:grid-cols-1 gap-2 sm:gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}/>
      </>
    );
  }
};
export default HomeMain;