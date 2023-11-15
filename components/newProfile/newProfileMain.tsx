'use client';
import React, {useState} from "react";
import {Resume} from "@/components/newProfile/resume";
import {Profile} from "@/components/newProfile/profile";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createProfileSchema, CreateProfileType} from "@/validations/createProfileSchema";
import {Social} from "@/components/newProfile/social";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Env from "@/dictionaries/env";
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

export function NewProfileMain({name}: { name: string }) {
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
    handleSubmit, formState: {errors},
    setValue
  } = useForm<CreateProfileType>({
    resolver: yupResolver(createProfileSchema),
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = (payload: CreateProfileType) => {
    setLoading(true);
    moveHandler().then(async (res) => {
      const {data: user} = await supabase.auth.getUser();
      const {status} = await supabase.from('profiles').insert({
        user_id: user.user?.id,
        name: payload.name,
        headline: payload.headline,
        city: payload.city,
        country: payload.country,
        folder: (res.avatar && res.cover) ? pictures.folderId : '',
        avatar: res.avatar ? pictures.avatarId : '',
        cover: res.cover ? pictures.coverId : '',
        resume: resume,
        social: social
      });
      if (status >= 200 && status <= 400) {
        router.refresh();
      }
      setLoading(false);
    });
  };

  async function moveHandler(): Promise<{
    avatar: { path: string } | null,
    cover: { path: string } | null
  }> {
    if (pictures.folderId && (pictures.coverId || pictures.avatarId)) {
      console.log('start copy avatar and cover...');
      const {data: avatar} = await supabase.storage.from(Env.PROJECTS_BUCKET).copy(`cache/${pictures.folderId}/${pictures.avatarId}`, `avatars/${pictures.folderId}/${pictures.avatarId}`);
      const {data: cover} = await supabase.storage.from(Env.PROJECTS_BUCKET).copy(`cache/${pictures.folderId}/${pictures.coverId}`, `avatars/${pictures.folderId}/${pictures.coverId}`);
      console.log('copied!', avatar, cover);
      return new Promise((resolve) => {
        resolve({avatar: avatar, cover: cover});
      });
    }
    return new Promise((resolve) => {
      resolve({avatar: null, cover: null});
    });
  }

  return (
    <>
      <button
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
        className={"disabled:bg-grad-6 disabled:text-t-hover-1 flex items-center justify-center font-medium bg-t-hover-2 leading-none  w-fit text-t-main-2 h-[35px] rounded-[4px] px-[70px] mt-[10px] mb-[-15px] hover:bg-t-hover-3 transition-all duration-200"}
      >
        {isLoading ? 'Loading..' : 'Save'}
      </button>
      <Profile setLoading={setLoading} name={name} errors={errors}
               setValue={setValue} setPictures={setPictures}/>
      <Resume resume={resume} setResume={setResume}/>
      <Social social={social} setSocial={setSocial}/>
    </>
  );
}