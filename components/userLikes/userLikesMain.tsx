'use client';
import {RenderPictures} from "@/components/renderPictures";
import React, {useEffect, useState} from "react";
import {
  createClientComponentClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";

type User = Database['public']['Tables']['users']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']
type Artwork = Database['public']['Tables']['artworks']['Row'] & {
  profile: Profile
}

type Props = {
  user: User
};

export const UserLikesMain = ({user}: Props) => {
  const supabase = createClientComponentClient<Database>();
  const [dateStart] = useState(new Date().toUTCString());
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(0);
    supabase
      .from('artworks_likes')
      .select('*', {count: 'exact'})
      .eq('user_id', user?.id || '')
      .lte('created_at', dateStart)
      .then(({count}) => setCount(count || 0));
  }, []);

  const getArtworks = async (supabase: SupabaseClient, rangeFrom: number, step: number): Promise<Artwork[]> => {
    const newArtworks: Artwork[] = [];
    console.log('getArtworks');
    const {data: likedPictures} = await supabase
      .from('artworks_likes')
      .select('artwork_id')
      .eq('user_id', user?.id || '')
      .order('created_at', {ascending: false})
      .range(rangeFrom, rangeFrom + step)
      .lte('created_at', dateStart);

    if (likedPictures) {
      for (const likedArt of likedPictures) {
        const {data: artworks} = await supabase
          .from('artworks')
          .select()
          .eq('id', likedArt.artwork_id);
        const artwork = artworks ? artworks[0] : null;
        const {data: profile} = await supabase
          .from('profiles')
          .select()
          .eq('user_id', artwork?.user_id || '');
        if (profile && artwork) {
          newArtworks.push({...artwork, profile: profile[0]});
        }
      }
    }
    return newArtworks || [];
  };
  if (count) {
    return (
      <>
        <RenderPictures artworksCount={count} getArtworks={getArtworks}/>
      </>
    );
  }
};