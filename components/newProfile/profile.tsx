import * as React from 'react';
import {useEffect, useState} from 'react';
import {SelectCountry} from "@/components/newProfile/selectCountry";
import {UploadAvatar} from "@/components/newProfile/uploadAvatar";
import {UploadCover} from "@/components/newProfile/uploadCover";
import {FieldErrors, UseFormSetValue} from "react-hook-form";
import {useIsMount} from "@/hooks/useIsMount";
import {v4} from "uuid";
import {FaAsterisk} from "react-icons/fa";
import {NewProfilePictures} from "@/components/newProfile/newProfileMain";

type Props = {
  name: string
  setValue: UseFormSetValue<{
    name: string,
    headline: string,
    city: string,
    country: string,
  }>
  errors: FieldErrors<{
    headline: string,
    city: string,
    country: string,
    name: string
  }>
  setPictures: React.Dispatch<React.SetStateAction<NewProfilePictures>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

export type ProfileObject = {
  name: string
  headline: string
  city: string
  country: string
}

const uniquePath = v4();

export const Profile = ({
                          name,
                          setValue,
                          setPictures,
                          setLoading,
                          errors
                        }: Props) => {
  const isMount = useIsMount();
  const [profile, setProfile
  ] = useState<ProfileObject>({
    name: name,
    headline: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    isMount && setValue('name', name, {shouldValidate: true});
  }, []);

  useEffect(() => {
    if (isMount) {
      return;
    }
    setValue('country', profile.country, {shouldValidate: true});
  }, [profile.country]);

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('name', e.currentTarget.value.trimStart(), {shouldValidate: true});
    setProfile(prev => {
      return {
        ...prev,
        name: e.currentTarget.value.trimStart()
      };
    });
  };

  const headlineHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('headline', e.currentTarget.value.trimStart(), {shouldValidate: true});
    setProfile(prev => {
      return {
        ...prev,
        headline: e.currentTarget.value.trimStart()
      };
    });
  };

  const cityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('city', e.currentTarget.value.trimStart(), {shouldValidate: true});
    setProfile(prev => {
      return {
        ...prev,
        city: e.currentTarget.value.trimStart()
      };
    });
  };

  return (
    <div
      className="flex h-fit gap-5 rounded-md p-10 text-lg bg-t-main/20 w-[85vw] sm:p-0.5 sm:w-full md:p-5 lg:flex-col">
      <div className="flex shrink grow flex-col justify-between gap-5">
        <div>
          <h3
            className="text-4xl font-bold -tracking-tight mb-[10px] text-t-hover-1">
            Profile
          </h3>
          <p>
            Fill in your hiring information to appear in search results.
            <br/>
            This is required fields.
          </p>
        </div>
        <div className="">
          <h3 className="flex mb-0.5 gap-0.5">
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
            placeholder=""/>
          <span className="text-sm -tracking-tight text-t-error">
            {errors.name?.message}
          </span>
        </div>
        <div>
          <h3 className="flex mb-0.5 gap-0.5">
            <FaAsterisk size={10} title="Required" className="cursor-help"/>
            Professional Headline - One line about you
          </h3>
          <input
            maxLength={100}
            onChange={headlineHandler}
            type="text"
            value={profile.headline}
            placeholder=""/>
          <span className="text-sm -tracking-tight text-t-error">
            {errors.headline?.message}
          </span>
        </div>
        <div>
          <h3 className="flex mb-0.5 gap-0.5">
            <FaAsterisk size={10} title="Required" className="cursor-help"/>
            City
          </h3>
          <input
            maxLength={50}
            onChange={cityHandler}
            type="text"
            value={profile.city}
            placeholder=""/>
          <span className="text-sm -tracking-tight text-t-error">
            {errors.city?.message}
          </span>
        </div>
        <SelectCountry
          country={profile.country}
          setProfile={setProfile}/>
        <span className="text-sm -tracking-tight text-t-error">
            {errors.country?.message}
          </span>
      </div>
      <div className="flex flex-col gap-5">
        <UploadAvatar currentAvatar={'/default_avatar.png'}
                      setLoading={setLoading}
                      setPictures={setPictures}
                      uniquePath={uniquePath}/>
        <UploadCover currentCover={'/default_cover.png'}
                     setLoading={setLoading}
                     uniquePath={uniquePath}
                     setPictures={setPictures}/>
      </div>
    </div>
  );
};