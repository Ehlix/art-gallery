'use client';
import Image from "next/image";
import Link from "next/link";
import {MdPersonAdd} from "react-icons/md";
import React from "react";

const artMocha = {
  id: 1,
  created_at: '123123132123132',
  user_id: '23f5324235d234tc2534',
  title: 'sdrgseg',
  description: 'sdrgsrdgo',
  medium: ['digital 2d', 'mixed media'],
  subject: ['abstract', 'sketches'],
  folder: 'srdg4se4gse4g',
  thumbnail: 'sdrgsrgd333g',
  files: [
    '234qestsggerer',
    '2tsegege',
    'g4seg342344',
  ]
};

const userMocha = {name: 'wqr ew', site: 'eee'};


type ArtType = typeof artMocha
type UserType = typeof userMocha

type Props = {
  artwork: ArtType
  user: UserType
};

export function ArtworkMain({artwork, user}: Props) {
  // const artwork = artwork as ArtType
  return (
    <div className="flex h-[100%] w-[100%] gap-[20px]">
      <div className="h-fit bg-t-main/20 w-[100%] rounded-[5px]">
        {artwork.files.map(v => {
          return (
            <Image key={v} src={`artworks/${artwork.folder}/${v}`} alt="art"
                   className="w-[100%]"
                   height={1000}
                   width={1000}/>
          );

        })}
      </div>
      <div className="h-fit w-[600px]">
        <div
          className="flex h-fit flex-col p-[20px] bg-t-main/20 rounded-[5px] gap-[20px]">
          <div className="flex gap-[20px]">
            <Link href={`/${user.site}`}>
              <Image src={'subjects/abstract/2.jpg'} alt={'2'}
                     className="rounded-full h-[100px] w-[100px]" height={300}
                     width={300}/>
            </Link>
            <div className="flex flex-col">
              <Link href={`/${user.site}`}>
              <span className="text-t-hover-1 text-[30px]">
                {user.name}
              </span>
              </Link>
              <span>hasefuhk@wreasef.it</span>
              <button
                className="flex items-center justify-center transition-all text-t-main-2 text-[16px] h-[25px] min-w-[100px] gap-[5px] bg-grad-1 rounded-[3px] hover:bg-grad-2">
                <div className="text-xl pb-[2px]"><MdPersonAdd/></div>
                <span>Follow</span>
              </button>
            </div>
          </div>
          <div className="flex justify-between gap-[20px]">
            <button
              className="flex grow items-center justify-center transition-all text-t-main-2 min-w-[120px] gap-[5px] bg-grad-3 rounded-[3px] h-[35px] hover:bg-grad-4">
              <div className="text-xl pb-[2px]"><MdPersonAdd/></div>
              <span>Like</span>
            </button>
            <button
              className="flex grow items-center justify-center transition-all text-t-main-2 min-w-[120px] gap-[5px] bg-t-main rounded-[3px] h-[35px] hover:bg-t-hover-1/80">
              <div className="text-xl pb-[2px]"><MdPersonAdd/></div>
              <span>Save</span>
            </button>
          </div>

          <p>
            {artwork.description}
          </p>
        </div>
      </div>
    </div>
  );
}