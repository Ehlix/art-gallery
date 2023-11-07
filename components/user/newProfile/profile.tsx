import * as React from 'react';
import {useEffect, useState} from 'react';
import {SelectCountry} from "@/components/user/newProfile/selectCountry";
import {UploadAvatar} from "@/components/user/newProfile/uploadAvatar";
import {UploadCover} from "@/components/user/newProfile/uploadCover";
import {FieldErrors, UseFormSetValue} from "react-hook-form";
import {useIsMount} from "@/hooks/useIsMount";
import {v4} from "uuid";
import {FaAsterisk} from "react-icons/fa";

type Props = {
  setValue: UseFormSetValue<{ name: string, headline: string, city: string, country: string, avatar: File, cover: File }>
  errors: FieldErrors<{ headline: string, city: string, country: string, avatar: File, cover: File, name: string }>
};

export type ProfileObject = {
  name: string
  headline: string
  city: string
  country: string
  avatar: File | null
  cover: File | null
}

const uniquePath = v4();

export function Profile({setValue, errors}: Props) {
  const isMount = useIsMount();
  const [profile, setProfile
  ] = useState<ProfileObject>({
    name: '',
    headline: '',
    city: '',
    country: '',
    avatar: null,
    cover: null
  });

  function nameHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValue('name', e.currentTarget.value.trimStart(), {shouldValidate: true});
    setProfile(prev => {
      return {
        ...prev,
        name: e.currentTarget.value.trimStart()
      };
    });
  }

  function headlineHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValue('headline', e.currentTarget.value.trimStart(), {shouldValidate: true});
    setProfile(prev => {
      return {
        ...prev,
        headline: e.currentTarget.value.trimStart()
      };
    });
  }

  function cityHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValue('city', e.currentTarget.value.trimStart(), {shouldValidate: true});
    setProfile(prev => {
      return {
        ...prev,
        city: e.currentTarget.value.trimStart()
      };
    });
  }

  useEffect(() => {
    if (isMount) {
      return;
    }
    setValue('country', profile.country, {shouldValidate: true});
  }, [profile.country]);

  return (
    <div
      className="flex h-fit mt-[30px] rounded-[5px] bg-t-main/20 p-[40px] text-[18px] w-[85vw] gap-[20px] sm:p-[5px] sm:w-full md:p-[20px] lg:flex-col">
      <div className="flex shrink grow flex-col justify-between gap-[20px]">
        <h3
          className="font-bold text-[33px] text-t-hover-1 tracking-[0.7px]">
          Profile
        </h3>
        <p>
          Fill in your hiring information to appear in search results.
          <br/>
          This is required fields.
        </p>
        <div className="">
          <h3 className="flex mb-[5px] gap-[5px]">
            <FaAsterisk size={10} title="Required" className="cursor-help"/>
            Name
          </h3>
          <input
            maxLength={50}
            minLength={3}
            required
            onChange={nameHandler}
            type="text"
            value={profile.name}
            placeholder=""
          />
          <span className="text-[14px] text-t-error tracking-[0.5px]">
            {errors.name?.message}
          </span>
        </div>
        <div>
          <h3 className="flex mb-[5px] gap-[5px]">
            <FaAsterisk size={10} title="Required" className="cursor-help"/>
            Professional Headline - One line about you
          </h3>
          <input
            maxLength={100}
            onChange={headlineHandler}
            type="text"
            value={profile.headline}
            placeholder=""
          />
          <span className="text-[14px] text-t-error tracking-[0.5px]">
            {errors.headline?.message}
          </span>
        </div>
        <div>
          <h3 className="flex mb-[5px] gap-[5px]">
            <FaAsterisk size={10} title="Required" className="cursor-help"/>
            City
          </h3>
          <input
            maxLength={50}
            onChange={cityHandler}
            type="text"
            value={profile.city}
            placeholder=""
          />
          <span className="text-[14px] text-t-error tracking-[0.5px]">
            {errors.city?.message}
          </span>
        </div>
        <SelectCountry
          country={profile.country}
          setProfile={setProfile}/>
        <span className="text-[14px] text-t-error tracking-[0.5px]">
            {errors.country?.message}
          </span>
      </div>
      <div className="flex flex-col gap-[20px]">
        <UploadAvatar uniquePath={uniquePath} setValue={setValue}/>
        <span className="text-[14px] text-t-error tracking-[0.5px]">
            {errors.avatar?.message}
          </span>
        <UploadCover uniquePath={uniquePath} setValue={setValue}/>
        <span className="text-[14px] text-t-error tracking-[0.5px]">
            {errors.cover?.message}
          </span>
      </div>

    </div>


  );
}