import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {generateRandomNum} from "@/utils/utils";
import Env from "@/config/env";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

type Props = {
  setImage: (file: File[]) => void
  register: any
};
const aaa = [1, 1, 1,];

export function ImageUploadZone({setImage, register}: Props) {
  const uniquePath = Date.now() + '_' + generateRandomNum();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [uploaded, setUploaded] = useState();
  const supabase = createClientComponentClient();

  const imagesChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File[] | null = e.target.files && Array.from(e.target.files);
    if (file) {
      setSelectedFile([...selectedFile, ...file]);

    }
    // const {user} =  await supabase.auth.getUser()
    // const uniquePath = Date.now() + '_' + generateRandomNum()
    // const {data,error} = await supabase.storage.from(Env.PROJECTS_BUCKET).upload(uniquePath, selectedFile[0])
    // if (data) console.log(data)
    // if (error) console.log(error)

  };
  useEffect(() => {
    setImage(selectedFile);

  }, [selectedFile]);

  function clickHandler() {
    // @ts-ignore
    inputFile.current.click();
  }

  async function qqqq() {
    const uniqueName = Date.now() + '_' + generateRandomNum();
    const {
      data,
      error
    } = await supabase.storage.from(Env.PROJECTS_BUCKET + '/cache').upload(uniquePath + '/' + uniqueName, selectedFile[0], {
      contentType: 'image/png'
    });
    if (data) console.log(data);
    if (error) console.log(error);
  }

  return (
    <>
      <button onClick={qqqq}>UPLOAD</button>
      <div className="border-dotted border-t-main border-[3px]">
        <button onClick={clickHandler}>Chose image
          to upload
        </button>
        <input

          className="hidden" type="file"
          onChange={imagesChangeHandler}
          ref={inputFile}
          accept="image/,.png,.jpg"
          multiple
        />
      </div>

      <div className="flex flex-col gap-[20px]">
        {
          selectedFile && selectedFile.map((v, i) => {
            return (
              <div key={i} className="bg-t-main text-t-main-2">
                <div>{v.name}</div>
                <div>{v.type}</div>
                <div>{v.size}</div>
                <div>lasmod: {' '} {v.lastModified}</div>
              </div>
            );
          })
        }
      </div>

      <div className="flex flex-col gap-[10px]">
        PREVIEW ZONE
        <div
          className="grid grid-cols-3 gap-[1vw] sm:gap-[3.3vw] sm:grid-cols-1 md:grid-cols-2 lg:gap-[2vw] lg:grid-cols-2 xl:grid-cols-3">
          {
            aaa.map((a, i) => {
              return (
                <div
                  key={i}
                  className="relative flex cursor-pointer flex-col justify-end overflow-hidden aspect-[1/1] rounded-[3px] w-[100%] h-[100%] bg-t-main">
                </div>
              );
            })
          }
        </div>
      </div>


    </>
  );
};