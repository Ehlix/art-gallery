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

type ArtworkComment = Database['public']['Tables']['artworks_comments']['Row'];
type CommentLike = Database['public']['Tables']['comments_artworks_likes']['Row'];

type CommentsData = {
  avatarLink: string
  nickname: string
  headline: string
  comment: ArtworkComment
  likeCount: number | string
  order: number
  createdAt: number | string
  site: string
  currUserCommentLiked: boolean
}

export const ArtworkComments = ({artwork_id, currentUser}: Props) => {
  const [commentsData, setCommentsData] = useState<CommentsData[]>([]);
  const [isView, setIsView] = useState<boolean>(false);
  const [likesIsLoaded, setLikesIsLoaded] = useState<boolean>(true);
  const supabase = createClientComponentClient<Database>();

  const getCommentsData = async () => {
    const newCommentsData: CommentsData[] = [];
    const {data: comments} = await supabase
      .from('artworks_comments')
      .select()
      .eq('artwork_id', artwork_id);
    if (comments) {
      for (const comment of comments) {
        const {data: Profiles} = await supabase
          .from('profiles')
          .select()
          .eq('user_id', comment.user_id || '');
        const profile = Profiles && Profiles[0];
        if (profile) {
          const {data: currUserCommentLike} = await supabase
            .from('comments_artworks_likes')
            .select()
            .match({
              'comment_id': comment.id || '',
              'user_id': currentUser?.id || '',
            });
          const {count: likesCount} = await supabase
            .from('comments_artworks_likes')
            .select('*', {count: 'exact'})
            .eq('comment_id', comment.id);
          const avatarLink = (profile.folder && profile.avatar)
            ? `avatars/${profile.folder}/${profile.avatar}`
            : '';
          const createdAt = new Date(comment.created_at);
          newCommentsData.push(
            {
              avatarLink: avatarLink,
              nickname: profile.name || '',
              comment: comment,
              likeCount: likesCount || 0,
              headline: profile.headline || '',
              order: createdAt.getTime(),
              createdAt: createdAt.toLocaleString(),
              site: `/${profile.site}` || '/',
              currUserCommentLiked: !!currUserCommentLike?.length,
            }
          );
        }
      }
    }
    setCommentsData([...newCommentsData]);
    setLikesIsLoaded(true);
  };

  const refresh = () => {
    getCommentsData().then();
  };

  const commentLikeAdd = async (comment: ArtworkComment) => {
    if (!comment || !currentUser || !likesIsLoaded) {
      return;
    }
    console.log('add');
    setLikesIsLoaded(false);
    const {error} = await supabase
      .from('comments_artworks_likes')
      .insert({
        comment_id: comment.id,
        user_id: currentUser.id,
      });
    if (error) {
      console.log('error: ', error.message);
    }
  };

  const commentLikeRemove = async (commentLike: CommentLike) => {
    console.log('remove');
    if (!currentUser || !likesIsLoaded) {
      return;
    }
    setLikesIsLoaded(false);
    const {error} = await supabase
      .from('comments_artworks_likes')
      .delete()
      .eq('id', commentLike.id);
    if (error) {
      console.log('error: ', error.message);
    }
  };

  const commentLikeHandler = async (e: React.MouseEvent<HTMLButtonElement>, comment: ArtworkComment) => {
    e.preventDefault();
    const {data: curUserCommentLike} = await supabase
      .from('comments_artworks_likes')
      .select()
      .match({
        comment_id: comment.id || '',
        user_id: currentUser?.id || '',
      });
    if (curUserCommentLike && curUserCommentLike[0]) {
      commentLikeRemove(curUserCommentLike[0]).then(() => refresh());
    } else {
      commentLikeAdd(comment).then(() => refresh());
    }
  };


  useEffect(() => {
    getCommentsData().then();
  }, []);

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
        {
          commentsData
            .toSorted((a, b) => a.order - b.order)
            .map((v, i) =>
              (
                <div
                  className="flex h-fit w-full gap-2"
                  key={i}>
                  <Link href={v.site}
                        className="overflow-hidden rounded-full h-[40px] min-w-[40px] bg-t-main">
                    {
                      v.avatarLink
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
                    <span>
                      {v.headline}
                    </span>
                    <p className="text-t-hover-1">
                      {v.comment.title}
                    </p>
                    <div className="flex items-center gap-2 text-sm italic">
                      <button
                        onClick={(e) => commentLikeHandler(e, v.comment)}
                        className="transition-all duration-300 hover:text-t-hover-3">
                        Like
                      </button>
                      <span className={cn("flex gap-2 justify-center items-center", {
                        'hidden': !v.likeCount,
                      })}>
                        <MdLens size={7}/>
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
            )
        }
        {
          currentUser &&
          <AddComment
            refresh={refresh}
            artwork_id={artwork_id}
            user={currentUser}/>
        }
      </div>
    </div>

  );
};