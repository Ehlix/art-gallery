import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {generateRandomNum, renameFile, sortSelectedFiles} from "@/utils/utils";
import Env from "@/config/env";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import {RiLoader3Line} from "react-icons/ri";
import RemoveConfirmation from "@/components/removeConfirmation";

type Props = {
  setImage: (file: SelectedFileType[]) => void
  register: any
  uniquePath: string
};

export type SelectedFileType = {
  id: string
  order: number
  file: File,
  isLoaded: boolean | 'error'
}


export function ImageUploadZone({uniquePath, setImage, register}: Props) {
  const inputFile = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileType[]>([]);
  const supabase = createClientComponentClient();
  const [currentTarget, setCurrentTarget] = useState<SelectedFileType>({} as SelectedFileType);

  const imagesChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] | null = e.target.files && Array.from(e.target.files);
    const newFiles: SelectedFileType[] = [...selectedFiles];
    if (files) {
      for (const file of files) {
        const uniqueName = Date.now() + '_' + generateRandomNum();
        const newFile = renameFile(file, uniqueName);
        newFiles.push({
          id: newFile.name,
          order: newFiles.length > 0 ? (newFiles[newFiles.length - 1].order + 1) : 0,
          file: newFile,
          isLoaded: false
        });
      }
    }
    setSelectedFiles([...newFiles]);
    console.log('start: ', newFiles);
    newFiles.map(async (target) => {
      if (!target.isLoaded) {
        const {
          data,
          error
        } = await supabase.storage.from(`${Env.PROJECTS_BUCKET}/cache`).upload(`${uniquePath}/${target.file.name}`, target.file);
        if (data) {
          console.log(data);
          target.isLoaded = true;
          setSelectedFiles([...newFiles]);
        }
        if (error) {
          console.log(error);
          target.isLoaded = 'error';
          setSelectedFiles([...newFiles]);
        }
      }
      console.log('end: ', newFiles);
    });
  };

  useEffect(() => {
    setImage(selectedFiles);

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


  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, target: SelectedFileType) {
    setCurrentTarget(target);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.style.border = '3px solid ' + '#888888';

  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.currentTarget.style.border = '3px dashed ' + '#cc67ff';
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, target: SelectedFileType) {
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
  }


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
      <div className="border-dotted border-t-main border-[3px]">
        <button onClick={clickHandler}>Chose image
          to upload
        </button>
        <input
          className="hidden" type="file"
          onChange={imagesChangeHandler}
          ref={inputFile}
          accept="image/,.png,.jpg,.jpeg"
          multiple
        />
      </div>

      <div className="flex flex-wrap gap-[10px]">
        {
          selectedFiles && selectedFiles.sort(sortSelectedFiles).map((target, i) => {
            return (
              <div key={i} className="bg-t-main text-t-main-2">
                <div>{target.file.name}</div>
                <div>{target.id}</div>
                <div>{target.order}</div>
              </div>
            );
          })
        }
      </div>

      <div>

        <div
          className="grid grid-cols-3 gap-[1vw] sm:gap-[3.3vw] sm:grid-cols-1 md:grid-cols-2 lg:gap-[2vw] lg:grid-cols-2 xl:grid-cols-3"
        >
          {selectedFiles.sort(sortSelectedFiles).map((target) => {
            async function confirmHandler(status: boolean) {
              if (true) {
                console.log("confirm!!!");
                const {
                  data,
                  error
                } = await supabase.storage.from(Env.PROJECTS_BUCKET).remove([`cache/${uniquePath}/${target.id}`]);
                if (data) {
                  console.log(data);
                  const newFiles = selectedFiles.filter((t) => t.id !== target.id);
                  setSelectedFiles(newFiles);
                }
                error && console.log(error);
              }
            }

            return (
              <div key={target.id}
                   draggable
                   className="relative flex cursor-move select-none flex-col items-center justify-end overflow-hidden border-t-main border-[4px] aspect-[1/1] rounded-[5px] bg-t-main/20 h-[100%] w-[100%]"
                   onDragStart={e => dragStartHandler(e, target)}
                   onDragEnd={e => dragEndHandler(e)}
                   onDragOver={e => dragOverHandler(e)}
                   onDragLeave={e => dragEndHandler(e)}
                   onDrop={e => dropHandler(e, target)}
              >
                {target.isLoaded === true ?
                  <Image
                    // className="pointer-events-none object-cover object-center w-[100%] h-[100%]"
                    className="pointer-events-none w-fit h-[100%]"
                    src={`cache/${uniquePath}/${target.file.name}`} alt="jop"
                    width={100}
                    height={100} quality={100}/> :
                  <div
                    className="pointer-events-none flex items-center justify-center rounded-[1.5px] bg-t-main-2 w-[100%] h-[100%]">
                    <span
                      className="animate-spin text-t-main text-[50px]"><RiLoader3Line/></span>
                  </div>
                }
                <div
                  className="pointer-events-none absolute top-0 left-0 shadow-black/40 shadow-[inset_-10px_100px_30px_-70px] w-[100%] h-[100%]"></div>
                <RemoveConfirmation
                  className="absolute top-0 right-0 m-[7px] text-t-error text-[22px]"
                  callback={confirmHandler}/>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
};