'use client';
import {RenderFollows} from "@/components/renderFollows";
import {Database} from "@/lib/database.types";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {useEffect, useState} from "react";

type Props = {
  currentUser: User | null;
  userFromPage: Database['public']['Tables']['users']['Row']
};

export const UserFollowingMain = ({currentUser, userFromPage}: Props) => {
  const supabase = createClientComponentClient<Database>();
  const [dateStart] = useState(new Date().toUTCString());
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(0);
    supabase
      .from('users_followers')
      .select('*', {count: 'exact'})
      .eq('follower_id', userFromPage?.id || '')
      .lte('created_at', dateStart)
      .then(({count}) => {
        console.log(count);
        setCount(count || 0);
      });
  }, []);

  if (count > 0) {
    return (
        <RenderFollows count={count}
                       filtering={'following'}
                       currentUser={currentUser}
                       userFromPage={userFromPage}/>
    );
  }
};