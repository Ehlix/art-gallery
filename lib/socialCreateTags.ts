import {SocialObject} from "@/components/newProfile/newProfileMain";
import {MdLanguage, MdMailOutline} from "react-icons/md";
import {IconType} from "react-icons";
import {RiFacebookFill, RiInstagramLine, RiTwitterXFill} from "react-icons/ri";

export type Tag = keyof SocialObject

export type Tags = {
  title: string
  tag: Tag
  type: "site" | 'email' | 'text'
  placeholder: string
  icon: IconType
}

export const tags: Tags[] = [
  {
    title: 'Public email: ',
    tag: 'publicEmail',
    type: 'email',
    placeholder: 'youremail@artist.com',
    icon: MdMailOutline
  },
  {
    title: 'Website: ',
    tag: 'website',
    type: 'site',
    placeholder: 'https://www.mysite.com',
    icon: MdLanguage
  },
  {
    title: 'Twitter: ',
    tag: 'twitter',
    type: 'text',
    placeholder: 'username without the @',
    icon: RiTwitterXFill
  },
  {
    title: 'Facebook: ',
    tag: 'facebook',
    type: 'text',
    placeholder: 'page name',
    icon: RiFacebookFill
  },
  {
    title: 'Instagram: ',
    tag: 'instagram',
    type: 'text',
    placeholder: 'username',
    icon: RiInstagramLine
  },
];