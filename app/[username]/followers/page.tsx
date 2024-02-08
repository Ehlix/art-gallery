import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { UserFollowersMain } from "@/components/userFollowers/userFollowersMain";

type Props = {
  params: { username: string };
};

const FollowersPage = async ({ params }: Props) => {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  });
  const { data: users } = await supabase
    .from("users")
    .select()
    .eq("metadata->>site", params.username);
  const userFromPage = users?.length ? users[0] : null;
  const { data: currentUser } = await supabase.auth.getUser();
  if (userFromPage) {
    return (
      <div className="container relative h-full">
        <UserFollowersMain
          currentUser={currentUser.user}
          userFromPage={userFromPage}
        />
      </div>
    );
  }
};
export default FollowersPage;
