'use client';
import React, {useState} from "react";
import {ResumeObject} from "@/components/newProfile/newProfileMain";
import {Resume} from "@/components/newProfile/resume";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";
import {useRouter} from "next/navigation";

type Props = {
  resumeObject: ResumeObject | null
};


export const UserResume = ({resumeObject}: Props) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [resume, setResume] = useState<ResumeObject>({
    hiring: resumeObject?.hiring || [],
    skills: resumeObject?.skills || [],
    summary: resumeObject?.summary || '',
  });

  const className = "flex h-fit flex-col gap-5 rounded-md p-10 text-lg bg-t-main/20 w-[70vw] md:w-full lg:w-[60vw] lg:p-5";

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    supabase.auth
      .getUser()
      .then(({data}) => {
        data.user && supabase
          .from('profiles')
          .update({
            resume: resume,
          })
          .eq('user_id', data.user.id)
          .select()
          .then(({data:res}) => {
            console.log(res);
            setLoading(false)
            res && router.refresh()
          });
      })
      .catch(()=> {
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col items-center gap-5 md:items-center">
      <button
        disabled={isLoading}
        onClick={(e) => onSubmit(e)}
        className="mt-2 flex w-fit items-center justify-center rounded-md px-16 pb-1 font-medium leading-none transition-all duration-200 bg-t-hover-2 text-t-main-2 h-[40px] hover:bg-t-hover-3 disabled:bg-t-main disabled:text-t-hover-1">
        {isLoading ? 'Loading..' : 'Save'}
      </button>
      <Resume resume={resume} setResume={setResume}
              customClassName="flex h-fit flex-col gap-5 rounded-md p-10 text-lg bg-t-main/20 w-[70vw] md:w-full lg:w-[60vw] lg:p-5"/>
    </div>
  );
};