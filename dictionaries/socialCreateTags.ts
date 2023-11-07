import {SocialObject} from "@/components/user/newProfile/newProfileMain";

export type Tag = keyof SocialObject

export type Tags = {
  title: string
  tag: Tag
  type: "site" | 'email' | 'text'
  placeholder: string
}

export const tags: Tags[] = [
  {title: 'Public email: ', tag: 'publicEmail', type: 'email', placeholder: 'youremail@artist.com'},
  {title: 'Website: ', tag: 'website', type: 'site', placeholder: 'https://www.mysite.com'},
  {title: 'Twitter: ', tag: 'twitter', type: 'text', placeholder: 'username without the @'},
  {title: 'Facebook: ', tag: 'facebook', type: 'text', placeholder: 'page name'},
  {title: 'Instagram: ', tag: 'instagram', type: 'text', placeholder: 'username'},
];