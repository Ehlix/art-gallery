import { UserGeneral } from '@/components/userSettings/userGeneral';
import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const GeneralPage = async () => {
  cookies();
  const cookiesStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  });
  const { data } = await supabase.auth.getUser();

  return <UserGeneral email={data.user?.email || ""} />;
};

export default GeneralPage;
