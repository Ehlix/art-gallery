import React from "react";
import {UserAboutMain} from "@/components/userAbout/userAboutMain";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";
import {ResumeObject, SocialObject} from "@/components/newProfile/newProfileMain";

export type {Database} from "@/lib/database.types";

type Profile = Database['public']['Tables']['profiles']['Row'] & {
  resume: ResumeObject,
  social: SocialObject
}

type Props = {
  params: { username: string };
}

const About = async ({params}: Props) => {
  const supabase = createServerComponentClient<Database>({cookies});
  const {data: users} = await supabase
    .from('users')
    .select()
    .eq('metadata->>site', params.username);
  const user = users?.length === 1 && users[0];

  const {data: profiles} = await supabase
    .from('profiles')
    .select()
    .eq('user_id', user && user.id);
  const profile: Profile | null = profiles && profiles[0] as Profile;

  return (
    <section className="flex justify-center py-7">
      {
        profile &&
        <UserAboutMain profile={profile}/>
      }
    </section>
  );
};
export default About;