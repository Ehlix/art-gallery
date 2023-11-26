import {MdFavorite, MdFavoriteBorder, MdHeartBroken} from "react-icons/md";
import React, {useState} from "react";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";

type Props = {
  artwork_id: number
  currentUser: User
  like: boolean
};

export function ArtworkLike({artwork_id, currentUser, like}: Props) {
  const [isLoaded, setLoaded] = useState<boolean>(true);
  const [isLiked, setLiked] = useState<boolean>(like);
  const supabase = createClientComponentClient<Database>();

  async function checkLikeStatus() {
    const {data} = await supabase.from('artworks_likes').select().match({
      artwork_id: artwork_id,
      user_id: currentUser.id,
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
  }

  async function addLikeHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoaded(false);
    const {error} = await supabase.from('artworks_likes').insert({
      artwork_id: artwork_id,
      user_id: currentUser.id,
    });
    if (error) {
      setLoaded(true);
      return;
    }
    console.log('like handler');
    checkLikeStatus().then();

  }

  async function removeLikeHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoaded(false);
    const {data} = await supabase.from('artworks_likes').select().match({
      artwork_id: artwork_id,
      user_id: currentUser.id,
    });
    if (data && data[0]) {
      const {error} = await supabase.from('artworks_likes').delete().eq('id', data[0].id);
      if (!error) {
        console.log('delete handler');
        checkLikeStatus().then();
      }
    }
  }

  return (
    isLiked
      ?
      <button
        disabled={!isLoaded}
        onClick={removeLikeHandler}
        className="flex items-center justify-center rounded-sm bg-none leading-none group text-t-hover-2 w-[35px] h-[35px] pb-0.5 hover:bg-t-error/30">
        <span className="group-hover:hidden">
          <MdFavorite size={22}/>
        </span>
        <span className="hidden text-t-error group-hover:block">
          <MdHeartBroken size={22}/>
        </span>
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
}