import React from "react";
import { UserMain } from "@/components/userMain/userMain";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProjectsPage = async () => {
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
  if (!user.user || !profile) {
    redirect("/auth/sign-in");
  }
  return (
    <>
      <UserMain user={user.user} profile={profile} mode={"edit"} />
    </>
  );
};
export default ProjectsPage;
