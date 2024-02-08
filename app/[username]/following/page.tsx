import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { UserFollowingMain } from "@/components/userFollowing/userFollowingMain";

type Props = {
  params: { username: string };
};

const FollowingPage = async ({ params }: Props) => {
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
        <UserFollowingMain
          userFromPage={userFromPage}
          currentUser={currentUser.user}
        />
      </div>
    );
  }
};
export default FollowingPage;
