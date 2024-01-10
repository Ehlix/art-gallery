'use client';
import React, {useState} from "react";
import {Resume} from "@/components/newProfile/resume";
import {Profile} from "@/components/newProfile/profile";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createProfileSchema, CreateProfileType} from "@/validations/createProfileSchema";
import {Social} from "@/components/newProfile/social";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Env from "@/lib/env";
import {useRouter} from "next/navigation";

export type ResumeObject = {
  hiring: string[]
  summary: string
  skills: { id: string, title: string }[]
}

export type SocialObject = {
  publicEmail: string
  website: string
  twitter: string
  facebook: string
  instagram: string
}

export type NewProfilePictures = {
  folderId?: string
  avatarId?: string
  coverId?: string
}

export const NewProfileMain = ({name}: { name: string }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [pictures, setPictures] = useState<NewProfilePictures>({});
  const [resume, setResume
  ] = useState<ResumeObject>({
    hiring: [],
    summary: '',
    skills: []
  });
  const [social, setSocial
  ] = useState<SocialObject>({
    publicEmail: '',
    website: '',
    twitter: '',
    facebook: '',
    instagram: '',
  });
  // * Validation project
  const {
    handleSubmit,
    formState: {errors},
    setValue
  } = useForm<CreateProfileType>({
    resolver: yupResolver(createProfileSchema),
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const moveHandler = async (): Promise<{
    avatar: { path: string } | null,
    cover: { path: string } | null
  }> => {
    if (pictures.folderId && (pictures.coverId || pictures.avatarId)) {
      console.log('start copy avatar and cover...');
      const {data: avatar} = await supabase
        .storage
        .from(Env.PROJECTS_BUCKET)
        .copy(`cache/${pictures.folderId}/${pictures.avatarId}`, `avatars/${pictures.folderId}/${pictures.avatarId}`);
      const {data: cover} = await supabase
        .storage
        .from(Env.PROJECTS_BUCKET)
        .copy(`cache/${pictures.folderId}/${pictures.coverId}`, `avatars/${pictures.folderId}/${pictures.coverId}`);
      console.log('copied!', avatar, cover);
      return new Promise((resolve) => {
        resolve({avatar: avatar, cover: cover});
      });
    }
    return new Promise((resolve) => {
      resolve({avatar: null, cover: null});
    });
  };
  const onSubmit = (payload: CreateProfileType) => {
    setLoading(true);
    moveHandler().then(async (res) => {
      const {data: user} = await supabase.auth.getUser();
      const {status} = await supabase
        .from('profiles')
        .insert({
          user_id: user.user?.id,
          name: payload.name,
          headline: payload.headline,
          city: payload.city,
          country: payload.country,
          folder: (res.avatar && res.cover) ? pictures.folderId : '',
          avatar: res.avatar ? pictures.avatarId : '',
          cover: res.cover ? pictures.coverId : '',
          resume: resume,
          social: social,
          site: user.user?.user_metadata['site'],
        });
      if (status >= 200 && status <= 400) {
        router.refresh();
      }
      setLoading(false);
    });
  };

  return (
    <>
      <button
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
        className="mt-2 flex w-fit items-center justify-center rounded-md px-16 pb-1 font-medium leading-none transition-all duration-200 bg-t-hover-2 text-t-main-2 h-[40px] mb-[-15px] hover:bg-t-hover-3 disabled:bg-t-main disabled:text-t-hover-1">
        {isLoading ? 'Loading..' : 'Save'}
      </button>
      <Profile setLoading={setLoading}
               name={name}
               errors={errors}
               setValue={setValue}
               setPictures={setPictures}/>
      <Resume resume={resume} setResume={setResume}/>
      <Social social={social} setSocial={setSocial}/>
    </>
  );
};