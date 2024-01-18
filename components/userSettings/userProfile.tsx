'use client';
import {FaAsterisk} from "react-icons/fa";
import * as React from "react";
import {useEffect, useState} from "react";
import {UploadAvatar} from "@/components/newProfile/uploadAvatar";
import {NewProfilePictures} from "@/components/newProfile/newProfileMain";
import {Database} from "@/lib/database.types";
import {v4} from "uuid";
import {ProfileObject} from "@/components/newProfile/profile";
import {SelectCountry} from "@/components/newProfile/selectCountry";
import {UploadCover} from "@/components/newProfile/uploadCover";
import {useForm} from "react-hook-form";
import {createProfileSchema, CreateProfileType} from "@/validations/createProfileSchema";
import {yupResolver} from "@hookform/resolvers/yup";
import Env from "@/lib/env";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {useIsMount} from "@/hooks/useIsMount";

type ProfileObj = Database['public']['Tables']['profiles']['Row']

type Props = {
  profileObject: ProfileObj | null
};

type ReplaceAvatarCover = {
  avatar: { path: string } | null,
  cover: { path: string } | null
}

const uniquePath = v4();

export const UserProfile = ({profileObject}: Props) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const isMount = useIsMount();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [pictures, setPictures] = useState<NewProfilePictures>({});
  const [profile, setProfile
  ] = useState<ProfileObject>({
    name: profileObject?.name || '',
    headline: profileObject?.headline || '',
    city: profileObject?.city || '',
    country: profileObject?.country || '',
  });
  //validation
  const {
    handleSubmit,
    formState: {errors},
    setValue
  } = useForm<CreateProfileType>({
    resolver: yupResolver(createProfileSchema),
  });

  const currentAvatar = (
    (profileObject?.folder && profileObject?.avatar)
      ? `avatars/${profileObject.folder}/${profileObject.avatar}`
      : '/default_avatar.png'
  );
  const currentCover = (
    (profileObject?.folder && profileObject?.cover)
      ? `avatars/${profileObject.folder}/${profileObject.cover}`
      : '/default_cover.png'
  );

  const deletePicture = (folder: string, pictureId: string) => {
    supabase
      .storage
      .from(Env.PROJECTS_BUCKET)
      .remove([`avatars/${folder}/${pictureId}`]).finally();
  };
  const replaceAvatarAndCover = async (): Promise<ReplaceAvatarCover> => {
    const result: ReplaceAvatarCover = {avatar: null, cover: null};
    if (pictures.folderId && pictures.avatarId) {
      console.log('start copy avatar...');
      const {data: avatar} = await supabase
        .storage
        .from(Env.PROJECTS_BUCKET)
        .copy(
          `cache/${pictures.folderId}/${pictures.avatarId}`,
          `avatars/${profileObject?.folder || pictures.folderId}/${pictures.avatarId}`
        );
      result.avatar = avatar;
      if (avatar?.path && profileObject?.folder && profileObject.avatar) {
        deletePicture(profileObject?.folder, profileObject?.avatar);
      }
      console.log('copied!', avatar);
    }
    if (pictures.folderId && pictures.coverId) {
      console.log('start copy cover...');
      const {data: cover} = await supabase
        .storage
        .from(Env.PROJECTS_BUCKET)
        .copy(
          `cache/${pictures.folderId}/${pictures.coverId}`,
          `avatars/${profileObject?.folder || pictures.folderId}/${pictures.coverId}`
        );
      result.cover = cover;
      console.log('copied!', cover);
      if (cover?.path && profileObject?.folder && profileObject.cover) {
        deletePicture(profileObject?.folder, profileObject?.cover);
      }
    }
    return result;
  };

  const onSubmit = (payload: CreateProfileType) => {
    setLoading(true);
    replaceAvatarAndCover().then(async (res) => {
      const {data: user} = await supabase.auth.getUser();
      if (res.avatar || res.cover) {
        const {data: profile} = await supabase
          .from('profiles')
          .update({
            name: payload.name,
            headline: payload.headline,
            city: payload.city,
            country: payload.country,
            folder: profileObject?.folder || pictures.folderId || '',
            avatar: (
              res.avatar
                ? pictures.avatarId
                : profileObject?.avatar || ''
            ),
            cover: (
              res.cover
                ? pictures.coverId
                : profileObject?.cover || ''
            ),
          })
          .eq('user_id', user.user?.id || '')
          .select();
        if (profile) {
          router.refresh();
        }
      } else {
        const {data: profile} = await supabase
          .from('profiles')
          .update({
            name: payload.name,
            headline: payload.headline,
            city: payload.city,
            country: payload.country,
          })
          .eq('user_id', user.user?.id || '')
          .select();
        if (profile) {
          router.refresh();
        }
      }
      setLoading(false);
    });
  };

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
        ...profile,
        name: e.currentTarget.value.trimStart()
      }
    );
  };

  const headlineHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
        ...profile,
        headline: e.currentTarget.value.trimStart()
      }
    );
  };

  const cityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
        ...profile,
        city: e.currentTarget.value.trimStart()
      }
    );
  };

  useEffect(() => {
    setValue('name', profile.name, {shouldValidate: true});
    setValue('headline', profile.headline, {shouldValidate: true});
    setValue('city', profile.city, {shouldValidate: true});
    setValue('country', profile.country, {shouldValidate: true});
  }, [setProfile, profile]);

  return (
    <div className="flex flex-col items-center gap-5 md:items-center">
      <button
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
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
            {errors.name?.message}
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
            {errors.headline?.message}
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
          <button onClick={() => {
            console.log(pictures);
          }}>x
          </button>
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
};