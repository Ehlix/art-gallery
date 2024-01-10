import {cn} from "@/utils/twMergeClsx";
import {COUNTRIES} from "@/lib/countries";
import React, {useRef, useState} from "react";
import {useClickOutside} from "@/hooks/useClickOutside";
import {FaAsterisk} from "react-icons/fa";
import {ProfileObject} from "@/components/newProfile/profile";

type Props = {
  country: string
  setProfile: React.Dispatch<React.SetStateAction<ProfileObject>>
};

export const SelectCountry = ({country, setProfile}: Props) => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const [searchCountry, setSearchCountry] = useState<string>('');

  useClickOutside(menuRef, () => {
    if (open) setTimeout(() => setOpen(false), 170);
  });

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCountry(e.currentTarget.value.trimStart());
  };

  const addCountryHandler = (country: string) => {
    setProfile((prev) => {
      return {
        ...
          prev,
        country: country
      };
    });
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <h3 className="flex mb-[5px] gap-[5px]">
        <FaAsterisk size={10} title="Required" className="cursor-help"/>
        Country
      </h3>
      {/*<span className="text-[13px] text-t-error tracking-[0.5px]">*/}
      {/*      {'error'}*/}
      {/*    </span>*/}
      <button
        onClick={() => {
          setOpen(!open);
          setSearchCountry('');
        }}
        className={cn("border-t-main border-2 flex w-full  appearance-none items-start pt-1 justify-center leading-none outline-none bg-t-main-2 h-[35px] rounded-md px-2 text-base text-t-hover-1 hover:bg-t-main-2/70", {
          'text-t-main': !country,
          'border-b-0 rounded-b-none': open
        })}
      >
        {country || '-- Click and chose country --'}
      </button>
      {open &&
        <div
          ref={menuRef}
          className="absolute z-20 h-fit w-full rounded-t-none border-t-0 bg-t-main-2 border-t-main border-2 rounded-md">
          <input
            autoFocus
            onChange={searchHandler}
            value={searchCountry}
            className="border-t-main border m-2 flex w-[calc(100%-16px)] appearance-none items-center justify-center leading-none outline-none bg-t-main-2 text-t-hover-1 h-[35px] rounded-md px-2 text-base placeholder:text-t-main/40 hover:shadow-t-hover-1 focus:shadow-t-hover-2"
            type="text"/>

          <div className="flex flex-col overflow-y-scroll h-[250px]">
            {COUNTRIES.filter((v) => v.name.toLowerCase().includes(searchCountry.toLowerCase())).map((v) => {
              return (
                <button
                  onClick={() => addCountryHandler(v.name)}
                  className="text-left text-t-hover-1 px-2 py-0.5 hover:bg-t-main hover:text-t-main-2"
                  key={v.name}>
                  {v.name}
                </button>
              );
            })}
          </div>
        </div>}
    </div>


  );
};