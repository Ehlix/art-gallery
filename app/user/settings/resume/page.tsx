import {UserResume} from "@/components/userSettings/userResume";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";
import {cookies} from "next/headers";
import {ResumeObject} from "@/components/newProfile/newProfileMain";


const ResumePage = async () => {
  const supabase = createServerComponentClient<Database>({cookies});
  const {data: user} = await supabase.auth.getUser();
  const {data: profiles} = await supabase.from('profiles').select().eq('user_id', user.user?.id || '');
  const profile = profiles && profiles[0];
  const resumeObject = profile?.resume as ResumeObject;
  return (
    <UserResume resumeObject={resumeObject}/>
  );
};
export default ResumePage