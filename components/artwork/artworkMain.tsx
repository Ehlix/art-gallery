'use client';
import Image from "next/image";
import Link from "next/link";
import {MdBookmarkBorder, MdFavoriteBorder, MdPersonAdd} from "react-icons/md";
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
  function createdAt(): string {
    const dateNow = new Date();
    const dateCreate = new Date(artwork.created_at);
    const month = dateNow.getMonth() - dateCreate.getMonth();

    if (month <= 0) {
      const day = dateNow.getDate() - dateCreate.getDate();
      if (day <= 0) {
        return 'Posted today';
      }
      if (day === 1) {
        return 'Posted yesterday';
      }
      return `Posted ${day} days ago`;
    }
    if (month === 1) {
      return 'Posted last month';
    }
    return `Posted ${month} months ago`;
  }


  return (
    <div className="flex h-[100%] w-[100%] gap-[20px] md:flex-col">
      <div
        className="h-fit overflow-hidden bg-t-main/20 w-[100%] rounded-[5px] md:order-2">
        {artwork.files.map(v => {
          return (
            <Image key={v} src={`artworks/${artwork.folder}/${v}`} alt="art"
                   className="w-[100%]"
                   height={1000}
                   width={1000}/>
          );

        })}
      </div>
      <div className="h-fit w-[600px] md:w-[100%]">
        <div
          className="flex h-fit flex-col p-[20px] bg-t-main/20 rounded-[5px] gap-[20px]">
          <div className="flex gap-[20px]">
            <Link href={`/${user.site}`}>
              <Image src={'subjects/abstract/2.jpg'} alt={'2'}
                     className="rounded-full h-[70px] w-[70px]" height={300}
                     width={300}/>
            </Link>
            <div className="flex flex-col">
              <Link href={`/${user.site}`}>
              <span className="text-t-hover-1 text-[25px]">
                {user.name}
              </span>
              </Link>
              <span className="text-[18px]">hasefuhk@wreasef.it</span>

            </div>

          </div>
          <button
            className="flex items-center justify-center bg-none transition-all duration-300 mt-[-10px] border-t-hover-2 border-[1px] text-t-hover-2 text-[16px] h-[25px] min-w-[100px] gap-[5px] rounded-[3px] hover:border-t-hover-3 hover:text-t-hover-3">
            <div className="text-xl pb-[2px]"><MdPersonAdd/></div>
            <span>
              Follow
            </span>
          </button>
          <div className="flex justify-between gap-[20px]">
            <button
              className="flex grow items-center justify-center transition-all duration-1000 text-t-main-2 min-w-[100px] gap-[5px] bg-grad-3 rounded-[3px] h-[35px] hover:bg-grad-4">
              <div className="text-xl pb-[2px]"><MdFavoriteBorder/></div>
              <span>
                Like
              </span>
            </button>
            <button
              className="flex grow items-center justify-center transition-all text-t-main-2 min-w-[100px] gap-[5px] bg-t-main rounded-[3px] h-[35px] hover:bg-t-hover-1/70">
              <div className="text-xl pb-[2px]"><MdBookmarkBorder/></div>
              <span>
                Save
              </span>
            </button>
          </div>
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-t-hover-1 text-[25px]">
              {artwork.title}
            </h2>
            <p>
              {artwork.description}
            </p>
          </div>
          <p className="italic text-[14px]">{createdAt()}</p>
        </div>
      </div>
    </div>
  );
}