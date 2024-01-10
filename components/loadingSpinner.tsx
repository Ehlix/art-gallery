import {cn} from "@/utils/twMergeClsx";
import {RiLoader3Line} from "react-icons/ri";
import * as React from "react";

type Props = {
  isLoading: boolean
};

export const LoadingSpinner = ({isLoading}: Props) => {
  return (
    isLoading
      ?
      <div
        className={cn("h-[40px] flex gap-1 justify-center items-center text-xl text-t-main w-full")}>
        Loading
        <span className="animate-spin text-t-hover-2">
          <RiLoader3Line size={30}/>
        </span>
      </div>
      :
      <div
        className="w-full h-[40px]">
      </div>
  );
};