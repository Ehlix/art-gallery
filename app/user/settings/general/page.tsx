import { UserGeneral } from '@/components/userSettings/userGeneral';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const GeneralPage = async () => {
  cookies();
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();

  return <UserGeneral email={data.user?.email || ''} />;
};

export default GeneralPage;
