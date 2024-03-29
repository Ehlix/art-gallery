import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Env from "@/lib/env";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import {RiLoader3Line} from "react-icons/ri";
import {RemoveConfirmation} from "@/components/removeConfirmation";
import {SelectedFileType} from "@/components/newProject/newProjectMain";
import {cn} from "@/utils/twMergeClsx";
import {v4} from "uuid";
import {bytesToMb} from "@/utils/bytesToMb";
import {renameFile} from "@/utils/renameFile";
import {sortSelectedFiles} from "@/utils/sortSelectedFiles";

type Props = {
  selectedFiles: SelectedFileType[]
  setSelectedFiles: React.Dispatch<React.SetStateAction<SelectedFileType[]>>
  uniquePath: string
};


export const ImageUploadZone = ({uniquePath, selectedFiles, setSelectedFiles}: Props) => {
  const inputFile = useRef(null);

  const supabase = createClientComponentClient();
  const [currentTarget, setCurrentTarget] = useState<SelectedFileType>({} as SelectedFileType);

  const imagesChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] | null = e.target.files && Array.from(e.target.files);
    const newFiles: SelectedFileType[] = [...selectedFiles];
    if (files) {
      for (const file of files) {
        if (bytesToMb(file.size) > 15) {
          console.log('file >15 mb deleted');
          return;
        }
        const uniqueName = v4();
        const newFile = renameFile(file, uniqueName);
        newFiles.push({
          id: newFile.name,
          order: newFiles.length > 0 ? (newFiles[newFiles.length - 1].order + 1) : 0,
          file: newFile,
          status: 'notLoaded'
        });
      }
    }
    setSelectedFiles([...newFiles]);
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      console.log('start: ', selectedFiles);
      selectedFiles.map(async (target) => {
        if (target.status === 'notLoaded' && target?.file) {
          target.status = 'loading';
          const {data, error} = await supabase
            .storage
            .from(`${Env.PROJECTS_BUCKET}/cache`)
            .upload(`${uniquePath}/${target.file.name}`, target.file, {
              cacheControl: '3600',
              upsert: false
            });
          if (data) {
            console.log(data);
            target.status = 'loaded';
            setSelectedFiles([...selectedFiles]);
          }
          if (error) {
            console.log(error);
            target.status = 'error';
            setSelectedFiles([...selectedFiles]);
          }
        }
      });
      console.log('end: ', selectedFiles);
    }

  }, [selectedFiles]);

  function clickHandler() {
    // @ts-ignore
    inputFile.current.click();
  }

  // function pushFileToServer(newFiles: SelectedFileType[]) {
  //   setSelectedFiles([...newFiles]);
  //   console.log('start: ', selectedFiles);
  //   newFiles.map(async (target) => {
  //     if (!target.isLoaded) {
  //       const {
  //         data,
  //         error
  //       } = await supabase.storage.from(Env.PROJECTS_BUCKET + '/cache').upload(uniquePath + '/' + target.file.name, target.file);
  //       if (data) {
  //         console.log(data);
  //         target.isLoaded = true;
  //         setSelectedFiles([...newFiles]);
  //       }
  //       if (error) {
  //         console.log(error);
  //         target.isLoaded = 'error';
  //         setSelectedFiles([...newFiles]);
  //       }
  //     }
  //     console.log('end: ', selectedFiles);
  //   });
  // }


  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, target: SelectedFileType) => {
    setCurrentTarget(target);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.border = '3px solid ' + '#888888';

  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.border = '3px dashed ' + '#cc67ff';
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, target: SelectedFileType) => {
    e.preventDefault();
    setSelectedFiles(selectedFiles.map(t => {
      if (t.id === target.id) {
        return {...t, order: currentTarget.order};
      }
      if (t.id === currentTarget?.id) {
        return {...t, order: target.order};
      }
      return t;
    }));
    e.currentTarget.style.border = '3px solid ' + '#888888';
  };


  // async function removeSelectedFile(e: React.MouseEvent<HTMLButtonElement>, target: SelectedFileType) {
  //   if (confirm('Delete his file?')) {
  //     const {
  //       data,
  //       error
  //     } = await supabase.storage.from(`${Env.PROJECTS_BUCKET}`).remove([`cache/${uniquePath}/${target.id}.png`]);
  //     if (data) {
  //       console.log(data);
  //       // const newFiles = selectedFiles.filter((t)=> t.id !== target.id)
  //       // setSelectedFiles(newFiles)
  //     }
  //     error && console.log(error);
  //   }
  // }

  return (
    <>
      <button
        className="rounded-md border-2 border-dotted transition-all duration-300 text-t-hover-1 border-t-main h-[50px] hover:border-t-hover-2 hover:text-t-hover-2"
        onClick={clickHandler}>Chose image
        to upload
      </button>
      <input
        className="hidden" type="file"
        onChange={imagesChangeHandler}
        ref={inputFile}
        accept="image/,.png,.jpg,.jpeg"
        multiple/>

      <div>
        <div
          className="grid grid-cols-5 gap-[1vw] sm:gap-[3.3vw] sm:grid-cols-1 md:grid-cols-2 lg:gap-[2vw] lg:grid-cols-3 xl:grid-cols-4">
          {selectedFiles.sort(sortSelectedFiles).map((target) => {
            async function confirmRemoveHandler() {
              console.log("confirm!!!");
              if (target.file) {
                const {
                  data,
                  error
                } = await supabase.storage.from(Env.PROJECTS_BUCKET).remove([`cache/${uniquePath}/${target.id}`]);
                if (data) {
                  console.log(data);
                }
                error && console.log(error);
              }
              const newFiles = selectedFiles.filter((t) => t.id !== target.id);
              setSelectedFiles(newFiles);
            }

            const isFullLoad = selectedFiles.every((v) => v.status === 'loaded');
            return (
              <div key={target.id}
                   draggable={isFullLoad}
                   className={cn("relative flex cursor-move select-none flex-col items-center justify-center overflow-hidden border-t-main border-4 aspect-[1/1] rounded-md bg-t-main/20 h-full w-full", {
                     'cursor-default': !isFullLoad
                   })}
                   onDragStart={e => dragStartHandler(e, target)}
                   onDragEnd={e => dragEndHandler(e)}
                   onDragOver={e => dragOverHandler(e)}
                   onDragLeave={e => dragEndHandler(e)}
                   onDrop={e => dropHandler(e, target)}
              >
                {
                  (target.status === 'loaded')
                    ?
                    (target.file
                        ?
                        <Image
                          className="pointer-events-none h-full w-full object-contain"
                          src={`cache/${uniquePath}/${target.id}`} alt="jop"
                          width={100}
                          height={100} quality={100}/>
                        :
                        <Image
                          className="pointer-events-none h-full w-full object-contain"
                          src={`artworks/${uniquePath}/${target.id}`} alt="jop"
                          width={100}
                          height={100} quality={100}/>
                    )
                    :
                    <div
                      className="pointer-events-none flex h-full w-full items-center justify-center rounded-sm bg-t-main-2">
                    <span className="animate-spin text-5xl text-t-main">
                      <RiLoader3Line/>
                    </span>
                    </div>
                }
                <div
                  className="pointer-events-none absolute top-0 left-0 h-full w-full shadow-black/40 shadow-[inset_-10px_100px_30px_-70px]"></div>
                {
                  isFullLoad &&
                  <RemoveConfirmation
                    className="absolute top-0 right-0 m-2 text-2xl text-t-error"
                    callback={confirmRemoveHandler}/>
                }
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};