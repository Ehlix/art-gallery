import {
  MdBookmarkAdd, MdBookmarkAdded,
  MdBookmarkBorder, MdBookmarkRemove, MdDone,
  MdFavorite,
  MdFavoriteBorder,
  MdHeartBroken
} from "react-icons/md";
import React, {useState} from "react";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";

type Props = {
  artwork_id: number
  currentUser: User
  bookmarks: boolean
};

export function ArtworkBookmark({bookmarks,artwork_id,currentUser}: Props) {
  const [isLoaded, setLoaded] = useState<boolean>(true);
  const [isLiked, setLiked] = useState<boolean>(bookmarks);
  const supabase = createClientComponentClient<Database>();

  async function checkLikeStatus() {
    const {data} = await supabase.from('artworks_bookmarks').select().match({
      artwork_id: artwork_id,
      user_id: currentUser.id,
    })
    if (data && data[0]) {
      setLiked(true)
      setLoaded(true)
      console.log('book check = true')
      return data[0]
    }
    console.log('book check = false')
    setLiked(false)
    setLoaded(true)
    return null
  }

  async function addBookmarkHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoaded(false)
    const {error} = await supabase.from('artworks_bookmarks').insert({
      artwork_id: artwork_id,
      user_id: currentUser.id,
    });
    if (error) {
      setLoaded(true)
      return
    }
    console.log('book handler')
    checkLikeStatus().then()

  }

  async function removeBookmarkHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoaded(false)
    const {data} = await supabase.from('artworks_bookmarks').select().match({
      artwork_id: artwork_id,
      user_id: currentUser.id,
    })
    if (data && data[0]) {
      const {error} = await supabase.from('artworks_bookmarks').delete().eq('id', data[0].id)
      if (!error) {
        console.log('delete book handler')
        checkLikeStatus().then()
      }
    }
  }
  return (
    isLiked
      ?
      <button
        disabled={!isLoaded}
        onClick={removeBookmarkHandler}
        className="group disabled:hover:bg-t-error/10 disabled:bg-t-error/10 flex grow items-center justify-center gap-1 rounded-sm text-t-main-2 min-w-[100px] bg-t-main h-[35px] pb-0.5 hover:bg-t-error/30">
        <span className='flex justify-center items-center gap-1 group-hover:hidden'>
          <MdBookmarkAdded size={22}/>
          <span>
          Saved
        </span>
        </span>

        <span className='justify-center items-center gap-1 hidden text-t-error group-hover:flex'>
          <MdBookmarkRemove size={22}/>
          <span>
          Remove
        </span>
        </span>

      </button>
      :
      <button
        disabled={!isLoaded}
        onClick={addBookmarkHandler}
        className="disabled:hover:bg-t-main/70 disabled:bg-t-main/70 flex grow items-center justify-center gap-1 rounded-sm transition-all duration-300 text-t-main-2 min-w-[100px] bg-t-main h-[35px] pb-0.5 hover:bg-t-hover-1/70">
        <div>
          <MdBookmarkAdd size={22}/>
        </div>
        <span>
          Save
        </span>
      </button>
  );
}