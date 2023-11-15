import Image from "next/image";
import React from "react";
import Link from "next/link";
import {MdLens, MdReply, MdThumbUp} from "react-icons/md";

type Props = {};

const a = [
  {
    avatarLink: '',
    nickname: 'Popo',
    headline: 'i create art',
    comment: 'cool art',
    likeCount: 3,
    postDate: '1y',
  },
  {
    avatarLink: '',
    nickname: 'Fhert',
    headline: 'lll',
    comment: 'incredible',
    likeCount: 1,
    postDate: '2h',
  },
  {
    avatarLink: '',
    nickname: 'Mustafa',
    headline: '',
    comment: 'ai shit',
    likeCount: 10,
    postDate: '3h',
  },
];

export default function ArtworkComments(props: Props) {
  return (
    <div>
      <span className="font-bold text-[14px]">
        {a.length} COMMENTS
      </span>
      <div className="flex h-fit flex-col p-[20px] bg-t-main/20 rounded-[5px] gap-[30px]">
        {a.map((v) => {
          return (
            <div
              className="flex h-fit w-full gap-[10px]"
              key={v.nickname}>
              <Link href={`/`}
                    className="overflow-hidden rounded-full h-[40px] min-w-[40px] bg-t-main">
                {v.avatarLink
                  ?
                  <Image
                    className="h-full w-full object-cover"
                    src={v.avatarLink}
                    alt="avatar"
                    height={500}
                    width={500}/>
                  :
                  <Image
                    unoptimized
                    className="h-full w-full object-cover"
                    src="/default_avatar.png"
                    alt="avatar"
                    height={500}
                    width={500}/>
                }
              </Link>
              <div className="flex w-fit flex-col leading-none gap-[5px]">
                <Link href="/" className="object-center text-t-hover-1">
                  {v.nickname}
                </Link>
                <span hidden={!v.headline}>
                  {v.headline}
                </span>
                <p className="text-t-hover-1">
                  {v.comment}
                </p>
                <div className="flex items-center italic gap-[10px] text-[14px]">
                  <button className="transition-all duration-300 hover:text-t-hover-3">
                    Like
                  </button>
                  <MdLens size={7}/>
                  <span className="flex gap-[2px]" hidden={!v.likeCount}>
                    <MdThumbUp/>
                    {v.likeCount}
                  </span>
                  <MdLens size={7}/>
                  <span>
                    {v.postDate}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex items-start gap-[10px]">
          <textarea
            placeholder="Add a comment"
            className="min-h-[40px] h-[40px]"/>
          <button
            className="flex items-center justify-center min-w-[40px] min-h-[40px] h-[40px] bg-t-main text-t-main-2 rounded-[4px] hover:bg-t-hover-3">
            <MdReply size={25} className="mb-[2px]"/>
          </button>
        </div>
      </div>
    </div>

  );
}