'use client';
import React, {useEffect, useState} from "react";
import {UsersPictures} from "@/components/userMain/usersPictures";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";

type User = Database['public']['Tables']['users']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']
type Artwork = Database['public']['Tables']['artworks']['Row'] & {
  profile: Profile
}

export default function UserPage({params}: {
  params: {
    username: string;
  }
}) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<boolean>(true);
  const [rangeFrom, setRangeFrom] = useState<number>(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [artworksCount, setArtworksCount] = useState<number>(0);

  useEffect(() => {
    supabase.from('artworks').select('*', {count: 'exact'}).then((res) => {
      setArtworksCount(res.count || 0);
    });
  }, []);

  const getArtworks = async function (rangeFrom: number, step: number): Promise<Artwork[]> {
    console.log('getArtworks');
    const {data: users} = await supabase.from('users').select().eq('metadata->>site', params.username);
    const user = users && users[0];
    const {data: profiles} = await supabase.from('profiles').select().eq('user_id', user?.id || '');
    const profile = profiles && profiles[0];
    const {data: artworks} = await supabase.from('artworks').select().eq('user_id', user?.id || '').order('created_at', {ascending: false}).range(rangeFrom, rangeFrom + step);
    if (artworks && profile) {
      const newArtworks: Artwork[] = artworks.map((v) => {
        return {...v, profile: profile};
      });
      return newArtworks;
    }
    return [];
  };

  useEffect(() => {
    if (artworksCount < rangeFrom) return;
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
    <div className="container relative h-full">
      {
        (artworks.length > 0) &&
        <UsersPictures artworks={artworks} setLoading={setLoading}/>
      }
    </div>
  );
}

