import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {ThumbnailType} from "@/components/newProject/newProjectMain";
import {cn} from "@/utils/twMergeClsx";
import {CropImage} from "@/components/cropImage";
import Image from "next/image";
import {v4} from "uuid";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Env from "@/lib/env";
import {bytesToMb} from "@/utils/bytesToMb";
import {renameFile} from "@/utils/renameFile";

type Props = {
  thumbnail: ThumbnailType | null
  setThumbnail: React.Dispatch<React.SetStateAction<ThumbnailType | null>>
  uniquePath: string
};

export const Thumbnail = ({setThumbnail, thumbnail, uniquePath}: Props) => {
  const inputFile = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const supabase = createClientComponentClient();

  const clickHandler = () => {
// @ts-ignore
    inputFile.current.click();
  };

  const imagesChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files && e.target.files[0];
    if (file) {
      if (bytesToMb(file.size) > 15) {
        console.log('file >15 mb deleted');
        return;
      }
      const tName = v4();
      if (thumbnail?.file) {
        const {data, error} = await supabase
          .storage
          .from(Env.PROJECTS_BUCKET)
          .remove([`cache/${uniquePath}/${thumbnail.file.name}`]);
        if (data) {
          const thumb: ThumbnailType = {
            id: `thumbnail_${tName}.jpg`,
            file: renameFile(file, `thumbnail_${tName}`),
            status: "notLoaded"
          };
          setThumbnail(thumb);
        }
        if (error) {
          console.log(error);
        }
        return;
      }
      const thumb: ThumbnailType = {
        id: `thumbnail_${tName}.jpg`,
        file: renameFile(file, `thumbnail_${tName}`),
        status: "notLoaded"
      };
      setThumbnail(thumb);
    }
  };

  const uploadThumb = async (thumbnail: ThumbnailType) => {
    if (thumbnail.status === 'notLoaded' && thumbnail.file) {
      thumbnail.status = 'loading';
      console.log('thumb upload start..');
      const {data, error} = await supabase
        .storage
        .from(`${Env.PROJECTS_BUCKET}/cache`)
        .upload(`${uniquePath}/${thumbnail.file.name}`, thumbnail.file, {
          cacheControl: '3600',
          upsert: false
        });
      if (data) {
        console.log(data);
        setThumbnail({
          ...thumbnail,
          status: "loaded"
        });
        console.log('thumb uploaded');
      }
      if (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (thumbnail?.status === 'notLoaded' && thumbnail.file) {
      uploadThumb(thumbnail).finally();
    }
  }, [thumbnail]);

  return (
    <div className="flex w-fit flex-col gap-2">
      <div
        className="overflow-hidden rounded-md border-2 border-t-main h-[300px] w-[300px] md:h-[200px] md:w-[200px]">
        {thumbnail?.status === 'loaded' &&
          (thumbnail.file ?
            <Image src={`cache/${uniquePath}/${thumbnail.id}`}
                   alt={'thumbnail'}
                   height={300}
                   width={300}
                   priority={true}
                   className="h-full w-full object-cover object-center"/>
            :
            <Image src={`artworks/${uniquePath}/${thumbnail.id}`}
                   alt={'thumbnail'}
                   height={300}
                   width={300}
                   priority={true}
                   className="h-full w-full object-cover object-center"/>)
        }
      </div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button
            disabled={thumbnail?.status !== 'loaded' || !thumbnail?.file}
            className={cn("inline-flex items-center justify-center font-medium leading-none bg-grad-1 text-t-main-2 h-[35px] rounded-md px-3 hover:bg-grad-2 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none", {
              'bg-t-main/30 hover:bg-t-main/30 text-t-main-2': thumbnail?.status !== 'loaded' || !thumbnail?.file,
            })}>
            Crop image
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            className="z-40 bg-t-main-2/90 data-[state=open]:animate-overlayShow fixed inset-0"/>
          <Dialog.Content
            className="z-50 h-[90vh]  data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-[85vw] translate-x-[-50%] translate-y-[-50%] rounded-md bg-t-main-2 border-t-main border-2 p-6 focus:outline-none">
            <Dialog.Title className="text-xl font-medium">
              Crop thumbnail
            </Dialog.Title>
            <CropImage uniquePath={uniquePath} setThumbnail={setThumbnail}
                       thumbnail={thumbnail}
                       setOpen={setOpen}/>
            <Dialog.Close asChild>
              <button
                className="absolute top-2 right-2 inline-flex appearance-none items-center justify-center rounded-full text-violet11 h-[25px] w-[25px] hover:bg-violet4 focus:shadow-violet7 focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close">
                X
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <button
        disabled={thumbnail?.status === 'loading'}
        className={cn("border-dotted transition-all duration-300 text-t-hover-1 border-t-main border-2 p-0.5 rounded-md hover:border-t-hover-2 hover:text-t-hover-2", {
          'disabled:hover:text-t-main disabled:hover:border-t-main disabled text-t-main': thumbnail?.status === 'loading',
        })}
        onClick={clickHandler}>
        Upload thumbnail
      </button>
      <input
        className="hidden" type="file"
        onChange={imagesChangeHandler}
        ref={inputFile}
        accept="image/,.png,.jpg,.jpeg"/>
    </div>
  );
};