'use client';
import React, {useState} from "react";
import {Resume} from "@/components/user/newProfile/resume";
import {Profile} from "@/components/user/newProfile/profile";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createProfileSchema, CreateProfileType} from "@/validations/createProfileSchema";
import {Social} from "@/components/user/newProfile/social";

export type Resume = {
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

export function NewProfileMain() {

  const [resume, setResume
  ] = useState<Resume>({
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


  const onSubmit = (payload: CreateProfileType) => {
    console.log(payload);
  };

  return (
    <>
      <Profile errors={errors} setValue={setValue}/>
      <Resume resume={resume} setResume={setResume}/>
      <Social social={social} setSocial={setSocial}/>
      <button onClick={() => {
        console.log('resume: ', resume, 'social: ', social);
      }}>1
      </button>

      <button
        onClick={handleSubmit(onSubmit)}
        className={"disabled:bg-grad-6 disabled:text-t-hover-1 flex items-center justify-center font-medium bg-t-hover-2 leading-none  w-fit text-t-main-2 h-[35px] rounded-[4px] px-[30px] mt-[10px] hover:bg-t-hover-3 transition-all duration-200"}
      >
        {'Save'}
      </button>
    </>
  );
}