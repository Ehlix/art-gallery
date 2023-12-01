import React from "react";
import {UsersPictures} from "@/components/userMain/usersPictures";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";

export default async function UserPage({params}: {
  params: {
    username: string;
  }
}) {
  const supabase = createServerComponentClient<Database>({cookies});
  const {data: user} = await supabase
    .from('users')
    .select().eq('metadata->>site', params.username);

  const {data: artworks} = await supabase
    .from('artworks')
    .select().eq('user_id', user && user[0].id || '').order('created_at', {ascending: false});

  return (
    <div className="container relative h-full">
      {artworks && user &&
        <UsersPictures artworks={artworks}/>
      }
    </div>
  );
}

