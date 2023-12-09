import React from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";
import UserLikesMain from "@/components/userLikes/userLikesMain";

type Props = {
  params: {
    username: string
  };
};

const LikesPage = async ({params}: Props) => {
  const supabase = createServerComponentClient<Database>({cookies});
  const date = new Date;
  const dateStart = date.toUTCString();
  const {data: users} = await supabase.from('users').select().eq('metadata->>site', params.username);
  const user = users?.length ? users[0] : null;
  const {count} = await supabase.from('artworks').select('*', {count: 'exact'}).lte('created_at', dateStart);


  if (user && count) {
    return (
      <UserLikesMain dateStart={dateStart} user={user} count={count}/>
    );
  }
};

export default LikesPage;