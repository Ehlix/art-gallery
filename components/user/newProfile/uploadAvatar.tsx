'use client';
import * as React from "react";
import {useRef} from "react";
import {MdArrowUpward} from "react-icons/md";

type Props = {};

export function UploadAvatar(props: Props) {
  const inputFile = useRef(null);

  function clickHandler() {
// @ts-ignore
    inputFile.current.click();
  }

  async function imagesChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file: File | null = e.target.files && e.target.files[0];
    if (file) {
      console.log(file);
    }
  }

  return (
    <div
      className="flex h-fit w-full flex-col items-center justify-center border-t-main gap-[20px] border-[2px] rounded-[4px] p-[20px]">
      <div className="rounded-full h-[110px] w-[110px] bg-t-main/50">

      </div>
      <button
        className="flex items-center justify-center transition-all duration-300 gap-[5px] text-t-hover-1 border-t-main border-[1px] px-[20px] rounded-[4px] hover:border-t-hover-3 hover:text-t-hover-3"
        onClick={clickHandler}>
        <MdArrowUpward size={20}/>Upload avatar
      </button>
      <input
        className="hidden" type="file"
        onChange={imagesChangeHandler}
        ref={inputFile}
        accept="image/,.png,.jpg,.jpeg"
      />
    </div>
  );
}