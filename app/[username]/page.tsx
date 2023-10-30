import React from "react";
import {PicturesUser} from "@/components/user/picturesUser";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";


export default async function UserPage({params}: {
  params: {
    username: string;
  }
}) {
  const supabase = createServerComponentClient({cookies});
  const {data: user} = await supabase
    .from('users')
    .select().eq('metadata->>site', params.username);

  const {data: artworks, error} = await supabase
    .from('artworks')
    .select().eq('user_id', user && user[0].id);


  return (
    <div className="container relative h-full">
      {artworks && user &&
        <PicturesUser userName={user[0].metadata.name} artworks={artworks}/>
      }
    </div>
  );
}

