import {MdCheck, MdClose, MdPersonAdd, MdPersonAddAlt1} from "react-icons/md";
import React, {useState} from "react";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";
import Link from "next/link";
import {cn} from "@/utils/twMergeClsx";

type Props = {
  userId: string | null
  currentUser: User | null
  isFollow: boolean
  classNameFollow?: string
  classNameUnFollow?: string
};

export function UserFollow({userId, currentUser, isFollow, classNameFollow, classNameUnFollow}: Props) {
  const [isLoaded, setLoaded] = useState<boolean>(true);
  const [isFollowed, setFollowed] = useState<boolean>(isFollow);
  const supabase = createClientComponentClient<Database>();

  async function checkFollowStatus() {
    const {data} = await supabase.from('users_followers').select().match({
      user_id: userId,
      follower_id: currentUser?.id,
    });
    if (data && data[0]) {
      setFollowed(true);
      setLoaded(true);
      console.log('follow check = true');
      return data[0];
    }
    console.log('follow check = false');
    setFollowed(false);
    setLoaded(true);
    return null;
  }

  async function addFollowHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!userId || !currentUser) return

    setLoaded(false);
    const {error} = await supabase.from('users_followers').insert({
      user_id: userId,
      follower_id: currentUser.id,
    });
    if (error) {
      setLoaded(true);
      return;
    }
    console.log('follow handler');
    checkFollowStatus().then();
  }

  async function removeFollowHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoaded(false);
    const {data} = await supabase.from('users_followers').select().match({
      user_id: userId,
      follower_id: currentUser?.id
    });
    if (data && data[0]) {
      const {error} = await supabase.from('users_followers').delete().eq('id', data[0].id);
      if (!error) {
        console.log('delete follow handler');
        checkFollowStatus().then();
      }
    }
  }

  if (!currentUser) {
    return (
      <Link
        href={'/auth/sign-in'}
        className={cn("flex w-full items-center justify-center gap-1 rounded-sm border bg-none text-base transition-all duration-300 border-t-hover-2 text-t-hover-2 h-[28px] min-w-[100px] hover:border-t-hover-3 hover:text-t-hover-3", {
          [`${classNameFollow}`] : classNameFollow
        })}>
        <div>
          <MdPersonAdd size={20}/>
        </div>
        <span>
          Follow
        </span>
      </Link>
    );
  }

  return (
    isFollowed
      ?
      <button
        disabled={!isLoaded}
        onClick={removeFollowHandler}
        className={cn("flex w-fit items-center justify-start gap-1 rounded-sm bg-none text-base group text-t-hover-2 h-[28px] min-w-[100px] -ml-0.5 hover:text-t-hover-3 disabled:text-t-error/70",{
          [`${classNameUnFollow}`] : classNameUnFollow
        })}>
        <div className="flex items-center justify-center gap-1 group-hover:hidden">
          <MdCheck size={20}/>
          <span>
          Following
        </span>
        </div>
        <div
          className="hidden items-center justify-center gap-1 text-t-error group-hover:flex">
          <MdClose size={20}/>
          <span>
          Unfollow
        </span>
        </div>
      </button>
      :
      <button
        disabled={!isLoaded}
        onClick={addFollowHandler}
        className={cn("flex w-full items-center justify-center gap-1 rounded-sm border bg-t-main-2/0 text-base border-t-hover-2 text-t-hover-2 h-[28px] min-w-[100px] hover:border-t-hover-3 hover:text-t-hover-3 disabled:border-t-hover-2/70 disabled:text-t-hover-2/70",{
          [`${classNameFollow}`] : classNameFollow
        })}>
        <div>
          <MdPersonAddAlt1 size={20}/>
        </div>
        <span>
          Follow
        </span>
      </button>
  );
}