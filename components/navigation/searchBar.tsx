'use client';
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {ImSearch} from "react-icons/im";
import {cn} from "@/utils/twMergeClsx";
import {usePathname} from "next/navigation";
import {useClickOutside} from "@/hooks/useClickOutside";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";
import {useDebounce} from "@/hooks/useDebounce";
import Link from "next/link";
import {useIsMount} from "@/hooks/useIsMount";
import Image from "next/image";

type SearchProfiles = Database['public']['Tables']['profiles']['Row']

export const SearchBar = () => {
  const menuRef = useRef(null);
  const path = usePathname();
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [result, setResult] = useState<SearchProfiles[]>([]);
  const supabase = createClientComponentClient<Database>();
  const debounceSearch = useDebounce<string>(search, 500);
  const isMount = useIsMount();

  useClickOutside(menuRef, () => {
    if (open) setTimeout(() => setOpen(false), 170);
  });

  useEffect(() => {
    if (open) setTimeout(() => setOpen(false), 0);
    setSearch('');
    setResult([]);
  }, [path]);


  useEffect(() => {
    if (isMount || debounceSearch.length < 3) {
      return;
    }
    setResult([]);
    supabase
      .from('profiles')
      .select()
      .or(`site.ilike.%${debounceSearch}%, name.ilike.%${debounceSearch}%`)
      .then((res) => {
        const profiles = res.data;
        if (profiles) {
          setResult(profiles);
          setOpen(!!profiles.length);
        }
      });
    // supabase
    //   .from('profiles')
    //   .select()
    //   .ilike('name', `%${debounceSearch}%`)
    //   .then((res)=>{
    //     console.log(res.data)
    //     const profiles = res.data;
    //     if (profiles) {
    //       setResult(prev => [...prev,...profiles]);
    //       setOpen(!!profiles.length);
    //     }
    //   })
  }, [debounceSearch]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value.trimStart());
  };

  const focusHandler = () => search && setOpen(true);


  return (
    <div ref={menuRef}
         className="relative flex shrink grow items-center rounded-full group h-[35px] bg-grad-1">
      <div
        className="absolute pl-3 text-base transition-all group-focus-within:text-t-hover-2">
        <ImSearch/>
      </div>
      <input type="text"
             onChange={(e) => searchHandler(e)}
             onFocus={focusHandler}
             value={search}
             placeholder="Search"
             className="h-full w-full grow rounded-full border-2 pl-9 text-base outline-none transition duration-200 bg-t-main-2 border-t-main placeholder:text-t-main/30 hover:border-t-hover-1 focus:border-t-hover-2 focus:box-decoration-clone"/>
      <div
        className={cn('p-3 left-0 top-full z-10 rounded-md text-t-main text-lg items-start justify-center flex flex-col mt-2 bg-t-main-3 absolute w-full h-50', {
          'hidden': !open,
        })}>
        {
          result.map((v) => (
              <Link href={v.site} key={v.id}
                    className="flex h-14 w-full items-center gap-2 rounded-md p-1 px-3 transition-all duration-300 hover:bg-t-main/30">
                <div className="h-10 w-10 overflow-hidden rounded-full min-w-10 min-h-10">
                  {
                    (v.folder && v.avatar)
                      ?
                      <Image
                        className="h-full w-full object-cover"
                        src={`avatars/${v.folder}/${v.avatar}`}
                        alt="avatar"
                        priority={true}
                        height={500}
                        width={500}
                        quality={30}/>
                      :
                      <Image
                        unoptimized
                        className="h-full w-full object-cover"
                        src="/default_avatar.png"
                        alt="avatar"
                        height={500}
                        width={500}
                        quality={30}/>
                  }
                </div>
                <span className="w-full">
                  {`${v.name} (${v.site})`}
                </span>
              </Link>
            )
          )
        }
      </div>
    </div>
  );
};