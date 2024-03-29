import { UserSocial } from "@/components/userSettings/userSocial";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { SocialObject } from "@/components/newProfile/newProfileMain";

export default async function SocialPage() {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  });
  const { data: user } = await supabase.auth.getUser();
  const { data: profiles } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user.user?.id || "");
  const profile = profiles && profiles[0];
  const socialObject = profile?.social as SocialObject;
  return <UserSocial socialObject={socialObject} />;
}
