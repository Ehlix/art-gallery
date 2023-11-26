'use client';
import {FaAsterisk} from "react-icons/fa";
import * as React from "react";
import {useState} from "react";
import {UploadAvatar} from "@/components/newProfile/uploadAvatar";
import {NewProfilePictures} from "@/components/newProfile/newProfileMain";
import {Database} from "@/lib/database.types";
import {v4} from "uuid";
import {ProfileObject} from "@/components/newProfile/profile";
import {SelectCountry} from "@/components/newProfile/selectCountry";
import {UploadCover} from "@/components/newProfile/uploadCover";

type ProfileObj = Database['public']['Tables']['profiles']['Row']

type Props = {
  profileObject: ProfileObj | null
};

const uniquePath = v4();

export function UserProfile({profileObject}: Props) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [pictures, setPictures] = useState<NewProfilePictures>({});
  const [profile, setProfile
  ] = useState<ProfileObject>({
    name: profileObject?.name || '',
    headline: profileObject?.headline || '',
    city: profileObject?.city || '',
    country: profileObject?.country || '',
  });

  const currentAvatar = (profileObject?.folder && profileObject?.avatar) ? `avatars/${profileObject.folder}/${profileObject.avatar}` : '/default_avatar.png';

  const currentCover = (profileObject?.folder && profileObject?.cover) ? `avatars/${profileObject.folder}/${profileObject.cover}` : '/default_cover.png';

  function nameHandler(e: React.ChangeEvent<HTMLInputElement>) {
    // setValue('name', e.currentTarget.value.trimStart(), {shouldValidate: true});
    setProfile({
        ...profile,
        name: e.currentTarget.value.trimStart()
      }
    );
  }

  function headlineHandler(e: React.ChangeEvent<HTMLInputElement>) {
    // setValue('headline', e.currentTarget.value.trimStart(), {shouldValidate: true});
    setProfile({
        ...profile,
        headline: e.currentTarget.value.trimStart()
      }
    );
  }

  function cityHandler(e: React.ChangeEvent<HTMLInputElement>) {
    // setValue('city', e.currentTarget.value.trimStart(), {shouldValidate: true});
    setProfile({
        ...profile,
        city: e.currentTarget.value.trimStart()
      }
    );
  }

  return (
    <div className='flex flex-col items-end gap-5 md:items-center'>
      <button
        disabled={isLoading}
        // onClick={handleSubmit(onSubmit)}
        className="mt-2 flex w-fit items-center justify-center rounded-md px-16 pb-1 font-medium leading-none transition-all duration-200 bg-t-hover-2 text-t-main-2 h-[40px] hover:bg-t-hover-3 disabled:bg-t-main disabled:text-t-hover-1">
        {isLoading ? 'Loading..' : 'Save'}
      </button>
      <div
        className="flex h-fit flex-col items-center gap-5 rounded-md p-10 text-lg bg-t-main/20 w-[70vw] md:w-full lg:w-[60vw] lg:p-5">
        <div className="flex w-full shrink grow flex-col justify-between gap-5">
          <div className="flex flex-col leading-none gap-0.5">
            <h3
              className="mb-2 text-4xl font-bold -tracking-tight text-t-hover-1">
              Profile
            </h3>
            <p>
              Fill in your hiring information to appear in search results.
            </p>
            <p>
              This is required fields.
            </p>
          </div>

          <div className="">
            <h4 className="mb-1 flex gap-1">
              <FaAsterisk size={10} title="Required" className="cursor-help"/>
              Name
            </h4>
            <input
              maxLength={50}
              minLength={3}
              required
              onChange={nameHandler}
              type="text"
              value={profile.name}
              placeholder=""
            />
            <span className="text-sm -tracking-tight text-t-error">
            {'errors'}
          </span>
          </div>
          <div>
            <h3 className="mb-1 flex gap-1">
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
            <span className="text-sm -tracking-tight text-t-error">
            {'errors'}
          </span>
          </div>
          <div>
            <h3 className="mb-1 flex gap-1">
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
            <span className="text-sm -tracking-tight text-t-error">
            {'errors'}
          </span>
          </div>
          <SelectCountry
            country={profile.country}
            setProfile={setProfile}/>
          <span className="text-sm -tracking-tight text-t-error">
            {'error'}
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <UploadAvatar currentAvatar={currentAvatar}
                        setLoading={setLoading}
                        setPictures={setPictures}
                        uniquePath={profileObject?.folder || uniquePath}/>
          <UploadCover currentCover={currentCover}
                       setLoading={setLoading}
                       uniquePath={profileObject?.folder || uniquePath}
                       setPictures={setPictures}/>
        </div>
      </div>
    </div>
  );
}