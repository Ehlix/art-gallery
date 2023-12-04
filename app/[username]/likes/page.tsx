import React from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";

type Artwork = Database['public']['Tables']['artworks']['Row']

type Props = {
  params: {
    username: string
  };
};

export default async function LikesPage({params}: Props) {
  const supabase = createServerComponentClient<Database>({cookies});
  const {data: users} = await supabase.from('users').select().eq('metadata->>site', params.username);
  const user = users?.length ? users[0] : null;
  const {data: likedPictures} = await supabase.from('artworks_likes').select('artwork_id').eq('user_id', user?.id || '').order('created_at', {ascending: false});

  async function getLikedArtworks(likedPictures: {
    artwork_id: number
  }[]): Promise<Artwork[] | null> {
    if (likedPictures.length < 1) {
      return null;
    }
    const artworks: Artwork[] = [];
    for (const v of likedPictures) {
      const {data: artwork} = await supabase.from('artworks').select().eq('id', v.artwork_id);
      if (artwork) {
        artworks.push(artwork[0]);
      }
    }
    return artworks;
  }

  const artworks: Artwork[] | null = await getLikedArtworks(likedPictures || []);

  return (
    <div className="container relative h-full">
      {
        // artworks &&
        // <UsersPictures artworks={artworks}/>
      }
    </div>
  );
}