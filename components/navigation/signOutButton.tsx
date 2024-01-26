"use client";
import { MdLogout } from "react-icons/md";
import * as React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";

export const SignOutButton = () => {
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const router = useRouter();
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace(pathname);
    router.refresh();
  };

  return (
    <button
      onClick={logout}
      className="flex w-auto items-center justify-start gap-3 rounded-md p-3 py-2 text-t-hover-1 transition-all hover:bg-t-main/70"
    >
      <MdLogout className="mt-0.5" />
      <span>Sign out</span>
    </button>
  );
};
