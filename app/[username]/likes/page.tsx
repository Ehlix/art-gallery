import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { UserLikesMain } from "@/components/userLikes/userLikesMain";

type Props = {
  params: {
    username: string;
  };
};

const LikesPage = async ({ params }: Props) => {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  });
  const { data: users } = await supabase
    .from("users")
    .select()
    .eq("metadata->>site", params.username);
  const user = users?.length ? users[0] : null;
  if (user) {
    return <UserLikesMain user={user} />;
  }
};
export default LikesPage;
