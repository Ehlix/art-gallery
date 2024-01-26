import Link from 'next/link';
import { MdMoreVert, MdSend, MdUpload } from 'react-icons/md';
import { UserNavLogo } from '@/components/navigation/userNavLogo';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';

export type NavUser = {
  name: string;
  site: string;
  avatarLink: string;
};

export const UserNavPanel = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('user_id', user?.id || '')
    .single();
  const navUser: NavUser = {
    name: profile?.name || user?.user_metadata.name,
    site: user?.user_metadata.site,
    avatarLink:
      profile?.folder && profile?.avatar
        ? `avatars/${profile?.folder}/${profile?.avatar}`
        : '',
  };

  return (
    <div className="flex w-full items-center gap-[15px]">
      <Link
        href="/project/new"
        className="flex flex-col items-center w-[30px] h-[30px] relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-full hover:before:w-full hover:before:l-0 hover:before:h-[3px] hover:before:rounded-md hover:before:bg-t-hover-2"
      >
        <MdUpload size={30} />
      </Link>
      {/* <Link
       href="/"
       className="flex flex-col items-center w-[30px] h-[30px] relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
           hover:before:absolute hover:before:top-full hover:before:w-full hover:before:l-0 hover:before:h-[3px] hover:before:rounded-md hover:before:bg-t-hover-2">
       <MdNotifications size={28}/>
      </Link> */}
      <Link
        href="/"
        className="flex flex-col items-center w-[30px] h-[30px] relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-full hover:before:w-full hover:before:l-0 hover:before:h-[3px] hover:before:rounded-md hover:before:bg-t-hover-2"
      >
        <MdSend size={28} />
      </Link>
      <UserNavLogo user={navUser} />
      <Link
        href="/"
        className="flex flex-col items-center w-[30px] h-[30px] relative transition-all decoration-t-hover-2 decoration-[2.5px] hover:text-t-hover-1
            hover:before:absolute hover:before:top-full hover:before:w-full hover:before:l-0 hover:before:h-[3px] hover:before:rounded-md hover:before:bg-t-hover-2"
      >
        <MdMoreVert size={30} />
      </Link>
    </div>
  );
};
