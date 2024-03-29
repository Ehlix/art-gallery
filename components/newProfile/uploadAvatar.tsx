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
  currentAvatar: string
};

type Avatar = {
  id: string
  file: File
  status: "error" | "notLoaded" | "loading" | "loaded"
}

export const UploadAvatar = ({
                               uniquePath,
                               setPictures,
                               setLoading,
                               currentAvatar
                             }: Props) => {
  const supabase = createClientComponentClient();
  const inputFile = useRef(null);
  const [avatar, setAvatar] = useState<Avatar | null>(null);

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
      const file = await canvasRatio(inputFile, 1);
      if (avatar) {
        const {data, error} = await supabase
          .storage
          .from(Env.PROJECTS_BUCKET)
          .remove([`cache/${uniquePath}/${avatar.file.name}`]);
        if (data) {
          const newAvatar: Avatar = {
            id: v4(),
            file: renameFile(file, `avatar_${v4()}`),
            status: "notLoaded"
          };
          setAvatar(newAvatar);
        }
        if (error) {
          console.log(error);
        }
        return;
      }
      const newAvatar: Avatar = {
        id: v4(),
        file: renameFile(file, `avatar_${v4()}`),
        status: "notLoaded"
      };
      setAvatar(newAvatar);
    }
  };

  useEffect(() => {
    if (avatar?.status === 'notLoaded') {
      (async () => {
        setLoading(true);
        setAvatar({...avatar, status: 'loading'});
        console.log('avatar start loading..');
        const {data, error} = await supabase
          .storage
          .from(`${Env.PROJECTS_BUCKET}/cache`)
          .upload(`${uniquePath}/${avatar.file.name}`, avatar.file, {
            cacheControl: '3600',
            upsert: false
          });
        if (data) {
          console.log(data);
          setAvatar({
            ...avatar, status: 'loaded'
          });
          setPictures((prev) => {
            return {
              ...prev,
              avatarId: avatar.file.name,
              folderId: uniquePath
            };
          });
          setLoading(false);
          console.log('avatar uploaded!');
        }
        if (error) {
          setLoading(false);
          console.log(error);
        }
      })();
    }
  }, [avatar]);

  return (
    <div
      className="flex h-fit w-full flex-col items-center justify-center gap-5 border-2 p-5 border-t-main rounded-[4px]">
      <div className="overflow-hidden rounded-full h-[110px] w-[110px] bg-t-main/50">
        {avatar?.status === 'loaded'
          ?
          <Image
            className="h-full w-full object-cover"
            src={`cache/${uniquePath}/${avatar.file.name}`} alt="avatar"
            height={500}
            width={500}/>
          :
          <Image
            className="h-full w-full object-cover"
            src={currentAvatar} alt="avatar"
            unoptimized={currentAvatar[0] === '/'}
            height={500}
            width={500}/>
        }
      </div>
      <button
        disabled={avatar?.status === 'loading'}
        className="flex items-center justify-center rounded-md border px-5 transition-all duration-300 gap-0.5 text-t-hover-1 border-t-main hover:border-t-hover-3 hover:text-t-hover-3"
        onClick={clickHandler}>
        <MdArrowUpward size={20}/>Upload avatar
      </button>
      <input
        disabled={avatar?.status === 'loading'}
        className="hidden" type="file"
        onChange={imagesChangeHandler}
        ref={inputFile}
        accept="image/,.png,.jpg,.jpeg"
      />
    </div>
  );
};