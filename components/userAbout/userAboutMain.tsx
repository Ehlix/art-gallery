import React from "react";
import {Database} from "@/lib/database.types";
import {ResumeObject, SocialObject} from "@/components/newProfile/newProfileMain";
import {MdCheck, MdLanguage} from "react-icons/md";
import {RiFacebookFill, RiInstagramLine, RiTwitterXFill} from "react-icons/ri";
import {IconType} from "react-icons";


type Profile = Database['public']['Tables']['profiles']['Row'] & {
  resume: ResumeObject,
  social: SocialObject
}

type Props = {
  profile: Profile
};

const socTags: { title: keyof SocialObject, icon: IconType }[] = [
  {
    title: 'twitter',
    icon: RiTwitterXFill
  },
  {
    title: 'instagram',
    icon: RiInstagramLine
  },
  {
    title: 'facebook',
    icon: RiFacebookFill
  },
  {
    title: 'website',
    icon: MdLanguage
  },
];
export default function UserAboutMain({profile}: Props) {
  return (
    <div
      className="flex flex-col text-[18px] w-[55vw] gap-[50px] sm:w-[90vw] md:w-[75vw]">
      <div>
        <h3 className="text-[33px] text-t-hover-1 mb-[20px]">
          Summary
        </h3>
        <p>
          {profile.resume?.summary}
        </p>
      </div>

      <div>
        <h3 className="text-[33px] text-t-hover-1 mb-[20px]">
          Contact
        </h3>
        <div
          className="flex items-center rounded-[3px] bg-t-main/20 px-[20px] p-[10px] mb-[15px]">
          {profile.social?.publicEmail}
        </div>
        <div
          className="flex items-center rounded-[3px] text-[18px] text-t-hover-1 gap-[20px] bg-t-main/20 p-[10px] px-[20px]">
          {socTags.map((v) => {
            const href = profile.social[v.title];
            if (!href) return;
            return (
              <a
                target="_blank"
                key={v.title}
                href={href}>
                <v.icon size={25}/>
              </a>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-[33px] text-t-hover-1 mb-[20px]">
          Hiring Info
        </h3>
        <h2 className="mb-[10px]">
          Interested in:
        </h2>
        <div
          className="flex flex-col text-t-hover-1/90 rounded-[3px] gap-[10px] px-[20px] bg-t-main/20 p-[10px]">
          {profile.resume.hiring.map((v) => (
            <span className="flex capitalize gap-[5px]" key={v}>
                <MdCheck size={22}/>
              {v}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[33px] text-t-hover-1 mb-[20px]">
          Skills
        </h3>
        <div
          className="flex flex-col px-[20px] text-t-hover-1/90 rounded-[3px] gap-[10px] bg-t-main/20 p-[10px]">
          {profile.resume.skills.map((v) => (
            <span className="flex capitalize gap-[5px]" key={v.id}>
              {v.title}
            </span>
          ))}
        </div>
      </div>

      <div hidden>
        <h3 className="text-[33px] text-t-hover-1 mb-[20px]">
          Software
        </h3>
        <p></p>
      </div>

    </div>
  );
}