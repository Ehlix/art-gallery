"use client";
import * as React from 'react';
import {useEffect, useState} from 'react';
import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {
  MdFavorite,
  MdGroups,
  MdImage,
  MdLibraryBooks,
  MdLogout,
  MdSchool,
  MdSettings
} from "react-icons/md";
import Image from "next/image";


type Props = {};
const modalItems = [
  {title: 'My learning', icon: <MdSchool/>, href: '/'},
  {title: 'My connections', icon: <MdGroups/>, href: '/'},
  {title: 'My library', icon: <MdLibraryBooks/>, href: '/'},
  {title: 'My wishlist', icon: <MdFavorite/>, href: '/'},
  {separator: true},
  {title: 'Manage portfolio', icon: <MdImage/>, href: '/'},
  {separator: true},
  {title: 'Setting', icon: <MdSettings/>, href: '/'},
];
type User = {
  name: string
  site: string
}

export function ModalUserOption() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  useEffect(() => {
    const getData = async () => {
      const {data} = await supabase.auth.getSession();
      const metadata = data?.session?.user?.user_metadata;
      setUser({name: metadata?.name, site: metadata?.site} || null);

    };
    getData();
  }, []);
  return (
    <>
      <Link
        href={`/${user?.site}`}
        className="text-t-hover-1/80 flex items-center justify-start transition-all w-[100%] h-[50px] gap-[12px] hover:text-t-hover-1
         rounded-[3px] pl-[10px] mt-[10px] mb-[20px]
        hover:before:absolute hover:before:top-[80px] hover:before:w-[100%] hover:before:l-[0px] hover:before:h-[1.3px] hover:before:rounded-[5px] hover:before:bg-grad-1

        befor:text-t-hover-1 before:absolute before:top-[80px] before:w-[110%] before:ml-[-10px] before:h-[1px]
        before:rounded-[5px] before:bg-t-main

        "
      >
        <Image
          src="/123.jpg"
          alt="navigation profile image"
          width={100}
          height={100}
          className="object-cover object-center w-[40px] h-[40px] rounded-full

        "
        />
        {/*<div className="mt-[-1.7px]">{'dh'}</div>*/}
        <span>{user?.name}</span>
      </Link>
<div className='mt-[15px]'>
  {modalItems.map((v, i) => {
    if (v.separator) {
      return (
        <Separator.Root
          key={i}
          className="bg-t-main data-[orientation=horizontal]:h-px ml-[0px] my-[15px] mr-[-100px]"
          decorative orientation="horizontal"
        />);
    }
    if (v.href) {
      return (
        <Link key={i}
              href={v.href}
              className="flex items-center justify-start transition-all w-[100%] gap-[12px] rounded-[3px] p-[10px] hover:bg-t-main/70"
        >
          <div className="mt-[-1.7px]">{v.icon}</div>
          <span>{v.title}</span>
        </Link>
      );
    }
  })}
</div>

      <button
        onClick={logout}
        className="flex items-center justify-start transition-all w-[100%] gap-[12px] rounded-[3px] p-[10px] hover:bg-t-main/70">
        <div className="mt-[-1.5px]"><MdLogout/></div>
        <span>Sign
        out</span>
      </button>
    </>
  );
}