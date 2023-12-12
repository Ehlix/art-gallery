import Image from "next/image";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {MdArrowDropDown, MdLens, MdThumbUp} from "react-icons/md";
import {AddComment} from "@/components/artwork/addComment";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";
import {cn} from "@/utils/twMergeClsx";

type Props = {
  artwork_id: number
  currentUser: User | null
};

type ArtworkComments = Database['public']['Tables']['artworks_comments']['Row']

type CommentsData = {
  avatarLink: string,
  nickname: string,
  headline: string,
  comment: ArtworkComments,
  likeCount: 3,
  order: number
  createdAt: number | string
  site: string
}

type MetadataObj = {
  site: string
  name: string
}

export default function ArtworkComments({artwork_id, currentUser}: Props) {
  const [commentsData, setCommentsData] = useState<CommentsData[]>([]);
  const [isView, setIsView] = useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    getCommentsData().then();
  }, []);

  function refresh() {
    getCommentsData().then();
  }

  async function getCommentsData() {
    const newCommentsData: CommentsData[] = [];
    const {data} = await supabase.from('artworks_comments').select().eq('artwork_id', artwork_id);
    if (data) {
      for (const v of data) {
        const {data} = await supabase.from('profiles').select().eq('user_id', v.user_id || '');
        const {data: user} = await supabase.from('users').select().eq('id', v.user_id || '');
        const profile = data && data[0];
        if (profile) {
          const avatarLink = (profile.folder && profile.avatar) ? `avatars/${profile.folder}/${profile.avatar}` : '';
          const createdAt = new Date(v.created_at);
          const metadata: MetadataObj | null = user && user[0].metadata as MetadataObj;
          newCommentsData.push({
            avatarLink: avatarLink,
            nickname: profile.name || '',
            comment: v,
            likeCount: 3,
            headline: profile.headline || '',
            order: createdAt.getTime(),
            createdAt: createdAt.toLocaleString(),
            site: `/${metadata?.site}` || '/',
          });
        }
      }
    }
    setCommentsData([...newCommentsData]);
  }

  return (
    <div>
      <span className="text-sm font-bold">
        {!!commentsData.length && commentsData.length} COMMENTS
      </span>
      <button
        onClick={() => setIsView(true)}
        className={cn('p-4 rounded-md bg-t-main/20 hidden md:flex w-full justify-center h-0 items-center', {
          'md:hidden': isView
        })}>
        <MdArrowDropDown size={45}/>
      </button>
      <div
        className={cn("flex h-fit flex-col gap-7 rounded-md p-5 bg-t-main/20 md:hidden md:p-5", {
          'md:flex': isView
        })}>
        {commentsData.toSorted((a, b) => a.order - b.order).map((v, i) => (
            <div
              className="flex h-fit w-full gap-2"
              key={i}>
              <Link href={v.site}
                    className="overflow-hidden rounded-full h-[40px] min-w-[40px] bg-t-main">
                {v.avatarLink
                  ?
                  <Image
                    className="h-full w-full object-cover"
                    src={v.avatarLink}
                    priority={true}
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
              <div className="flex w-fit flex-col gap-1 leading-none">
                <Link href={v.site}
                      className="object-center text-t-hover-1">
                  {v.nickname}
                </Link>
                <span hidden={!v.headline}>
                  {v.headline}
                </span>
                <p className="text-t-hover-1">
                  {v.comment.title}
                </p>
                <div className="flex items-center gap-2 text-sm italic">
                  <button className="transition-all duration-300 hover:text-t-hover-3">
                    Like
                  </button>
                  <MdLens size={7}/>
                  <span className="flex gap-0.5" hidden={!v.likeCount}>
                    <MdThumbUp/>
                    {v.likeCount}
                  </span>
                  <MdLens size={7}/>
                  <span>
                    {v.createdAt}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
        {currentUser &&
          <AddComment
            refresh={refresh}
            artwork_id={artwork_id}
            user={currentUser}/>
        }
      </div>
    </div>

  );
}