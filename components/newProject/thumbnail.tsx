'use client';
import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {SelectedFileType} from "@/components/newProject/newProject";
import {cn} from "@/utils/twMergeClsx";
import CropImage from "@/components/cropImage";


type Props = {
  thumbnail: SelectedFileType | null
  selectedFiles: SelectedFileType[]
  setSelectedFiles: React.Dispatch<React.SetStateAction<SelectedFileType[]>>
  uniquePath: string
};

export function Thumbnail({selectedFiles, setSelectedFiles, thumbnail}: Props) {
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            disabled={!thumbnail}
            className={cn("inline-flex items-center justify-center font-medium leading-none bg-grad-1 text-t-main-2 h-[35px] rounded-[4px] px-[15px] hover:bg-grad-2 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none", {
              'bg-t-main/30': !thumbnail,
              'hover:bg-t-main/30': !thumbnail,
              'text-t-main-2': !thumbnail,
            })}>
            Crop image
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            className="z-40 bg-t-main-2/90 data-[state=open]:animate-overlayShow fixed inset-0"/>
          <Dialog.Content
            className="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[85vh] w-[85vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-t-main-2 border-t-main border-[2px] p-[25px] focus:outline-none">
            <Dialog.Title className="m-0 font-medium text-mauve12 text-[17px]">
              Edit profile
            </Dialog.Title>
            <CropImage selectedFile={selectedFiles[0]}/>
            <div className="flex justify-end mt-[25px]">
              <Dialog.Close asChild>
                <button
                  className="inline-flex items-center justify-center font-medium leading-none bg-green4 text-green11 h-[35px] rounded-[4px] px-[15px] hover:bg-green5 focus:shadow-green7 focus:shadow-[0_0_0_2px] focus:outline-none">
                  Close
                </button>
              </Dialog.Close>
            </div>
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
    </div>
  );
}