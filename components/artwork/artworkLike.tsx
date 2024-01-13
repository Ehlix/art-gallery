import {MdFavorite, MdFavoriteBorder, MdHeartBroken} from "react-icons/md";
import React, {useState} from "react";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";
import Link from "next/link";

type Props = {
  artworkId: number
  currentUser: User | null
  like: boolean
};

export const ArtworkLike = ({artworkId, currentUser, like}: Props) => {
  const [isLoaded, setLoaded] = useState<boolean>(true);
  const [isLiked, setLiked] = useState<boolean>(like);
  const supabase = createClientComponentClient<Database>();

  const checkLikeStatus = async () => {
    const {data} = await supabase
      .from('artworks_likes')
      .select()
      .match({
        artwork_id: artworkId,
        user_id: currentUser?.id,
      });
    if (data && data[0]) {
      setLiked(true);
      setLoaded(true);
      console.log('like check = true');
      return data[0];
    }
    console.log('like check = false');
    setLiked(false);
    setLoaded(true);
    return null;
  };

  const addLikeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!artworkId || !currentUser) return;

    setLoaded(false);
    const {error} = await supabase
      .from('artworks_likes')
      .insert({
        artwork_id: artworkId,
        user_id: currentUser.id,
      });
    if (error) {
      setLoaded(true);
      return;
    }
    console.log('like handler');
    checkLikeStatus().then();
  };

  const removeLikeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoaded(false);
    const {data} = await supabase
      .from('artworks_likes')
      .select()
      .match({
        artwork_id: artworkId,
        user_id: currentUser?.id,
      });
    if (data && data[0]) {
      const {error} = await supabase
        .from('artworks_likes')
        .delete()
        .eq('id', data[0].id);
      if (!error) {
        console.log('delete handler');
        checkLikeStatus().then();
      }
    }
  };

  if (!currentUser) {
    return (
      <Link
        href={'/auth/sign-in'}
        className="flex grow items-center justify-center gap-1 rounded-sm transition-all duration-300 text-t-main-2 min-w-[100px] bg-t-hover-5 h-[35px] pb-0.5 hover:bg-t-hover-6">
        <MdFavoriteBorder size={22}/>
        <span>
        Like
      </span>
      </Link>
    );
  }

  return (
    isLiked
      ?
      <button
        disabled={!isLoaded}
        onClick={removeLikeHandler}
        className="flex grow items-center justify-center rounded-sm bg-none leading-none group text-t-hover-2 w-[35px] h-[35px] pb-0.5 hover:bg-t-error/30">
        <div className="flex gap-1 group-hover:hidden">
          <MdFavorite size={22}/>
          <span>
            Liked
          </span>
        </div>
        <div className="hidden gap-1 text-t-error group-hover:flex">
          <MdHeartBroken size={22}/>
          <span>
            Liked
          </span>
        </div>
      </button>
      :
      <button
        disabled={!isLoaded}
        onClick={addLikeHandler}
        className="flex grow items-center justify-center gap-1 rounded-sm transition-all duration-300 text-t-main-2 min-w-[100px] bg-t-hover-5 h-[35px] pb-0.5 hover:bg-t-hover-6 disabled:bg-t-hover-5/70 disabled:hover:bg-t-hover-5/70">
        <div className="">
          <MdFavoriteBorder size={22}/>
        </div>
        <span>
        Like
      </span>
      </button>
  );
};