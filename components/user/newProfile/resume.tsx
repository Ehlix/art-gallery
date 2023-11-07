'use client';
import React, {useState} from "react";
import * as Checkbox from '@radix-ui/react-checkbox';
import {CheckedState} from '@radix-ui/react-checkbox';
import {MdCheck, MdClose} from "react-icons/md";
import {Resume} from "@/components/user/newProfile/newProfileMain";
import {cn} from "@/utils/twMergeClsx";
import {v4} from "uuid";

type Props = {
  resume: Resume
  setResume: React.Dispatch<React.SetStateAction<Resume>>
};

const hiredList = ['full-time employment', 'contract', 'freelance'];

export function Resume({resume, setResume}: Props) {
  const [currentSkill, setCurrentSkill] = useState<string>('');


  function hiringHandler(e: CheckedState, title: string) {

    if (e) {
      const newHiring = [...resume.hiring, title];
      setResume(prev => {
        return {
          ...prev,
          hiring: newHiring
        };
      });
    }
    if (!e) {
      const newHiring = resume.hiring.filter((v) => v !== title);
      setResume(prev => {
        return {
          ...prev,
          hiring: newHiring
        };
      });
    }
  }


  function summaryHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setResume((prev) => {
      const newSummary = e.currentTarget.value.trimStart();
      if (newSummary.length >= 2300) {
        return {...prev};
      }
      return {...prev, summary: newSummary};
    });
  }

  function skillChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setCurrentSkill(e.currentTarget.value.trimStart());
  }

  function addSkillHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newSkills = [...resume.skills];
    if (newSkills.length >= 5) {
      return
    }
    newSkills.push({id: v4(), title: currentSkill});
    setResume({...resume, skills: newSkills});
    setCurrentSkill('');
  }

  function removeSkillHandler(id: string) {
    const newSkills = resume.skills.filter((v) => v.id !== id);
    setResume({...resume, skills: newSkills});
  }

  return (
    <div
      className="flex h-fit flex-col rounded-[5px] bg-t-main/20 p-[40px] text-[18px] w-[85vw] gap-[15px] sm:w-full">
      <h3
        className="font-bold text-[33px] text-t-hover-1 mb-[20px] tracking-[0.7px]">
        Resume
      </h3>

      <form className="flex select-none flex-col gap-[10px]">
        <h4>Interested in:</h4>
        {hiredList.map((v) => {
          return (
            <div key={v}
                 className="flex items-center">
              <Checkbox.Root
                onCheckedChange={e => hiringHandler(e, v)}
                className="flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-t-main-2 outline-none border-t-main border-[1px] text-[25px] text-t-hover-3 data-[state=checked]:border-t-hover-3"
                id={v}
              >
                <Checkbox.Indicator>
                  <MdCheck/>
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label
                className="cursor-pointer capitalize leading-none pl-[10px] text-t-hover-1"
                htmlFor={v}>
                {v}
              </label>
            </div>
          );
        })}
      </form>

      <div className="flex flex-col gap-[10px]">
        Professional Summary:
        <textarea
          onChange={summaryHandler}
          value={resume.summary}
          placeholder="A summary of youe professional skills and experience as an artist"
        />
        {/*<span className="text-t-error">{'error'}</span>*/}
      </div>
      <div className="flex flex-col gap-[10px]">
        <h3 className="">Skills:</h3>
        {resume.skills.length > 0 && <div className="flex flex-wrap gap-[10px]">
          {resume.skills.map((v) => {

            return (
              <div key={v.id}
                   className="flex h-fit items-center capitalize border-[1px] border-t-main rounded-[3px] bg-t-main/20 text-t-main gap-[3px] text-[16px] px-[10px]">
                <span>{v.title}</span>
                <button onClick={() => removeSkillHandler(v.id)}
                        className="flex items-center justify-center caz-20 gap-[3px] ml-[5px] border-t-main">
                  <span className="text-t-error pb-[2px]">
                    <MdClose/>
                  </span>
                </button>
              </div>
            );
          })}
        </div>}
        <form onSubmit={e => addSkillHandler(e)}>
          <input
            disabled={resume.skills.length>=5}
            className={cn("transition-colors", {
              'border-b-0 rounded-b-none focus:border-t-main': currentSkill
            })}
            type="text"
            value={currentSkill}
            placeholder="Enter your skill here"
            onChange={skillChangeHandler}
          />
          {currentSkill && <button
            className="w-full rounded-t-none border-t-0 text-start bg-t-main-2 border-t-main border-[2px] rounded-[4px] px-[10px] text-[16px] hover:bg-t-main hover:text-t-main-2"
            type="submit">{currentSkill}</button>}
        </form>

        {/*  <span className="text-[13px] text-t-error tracking-[0.5px]">*/}
        {/*  {'error'}*/}
        {/*</span>*/}
      </div>
    </div>
  );
}