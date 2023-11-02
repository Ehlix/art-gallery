import * as React from 'react';
import {SelectCountry} from "@/components/user/newProfile/selectCountry";
import {UploadAvatar} from "@/components/user/newProfile/uploadAvatar";
import {UploadCover} from "@/components/user/newProfile/uploadCover";
import {Profile} from "@/components/user/newProfile/UserNewProfile";

type Props = {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
};

export function Profile({profile, setProfile}: Props) {

  function nameHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile(prev => {
      return {
        ...prev,
        name: e.currentTarget.value.trimStart()
      };
    });
  }

  function headlineHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile(prev => {
      return {
        ...prev,
        headline: e.currentTarget.value.trimStart()
      };
    });
  }

  function cityHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile(prev => {
      return {
        ...prev,
        city: e.currentTarget.value.trimStart()
      };
    });
  }

  return (
    <div
      className="flex h-fit mt-[30px] rounded-[5px] bg-t-main/20 p-[40px] text-[18px] w-[85vw] gap-[20px] sm:p-[5px] sm:w-full md:p-[20px] lg:flex-col">
      <div className="flex shrink grow flex-col justify-between gap-[20px]">
        <h3
          className="font-bold text-[33px] text-t-hover-1 tracking-[0.7px]">
          Profile
        </h3>
        <div className="">
          <h3 className="mb-[5px]">* Name</h3>
          <input
            maxLength={50}
            onChange={nameHandler}
            className="inline-flex w-full appearance-none items-center justify-center leading-none outline-none transition-all duration-200 bg-t-main-2 border-t-main h-[35px] rounded-[4px] px-[10px] text-[15px] border-[2px] text-t-hover-1 placeholder:text-t-main/40 focus:border-t-hover-1"
            type="text"
            value={profile.name}
            placeholder=""
          />
          {/*  <span className="text-[13px] text-t-error tracking-[0.5px]">*/}
          {/*  {'error'}*/}
          {/*</span>*/}
        </div>
        <div>
          <h3 className="mb-[5px]">* Professional Headline - One line about you</h3>
          <input
            maxLength={100}
            onChange={headlineHandler}
            className="inline-flex w-full appearance-none items-center justify-center leading-none outline-none transition-all duration-200 bg-t-main-2 border-t-main h-[35px] rounded-[4px] px-[10px] text-[15px] border-[2px] text-t-hover-1 placeholder:text-t-main/40 focus:border-t-hover-1"
            type="text"
            value={profile.headline}
            placeholder=""
          />
          {/*  <span className="text-[13px] text-t-error tracking-[0.5px]">*/}
          {/*  {'error'}*/}
          {/*</span>*/}
        </div>
        <div>
          <h3 className="mb-[5px]">* City</h3>
          <input
            maxLength={50}
            onChange={cityHandler}
            className="inline-flex w-full appearance-none items-center justify-center leading-none outline-none transition-all duration-200 bg-t-main-2 border-t-main h-[35px] rounded-[4px] px-[10px] text-[15px] border-[2px] text-t-hover-1 placeholder:text-t-main/40 focus:border-t-hover-1"
            type="text"
            value={profile.city}
            placeholder=""
          />
          {/*  <span className="text-[13px] text-t-error tracking-[0.5px]">*/}
          {/*  {'error'}*/}
          {/*</span>*/}
        </div>
        <SelectCountry
          country={profile.country}
          setProfile={setProfile}/>
      </div>
      <div className="flex flex-col gap-[20px]">
        <UploadAvatar/>
        <UploadCover/>
      </div>

    </div>


  );
}