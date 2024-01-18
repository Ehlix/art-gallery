'use client';
import {RenderPictures} from "@/components/renderPictures";
import React, {useEffect, useState} from "react";
import {
  createClientComponentClient,
  SupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";

type User2 = Database['public']['Tables']['users']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']
type Artwork = Database['public']['Tables']['artworks']['Row'] & {
  profile: Profile
}

type Props = {
  user: User2 | User
  profile: Profile
  mode?: 'edit'
};

export const UserMain = ({user, profile, mode}: Props) => {
  const supabase = createClientComponentClient<Database>();
  const [dateStart] = useState(new Date().toUTCString());
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(0);
    supabase
      .from('artworks')
      .select('*', {count: 'exact'})
      .lte('created_at', dateStart)
      .eq('user_id', user?.id || '')
      .then(({count}) => setCount(count || 0));
  }, []);

  const getArtworks = async (supabase: SupabaseClient, rangeFrom: number, step: number): Promise<Artwork[]> => {
    console.log('getArtworks');
    const {data: artworks} = await supabase
      .from('artworks')
      .select()
      .eq('user_id', user?.id || '')
      .order('created_at', {ascending: false})
      .range(rangeFrom, rangeFrom + step)
      .lte('created_at', dateStart);
    if (artworks && profile) {
      return artworks.map((v) => {
        return {...v, profile: profile};
      });
    }
    return [];
  };

  if (count > 0) {
    return (
      <>
        <RenderPictures artworksCount={count}
                        getArtworks={getArtworks}
                        mode={mode}
                        className={mode && 'grid-cols-8 gap-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'}/>
      </>
    );
  }
};