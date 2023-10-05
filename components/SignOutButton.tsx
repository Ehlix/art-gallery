'use client';
import React from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";

export default function SignOutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };


  return (
    <button
      onClick={logout}
      className="flex items-center justify-center transition-all w-[100px] gap-[5px] bg-t-main/70 text-t-hover-1 rounded-[5px] hover:bg-t-hover-4/70 md:hidden">Sign
      out</button>
  );
}