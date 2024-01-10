import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {MdArrowUpward} from "react-icons/md";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Env from "@/lib/env";
import {v4} from "uuid";
import Image from "next/image";
import {canvasRatio} from "@/utils/canvasRatio";
import {NewProfilePictures} from "@/components/newProfile/newProfileMain";
import {bytesToMb} from "@/utils/bytesToMb";
import {renameFile} from "@/utils/renameFile";

type Props = {
  uniquePath: string
  setPictures: React.Dispatch<React.SetStateAction<NewProfilePictures>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  currentCover: string
};

type Cover = {
  id: string
  file: File
  status: "error" | "notLoaded" | "loading" | "loaded"
}

export const UploadCover = ({
                              uniquePath,
                              setPictures,
                              currentCover,
                              setLoading
                            }: Props) => {
  const supabase = createClientComponentClient();
  const inputFile = useRef(null);
  const [cover, setCover] = useState<Cover | null>(null);

  const clickHandler = () => {
// @ts-ignore
    inputFile.current.click();
  };

  const imagesChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile: File | null = e.target.files && e.target.files[0];
    if (inputFile) {
      if (bytesToMb(inputFile.size) > 15) {
        console.log('file >15 mb deleted');
        return;
      }
      const file = await canvasRatio(inputFile, 4);
      if (cover) {
        const {data, error} = await supabase
          .storage
          .from(Env.PROJECTS_BUCKET)
          .remove([`cache/${uniquePath}/${cover.file.name}`]);
        if (data) {
          const newAvatar: Cover = {
            id: v4(),
            file: renameFile(file, `cover_${v4()}.jpg`),
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
        file: renameFile(file, `cover_${v4()}.jpg`),
        status: "notLoaded"
      };
      setCover(newAvatar);
    }
  };

  useEffect(() => {
    if (cover?.status === 'notLoaded') {
      (async () => {
        setLoading(true);
        setCover({...cover, status: 'loading'});
        console.log('cover start loading..');
        const {data, error} = await supabase
          .storage
          .from(`${Env.PROJECTS_BUCKET}/cache`)
          .upload(`${uniquePath}/${cover.file.name}`, cover.file, {
            cacheControl: '3600',
            upsert: false
          });
        if (data) {
          console.log(data);
          setCover({
            ...cover, status: 'loaded'
          });
          setPictures((prev) => {
            return {
              ...prev,
              coverId: cover.file.name,
              folderId: uniquePath
            };
          });
          setLoading(false);
          console.log('cover uploaded!');
        }
        if (error) {
          setLoading(false);
          console.log(error);
        }
      })();
    }
  }, [cover]);

  return (
    <div
      className="flex h-fit w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-md border-2 p-5 border-t-main">
      <div
        className="h-full w-full overflow-hidden min-w-[550px] aspect-[4/1] bg-t-main/50 xl:min-w-[400px]">
        {cover?.status === 'loaded' ?
          <Image
            className="h-full w-full object-cover"
            src={`cache/${uniquePath}/${cover.file.name}`} alt="avatar"
            height={800}
            width={800}/>
          :
          <Image
            className="h-full w-full object-cover"
            src={currentCover} alt="avatar"
            unoptimized={currentCover[0] === '/'}
            height={800}
            width={800}/>
        }
      </div>
      <button
        disabled={cover?.status === 'loading'}
        className="flex items-center justify-center rounded-md border px-5 transition-all duration-300 text-t-hover-1 gap-0.5 border-t-main hover:border-t-hover-3 hover:text-t-hover-3"
        onClick={clickHandler}>
        <MdArrowUpward size={20}/>
        Upload cover
      </button>
      <input
        className="hidden" type="file"
        onChange={imagesChangeHandler}
        ref={inputFile}
        accept="image/,.png,.jpg,.jpeg"/>
    </div>
  );
};