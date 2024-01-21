import {UserGeneral} from "@/components/userSettings/userGeneral";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Suspense} from "react";


const GeneralPage = async () => {
  cookies();
  const supabase = createServerComponentClient({cookies});
  const {data} = await supabase.auth.getUser();

  return (
    <Suspense fallback={'...loading'}>
      <UserGeneral email={data.user?.email || ''}/>
    </Suspense>
  );
};

export default GeneralPage;