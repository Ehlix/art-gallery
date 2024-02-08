import Link from "next/link";
import React, { Suspense } from "react";
import { NavMobileButton } from "@/components/navigation/navMobileButton";
import { SearchBar } from "@/components/navigation/searchBar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { UserNavPanel } from "@/components/navigation/userNavPanel";
import { AuthButton } from "@/components/navigation/authButton";
import Image from "next/image";
import { Database } from "@/lib/database.types";
import { LoadingSpinner } from "../loadingSpinner";
import { ExploreLinks } from "./exploreLinks";

export const NavMain = async () => {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  });
  const { data } = await supabase.auth.getSession();
  const isAuthorized = data?.session !== null;
  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", data?.session?.user.id || "");
  const userHasProfile = !!data.session && !!profile && !profile[0];
  console.log("Authorized: ", isAuthorized);

  return (
    <>
      <nav className="no-wrap container fixed top-0 z-40 flex h-[60px] w-full select-none items-center justify-between gap-7 bg-t-main-2 text-t-main md:h-[45px]">
        <NavMobileButton isAuthorized={isAuthorized} />
        <Link
          href="/"
          className="min-h-[40px] min-w-[40px] md:absolute md:left-0 md:right-0 md:mx-auto md:w-[40px]"
        >
          <Image
            src="/logo.svg"
            alt="1231"
            width={100}
            height={100}
            sizes="100vw"
            className="h-[40px] w-[40px]"
            unoptimized
            priority={true}
          />
        </Link>
        <div className="relative flex w-full items-center gap-7 md:hidden">
          <ExploreLinks isAuthorized={isAuthorized} />
          <SearchBar />
        </div>
        <Suspense
          fallback={
            <div className="flex items-center justify-center pr-2">
              <LoadingSpinner isLoading={true} />
            </div>
          }
        >
          <div className="flex h-[35px] w-auto gap-5 text-base">
            {isAuthorized ? <UserNavPanel /> : <AuthButton />}
          </div>
        </Suspense>
      </nav>
      <div className="relative top-0 min-h-[60px] w-full md:min-h-[45px]"></div>
      {userHasProfile && (
        <>
          <div className="fixed z-30 flex h-[25px] w-full items-center justify-center bg-t-pop-1">
            <Link
              className="text-t-main-2 transition duration-200 hover:text-t-hover-1"
              href="/user/create-profile"
            >
              Please complete your profile!
            </Link>
          </div>
          <div className="top-0 min-h-[30px] w-full"></div>
        </>
      )}
    </>
  );
};
