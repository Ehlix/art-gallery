'use client';
import {RenderPictures} from "@/components/renderPictures";
import React from "react";
import {SupabaseClient,} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";

type User = Database['public']['Tables']['users']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']
type Artwork = Database['public']['Tables']['artworks']['Row'] & {
  profile: Profile
}

type Props = {
  user: User
  count: number
  profile: Profile
  dateStart: string
};

const UserMain = function ({count, user, profile, dateStart}: Props) {
  const getArtworks = async function (supabase: SupabaseClient, rangeFrom: number, step: number): Promise<Artwork[]> {
    console.log('getArtworks');
    const {data: artworks} = await supabase.from('artworks').select().eq('user_id', user?.id || '').order('created_at', {ascending: false}).range(rangeFrom, rangeFrom + step).lte('created_at', dateStart);
    if (artworks && profile) {
      return artworks.map((v) => {
        return {...v, profile: profile};
      });
    }
    return [];
  };
  return (
    <>
      <RenderPictures artworksCount={count} getArtworks={getArtworks}/>
    </>
  );
};

export default UserMain;