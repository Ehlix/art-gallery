"use client";
import { useRouter, useSearchParams } from "next/navigation";
type Props = {
  isAuthorized: boolean;
};

export const ExploreLinks = ({ isAuthorized }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeExplore = (
    e: React.MouseEvent<HTMLButtonElement>,
    search: string,
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("sort_by", search);
    router.replace(`/?${params.toString()}`);
  };
  return (
    <div className="group relative flex justify-center">
      <div
        className="hover:before:l-0 relative capitalize decoration-t-hover-2 decoration-[2.5px]
        group-hover:text-t-hover-1 group-hover:before:absolute group-hover:before:top-full group-hover:before:h-[3px] group-hover:before:w-full group-hover:before:rounded-md group-hover:before:bg-t-hover-2
            "
      >
        Explore
      </div>
      <div className="absolute top-full -mt-2 hidden flex-col group-hover:flex">
        <div className="mt-4 flex flex-col gap-3 rounded-md bg-t-main-3/80 p-3 px-5 shadow-lg shadow-t-shadow-1 backdrop-blur-md *:flex *:justify-start hover:*:text-t-hover-1">
          <button onClick={(e) => changeExplore(e, "trending")}>
            Trending
          </button>
          <button onClick={(e) => changeExplore(e, "latest")}>Latest</button>
          {isAuthorized && (
            <button onClick={(e) => changeExplore(e, "following")}>
              Following
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
