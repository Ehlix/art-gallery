import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";
import {RenderFollows} from "@/components/renderFollows";

type Props = {
  params: { username: string };
};

export default async function FollowersPage({params}: Props) {
  const supabase = createServerComponentClient<Database>({cookies});
  const date = new Date;
  const dateStart = date.toUTCString();
  const {data: users} = await supabase.from('users').select().eq('metadata->>site', params.username);
  const userFromPage = users?.length ? users[0] : null;
  const {count: followsCount} = await supabase.from('users_followers').select('*', {count: 'exact'}).eq('user_id', userFromPage?.id || '').lte('created_at', dateStart);
  const {data: currentUser} = await supabase.auth.getUser();
  if (userFromPage && followsCount) {
    return (
      <div className="container relative h-full">
        <RenderFollows dateStart={dateStart}
                       filtering={'followers'}
                       followsCount={followsCount}
                       currentUser={currentUser.user}
                       userFromPage={userFromPage}/>
      </div>
    );
  }

}