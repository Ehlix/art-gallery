'use client';
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {Thumbnail} from "@/components/newProject/projectMain";
import {cn} from "@/utils/twMergeClsx";
import CropImage from "@/components/cropImage";
import Image from "next/image";
import {bytesToMb, renameFile} from "@/utils/utils";
import {v4} from "uuid";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Env from "@/dictionaries/env";

type Props = {
  thumbnail: Thumbnail | null
  setThumbnail: React.Dispatch<React.SetStateAction<Thumbnail | null>>
  uniquePath: string
};

export function Thumbnail({setThumbnail, thumbnail, uniquePath}: Props) {
  const inputFile = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const supabase = createClientComponentClient();

  function clickHandler() {
// @ts-ignore
    inputFile.current.click();
  }

  async function imagesChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file: File | null = e.target.files && e.target.files[0];
    if (file) {
      if (bytesToMb(file.size) > 15) {
        console.log('file >15 mb deleted');
        return;
      }
      if (thumbnail) {
        const {
          data,
          error
        } = await supabase.storage.from(Env.PROJECTS_BUCKET).remove([`cache/${uniquePath}/${thumbnail.file.name}`]);
        if (data) {
          const thumb: Thumbnail = {
            id: v4(),
            file: renameFile(file, `thumbnail_${v4()}`),
            status: "notLoaded"
          };
          setThumbnail(thumb);
        }
        if (error) {
          console.log(error);
        }
        return;
  }
      const thumb: Thumbnail = {
        id: v4(),
        file: renameFile(file, `thumbnail_${v4()}`),
        status: "notLoaded"
      };
      setThumbnail(thumb);
    }
  }

  useEffect(() => {
    if (thumbnail?.status === 'notLoaded') {
      (async () => {
        thumbnail.status = 'loading';
        console.log('thumb upload start..');
        const {
          data,
          error
        } = await supabase.storage.from(`${Env.PROJECTS_BUCKET}/cache`).upload(`${uniquePath}/${thumbnail.file.name}`, thumbnail.file,{
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
      })();
    }
  }, [thumbnail]);

  return (
    <div className="flex w-fit flex-col gap-[10px]">
      <div className="border-t-main border-[2px] rounded-[4px] h-[300px] w-[300px] md:h-[200px] md:w-[200px]">
        {thumbnail?.status === 'loaded' &&
          <Image src={`cache/${uniquePath}/${thumbnail.file.name}`}
                 alt={'thumbnail'}
                 height={300}
                 width={300}/>
        }
      </div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button
            disabled={thumbnail?.status !== 'loaded'}
            className={cn("inline-flex items-center justify-center font-medium leading-none bg-grad-1 text-t-main-2 h-[35px] rounded-[4px] px-[15px] hover:bg-grad-2 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none", {
              'bg-t-main/30': thumbnail?.status !== 'loaded',
              'hover:bg-t-main/30': thumbnail?.status !== 'loaded',
              'text-t-main-2': thumbnail?.status !== 'loaded',
            })}>
            Crop image
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            className="z-40 bg-t-main-2/90 data-[state=open]:animate-overlayShow fixed inset-0"/>
          <Dialog.Content
            className="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-fit w-[85vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-t-main-2 border-t-main border-[2px] p-[25px] focus:outline-none">
            <Dialog.Title className="m-0 font-medium text-mauve12 text-[17px]">
              Crop thumbnail
            </Dialog.Title>
            <CropImage uniquePath={uniquePath} setThumbnail={setThumbnail}
                       thumbnail={thumbnail}
                       setOpen={setOpen}/>
            <Dialog.Close asChild>
              <button
                className="absolute inline-flex appearance-none items-center justify-center rounded-full text-violet11 top-[10px] right-[10px] h-[25px] w-[25px] hover:bg-violet4 focus:shadow-violet7 focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                X
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <button className="border-dotted transition-all duration-300 text-t-hover-1 border-t-main border-[3px] p-[2px] rounded-[5px] hover:border-t-hover-2 hover:text-t-hover-2" onClick={clickHandler}>
        Upload thumbnail
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