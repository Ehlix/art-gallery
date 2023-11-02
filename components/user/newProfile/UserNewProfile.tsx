'use client';
import React, {useState} from "react";
import {Resume} from "@/components/user/newProfile/resume";
import {Profile} from "@/components/user/newProfile/profile";

export type Profile = {
  name: string
  headline: string
  city: string
  country: string
  avatar: File | null
  cover: File | null
}

export type Resume = {
  hiring: string[]
  summary: string
  skills: { id: string, title: string }[]
}


export function UserNewProfile() {
  const [profile, setProfile
  ] = useState<Profile>({
    name: '',
    headline: '',
    city: '',
    country: '',
    avatar: null,
    cover: null
  });
  const [resume, setResume
  ] = useState<Resume>({
    hiring: [],
    summary: '',
    skills: []
  });


  return (
    <>
      <Profile profile={profile} setProfile={setProfile}/>
      <Resume resume={resume} setResume={setResume}/>
      <button onClick={() => {
        console.log('profile: ', profile, 'resume: ', resume);
      }}>1
      </button>
      <button
        className={"disabled:bg-grad-6 disabled:text-t-hover-1 flex items-center justify-center font-medium bg-t-hover-2 leading-none  w-[150px] text-t-main-2 h-[35px] rounded-[4px] px-[10px] mt-[10px] hover:bg-t-hover-3 transition-all duration-200"}
      >
        {'Save'}
      </button>
    </>
  );
}