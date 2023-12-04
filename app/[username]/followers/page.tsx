import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";

type Props = {

};

export default async function FollowersPage(props: Props) {
  const supabase = createServerComponentClient<Database>({cookies})

  const {data: profiles} = await supabase.from('profiles').select()


  return (
    <div>

    </div>
  );
}