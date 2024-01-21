import React, {Suspense} from "react";
import {Metadata} from "next";
import {UserSettingsNav} from "@/components/userSettings/userSettingsNav";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";
import Loading from "@/app/user/settings/loading";

export const metadata: Metadata = {
  title: 'Settings',
  description: 'User settings',
};

type Props = {
  children: React.ReactNode
}

const UserSettingLayout = async ({children}: Props) => {
  cookies();
  const supabase = createServerComponentClient<Database>({cookies});
  const {data: user} = await supabase.auth.getUser();
  const {data: profiles} = await supabase
    .from('profiles')
    .select()
    .eq('user_id', user.user?.id || '');
  const profile = profiles && profiles[0];

  return (
    <section className="container flex justify-evenly py-5 md:flex-col md:gap-5">
      <UserSettingsNav profile={profile} site={user.user?.user_metadata.site}
                       date={user.user?.created_at || ''}/>
      <Suspense fallback={<Loading/>}>
        <div className="grow">
          {children}
        </div>
      </Suspense>
    </section>
  );
};
export default UserSettingLayout;