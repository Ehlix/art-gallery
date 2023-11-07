'use client';
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {MdArrowUpward} from "react-icons/md";
import {UseFormSetValue} from "react-hook-form";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {bytesToMb, renameFile} from "@/utils/utils";
import Env from "@/dictionaries/env";
import {v4} from "uuid";
import Image from "next/image";
import {canvasRatio} from "@/utils/canvasRatio";

type Props = {
  setValue: UseFormSetValue<{ name: string, headline: string, city: string, country: string, avatar: File, cover: File }>
  uniquePath: string
};

type Cover = {
  id: string
  file: File
  status: "error" | "notLoaded" | "loading" | "loaded"
}

export function UploadCover({setValue, uniquePath}: Props) {
  const supabase = createClientComponentClient();
  const inputFile = useRef(null);
  const [cover, setCover] = useState<Cover | null>(null);

  function clickHandler() {
// @ts-ignore
    inputFile.current.click();
  }

  async function imagesChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const inputFile: File | null = e.target.files && e.target.files[0];
    if (inputFile) {
      if (bytesToMb(inputFile.size) > 15) {
        console.log('file >15 mb deleted');
        return;
      }
      const file = await canvasRatio(inputFile,4)

      if (cover) {
        const {data, error} = await supabase.storage.from(Env.PROJECTS_BUCKET).remove([`cache/${uniquePath}/${cover.file.name}`]);
        if (data) {
          const newAvatar: Cover = {
            id: v4(),
            file: renameFile(file, `cover_${v4()}`),
            status: "notLoaded"
          };
          setCover(newAvatar);
        }
        if (error) {
          console.log(error);
        }
        return;
      }

      const newAvatar: Cover = {
        id: v4(),
        file: renameFile(file, `cover_${v4()}`),
        status: "notLoaded"
      };
      setCover(newAvatar);
    }
  }

  useEffect(() => {
    if (cover?.status === 'notLoaded') {
      (async () => {
        setCover({...cover, status: 'loading'});
        console.log('cover start loading..');
        const {
          data, error
        } = await supabase.storage.from(`${Env.PROJECTS_BUCKET}/cache`).upload(`${uniquePath}/${cover.file.name}`, cover.file, {
          cacheControl: '3600',
          upsert: false
        });
        if (data) {
          console.log(data);
          setCover({
            ...cover, status: 'loaded'
          });
          setValue("avatar", cover.file, {shouldValidate: true});
          console.log('cover uploaded!');
        }
        if (error) {
          console.log(error);
        }
      })();
    }
  }, [cover]);

  return (
    <div
      className="flex h-fit w-full flex-col items-center justify-center overflow-hidden p-[20px] border-t-main gap-[20px] border-[2px] rounded-[4px]">
      <div
        className="h-full w-full overflow-hidden min-w-[550px] aspect-[4/1] bg-t-main/50 xl:min-w-[400px]">
        {cover?.status === 'loaded' &&
          <Image
            className="h-full w-full object-cover"
            src={`cache/${uniquePath}/${cover.file.name}`} alt="avatar"
            height={800}
            width={800}/>
        }
      </div>
      <button
        className="flex items-center justify-center transition-all duration-300 text-t-hover-1 gap-[5px] border-t-main border-[1px] px-[20px] rounded-[4px] hover:border-t-hover-3 hover:text-t-hover-3"
        onClick={clickHandler}>
        <MdArrowUpward size={20}/>Upload cover
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