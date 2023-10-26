'use client';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {ImageUploadZone} from "@/components/newProject/imageUploadZone";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {newProjectSchema, NewProjectType} from "@/validations/newProjectSchema";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {generateRandomNum, renameFile} from "@/utils/utils";
import {Categories} from "@/components/newProject/categories";
import Env from "@/config/env";
import {Thumbnail} from "@/components/newProject/thumbnail";
import Image from "next/image";

type Props = {};

export type ChosenCategories = {
  medium: string[]
  subject: string[]
}
export type SelectedFileType = {
  id: string
  order: number
  file: File,
  isLoaded: boolean | 'error'
}
const uniquePath = Date.now() + '_' + generateRandomNum();

export function NewProject(props: Props) {
  const [thumbnail, setThumbnail] = useState<SelectedFileType | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileType[]>([]);
  const [isLogin, setLogin] = useState<boolean>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [chosenCategories, setChosenCategories] = useState<ChosenCategories>({
    medium: [],
    subject: []
  });
  const supabase = createClientComponentClient();

  // * Validation project
  const {
    register, handleSubmit, formState: {errors},
    setValue
  } = useForm<NewProjectType>({
    resolver: yupResolver(newProjectSchema)
  });

  useEffect(() => {
    setValue('title', title);
    setValue('medium', chosenCategories.medium);
    setValue('subject', chosenCategories.subject);
    setValue('description', description);
    setValue('image', selectedFiles);
  }, [chosenCategories, description, title]);

  const setImage = (selectedFiles: SelectedFileType[]) => {
    setValue('image', selectedFiles);
    console.log(selectedFiles);

  };

  const newTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value.trimStart());
  };
  const newDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value.trimStart());
  };

  const onSubmit = async (payload: NewProjectType) => {
    console.log('123');

    const user = await supabase.auth.getUser();
    // const uniquePath = Date.now() + '_' + generateRandomNum()
    // const {} = await supabase.storage.from(Env.PROJECTS_BUCKET).upload(uniquePath, image)

  };


  async function moveHandler() {
    if (selectedFiles) {
      selectedFiles.map(async (file) => {
        const {data, error} = await supabase
          .storage
          .from(Env.PROJECTS_BUCKET)
          .copy(`cache/${uniquePath}/${file.id}`, `artworks/${uniquePath}/${file.id}`);
        data && console.log(data);
        error && console.log(error);
      });
    }

  }

  useEffect(() => {
    async function upload(target: SelectedFileType) {
      console.log('thumb uploading...');
      const {
        data,
        error
      } = await supabase.storage.from(`${Env.PROJECTS_BUCKET}/cache`).upload(`${uniquePath}/${target.file.name}`, target.file);
      if (data) {
        setThumbnail(target);
        console.log('thumb set');
      }
      if (error) {
        console.log(error);
      }
    }

    async function replace(target: SelectedFileType) {
      console.log('thumb replacing...');

      const {
        data,
        error
      } = await supabase.storage.from(Env.PROJECTS_BUCKET).update(`cache/${uniquePath}/${target.file.name}`, target.file);
      if (data) {
        setThumbnail(target);
        console.log('thumb replace');
      }
      if (error) {
        console.log(error);
      }
    }

    async function remove() {
      console.log('thumb removing...');

      const {
        data,
        error
      } = await supabase.storage.from(Env.PROJECTS_BUCKET).remove([`cache/${uniquePath}/thumbnail`]);
      if (data) {
        setThumbnail(null);
        console.log('thumb: null');
      }
      if (error) {
        console.log(error);
      }
    }

    if (selectedFiles[0]?.isLoaded && !thumbnail) {
      const newFile = renameFile(selectedFiles[0].file, 'thumbnail');
      const thumb = {...selectedFiles[0], file: newFile, isLoaded: false};
      upload(thumb).then();
    }
    if (selectedFiles[0]?.isLoaded && thumbnail && selectedFiles[0].id !== thumbnail.id) {
      const newFile = renameFile(selectedFiles[0].file, 'thumbnail');
      const thumb = {...selectedFiles[0], file: newFile, isLoaded: false};
      replace(thumb).then();
    }
    if (!selectedFiles[0] && thumbnail) {
      remove().then();
    }
  }, [selectedFiles]);

  return (
    <>
      <div className="flex flex-col text-[18px] w-[85vw] gap-[50px] xl:w-[95%]"
      >
        <button onClick={() => console.log(uniquePath)}>path</button>
        <button onClick={moveHandler}>move</button>
        <button onClick={() => console.log(selectedFiles)}>files</button>
        <div>
          {thumbnail &&
            <div>
              <Image src={`cache/${uniquePath}/${thumbnail.file.name}`} alt={'thumbnail'}
                     height={300}
                     width={300}/>
            </div>
          }
          <Thumbnail thumbnail={thumbnail} selectedFiles={selectedFiles}
                     setSelectedFiles={setSelectedFiles} uniquePath={uniquePath}/>
        </div>
        <div>
          <h2
            className="h-[60px] text-[33px] text-t-hover-1">{title || '-- Project name --'}</h2>
          <div className="flex flex-col gap-[10px]">
            Enter your project name
            <input
              className="flex w-full appearance-none items-center justify-center leading-none outline-none bg-t-main-2 shadow-t-main h-[35px] rounded-[4px] px-[10px] text-[15px] text-t-hover-1 shadow-[0_0_0_1.5px] placeholder:text-t-main/40 hover:shadow-t-hover-1 focus:shadow-t-hover-2"
              type="text"
              {...register('title')}
              placeholder="your title"
              onChange={newTitle}
              value={title.trimStart()}
            />
            <span className="text-t-error">{errors?.title?.message}</span>
          </div>
        </div>
        <span className="text-t-error">{errors.image?.message}</span>

        <ImageUploadZone uniquePath={uniquePath}
                         selectedFiles={selectedFiles}
                         setSelectedFiles={setSelectedFiles}/>


        <div className="flex flex-col gap-[10px]">
          Enter project description
          <textarea
            className="w-full appearance-none leading-none outline-none bg-t-main-2 shadow-t-main min-h-[100px] rounded-[4px] p-[10px] text-[15px] text-t-hover-1 shadow-[0_0_0_1.5px] placeholder:text-t-main/40 hover:shadow-t-hover-1 focus:shadow-t-hover-2"
            placeholder="your description"
            {...register('description')}
            onChange={newDescription}
            value={description.trimStart()}
          />
          <span className="text-t-error">{errors.description?.message}</span>
        </div>

        <Categories chosenCategories={chosenCategories}
                    setChosenCategories={setChosenCategories} errors={errors}/>

        <button onClick={handleSubmit(onSubmit)}>submit</button>
      </div>
    </>
  );
};