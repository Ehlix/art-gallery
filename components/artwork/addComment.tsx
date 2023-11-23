import {MdReply} from "react-icons/md";
import React, {useState} from "react";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/lib/database.types";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

type Artworks = Database['public']['Tables']['artworks_comments']['Row']

type Props = {
  artwork_id: string | number
  user: User | null
  refresh: ()=>void
};

export function AddComment({artwork_id, user,refresh}: Props) {
  const supabase = createClientComponentClient<Database>();
  const [comment, setComment] = useState<string>('');

  function addCommentHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setComment(e.currentTarget.value.trimStart());

  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {data, error} = await supabase.from('artworks_comments').insert(
      {
        artwork_id: +artwork_id,
        user_id: user?.id,
        title: comment
      }
    ).select();
    if (data) {
      setComment('');
      refresh()
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex items-start gap-2">
          <textarea
            onChange={addCommentHandler}
            value={comment}
            placeholder="Add a comment"
            className="min-h-[40px] h-[40px]"/>
      <button
        type="submit"
        disabled={!comment}
        className="flex items-center justify-center rounded-sm min-w-[40px] min-h-[40px] h-[40px] bg-t-main text-t-main-2 hover:bg-t-hover-3 disabled:bg-t-main/50 disabled:hover:bg-t-main/50">
        <MdReply size={25} className="mb-0.5"/>
      </button>
    </form>
  );
}