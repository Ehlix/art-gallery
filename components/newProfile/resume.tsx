import React, {useState} from "react";
import * as Checkbox from '@radix-ui/react-checkbox';
import {CheckedState} from '@radix-ui/react-checkbox';
import {MdCheck, MdClose} from "react-icons/md";
import {ResumeObject} from "@/components/newProfile/newProfileMain";
import {cn} from "@/utils/twMergeClsx";
import {v4} from "uuid";

type Props = {
  resume: ResumeObject
  setResume: React.Dispatch<React.SetStateAction<ResumeObject>>
  customClassName?: string
};

const hiredList = ['full-time employment', 'contract', 'freelance'];

export const Resume = ({resume, setResume, customClassName}: Props) => {
  const [currentSkill, setCurrentSkill] = useState<string>('');

  const hiringHandler = (e: CheckedState, title: string) => {
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
  };

  const summaryHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResume((prev) => {
      const newSummary = e.currentTarget.value.trimStart();
      if (newSummary.length >= 2300) {
        return {...prev};
      }
      return {...prev, summary: newSummary};
    });
  };

  const skillChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCurrentSkill(e.currentTarget.value.trimStart());
  };

  const addSkillHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSkills = [...resume.skills];
    if (newSkills.length >= 5) {
      return;
    }
    newSkills.push({id: v4(), title: currentSkill});
    setResume({...resume, skills: newSkills});
    setCurrentSkill('');
  };

  const removeSkillHandler = (id: string) => {
    const newSkills = resume.skills.filter((v) => v.id !== id);
    setResume({...resume, skills: newSkills});
  };

  return (
    <div
      className={cn("flex h-fit flex-col gap-5 rounded-md p-10 bg-t-main/20 text-[18px] w-[85vw] sm:w-full", customClassName)}>
      <div>
        <h3
          className="mb-2 text-4xl font-bold -tracking-tight text-t-hover-1">
          Resume
        </h3>
        <p>
          This fields is not required.
        </p>
      </div>

      <form className="flex select-none flex-col gap-3">
        <h4>Interested in:</h4>
        {hiredList.map((v) => {
          return (
            <div key={v}
                 className="flex items-center">
              <Checkbox.Root
                onCheckedChange={e => hiringHandler(e, v)}
                checked={resume.hiring.includes(v)}
                className="flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-md bg-t-main-2 outline-none border-t-main border text-2xl text-t-hover-3 data-[state=checked]:border-t-hover-3"
                id={v}>
                <Checkbox.Indicator>
                  <MdCheck/>
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label
                className="cursor-pointer pl-2 capitalize leading-none text-t-hover-1"
                htmlFor={v}>
                {v}
              </label>
            </div>
          );
        })}
      </form>

      <div className="flex flex-col gap-2">
        Professional Summary:
        <textarea
          onChange={summaryHandler}
          value={resume.summary}
          placeholder="A summary of youe professional skills and experience as an artist"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="">Skills:</h3>
        {resume.skills.length > 0 &&
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((v) => {
              return (
                <div key={v.id}
                     className="flex h-fit items-center gap-1 rounded-sm border px-2 text-base capitalize border-t-main bg-t-main/20 text-t-main">
                  <span>{v.title}</span>
                  <button onClick={() => removeSkillHandler(v.id)}
                          className="ml-1 flex items-center justify-center gap-1 border-t-main">
                  <span className="text-t-error">
                    <MdClose/>
                  </span>
                  </button>
                </div>
              );
            })}
          </div>
        }
        <form onSubmit={e => addSkillHandler(e)}
              className="flex flex-col">
          <input
            disabled={resume.skills.length >= 5}
            className={cn("transition-colors", {
              'border-b-0 rounded-b-none focus:border-t-main': currentSkill
            })}
            type="text"
            value={currentSkill}
            placeholder="Enter your skill here"
            onChange={skillChangeHandler}
          />
          {currentSkill && <button
            className="w-full rounded-md rounded-t-none border-2 border-t-0 px-2 text-start text-base bg-t-main-2 border-t-main hover:bg-t-main hover:text-t-main-2"
            type="submit">
            {currentSkill}
          </button>
          }
        </form>
      </div>
    </div>
  );
};