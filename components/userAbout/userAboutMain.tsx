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
export const UserAboutMain = ({profile}: Props) => (
  <div
    className="flex flex-col gap-12 text-lg w-[55vw] sm:w-[90vw] md:w-[75vw]">
    {
      Object.values(profile.resume.summary).some((v) => !!v) &&
      <div>
        <h3 className="mb-5 text-4xl text-t-hover-1">
          Summary
        </h3>
        <p>
          {profile.resume?.summary}
        </p>
      </div>
    }
    {
      Object.values(profile.social).some((v) => !!v) &&
      <div>
        <h3 className="mb-5 text-4xl text-t-hover-1">
          Contact
        </h3>
        {profile.social?.publicEmail &&
          <div
            className="mb-3 flex items-center rounded-md p-3 px-5 bg-t-main/20">
            {profile.social?.publicEmail}
          </div>
        }
        <div
          className="flex items-center gap-5 rounded-md p-3 px-5 text-lg text-t-hover-1 bg-t-main/20">
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
    }
    {
      profile.resume.hiring.some(v => !!v) &&
      <div>
        <h3 className="mb-5 text-4xl text-t-hover-1">
          Hiring Info
        </h3>
        <h2 className="mb-2">
          Interested in:
        </h2>
        <div
          className="flex flex-col gap-2 rounded-md p-3 px-5 text-t-hover-1/90 bg-t-main/20">
          {profile.resume.hiring.map((v) => (
            <span className="flex capitalize gap-[5px]" key={v}>
                <MdCheck size={22}/>
              {v}
            </span>
          ))}
        </div>
      </div>
    }
    {
      profile.resume.skills.every((v) => !!v) &&
      <div>
        <h3 className="mb-5 text-4xl text-t-hover-1">
          Skills
        </h3>
        <div
          className="flex flex-col gap-2 rounded-md p-3 px-5 text-t-hover-1/90 bg-t-main/20">
          {profile.resume.skills.map((v) => (
            <span className="flex capitalize gap-0.5" key={v.id}>
              {v.title}
            </span>
          ))}
        </div>
      </div>
    }
    <div hidden>
      <h3 className="mb-5 text-4xl text-t-hover-1">
        Software
      </h3>
      <p></p>
    </div>
  </div>
);