'use client';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {ImageUploadZone} from "@/components/newProject/imageUploadZone";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {newProjectSchema, NewProjectType} from "@/validations/newProjectSchema";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Categories} from "@/components/newProject/categories";
import Env from "@/dictionaries/env";
import {Thumbnail} from "@/components/newProject/thumbnail";
import {v4} from 'uuid';

export type Thumbnail = {
  id: string
  status: 'notLoaded' | 'loading' | 'loaded' | 'error'
  file: File
}

export type ChosenCategories = {
  medium: string[]
  subject: string[]
}
export type SelectedFileType = {
  id: string
  order: number
  file: File,
  status: 'notLoaded' | 'loading' | 'loaded' | 'error'
}
const uniquePath = v4();

export function ProjectMain() {
  const [thumbnail, setThumbnail] = useState<Thumbnail | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileType[]>([]);
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
    setValue('thumbnail', thumbnail || undefined);
  }, [chosenCategories, description, selectedFiles, setValue, title]);


  const newTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value.trimStart());
  };
  const newDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value.trimStart());
  };

  const onSubmit = async (payload: NewProjectType) => {
    moveHandler().then(async () => {
      const user = await supabase.auth.getUser();
      const {} = await supabase.from('artworks').insert({
        user_id: user.data.user?.id,
        title: payload.title,
        description: payload.description,
        medium: payload.medium,
        subject: payload.subject,
        folder: uniquePath,
        thumbnail: payload.thumbnail?.file.name,
        files: payload.image?.map((v) => v.file.name),
      });
    });


  };


  async function moveHandler() {
    if (selectedFiles && thumbnail) {
      selectedFiles.map(async (file) => {
        const {data, error} = await supabase
          .storage
          .from(Env.PROJECTS_BUCKET)
          .copy(`cache/${uniquePath}/${file.id}`, `artworks/${uniquePath}/${file.id}`);
        data && console.log('pic moved', data);
        error && console.log(error);
      });
      const {
        data,
        error
      } = await supabase.storage.from(Env.PROJECTS_BUCKET).copy(`cache/${uniquePath}/${thumbnail.file.name}`, `artworks/${uniquePath}/${thumbnail.file.name}`);
      data && console.log('thumb moved', data);
      error && console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col text-[18px] w-[90vw] gap-[50px] xl:w-[95%]">
        <button onClick={() => console.log(uniquePath)}>path</button>
        <button onClick={moveHandler}>move</button>
        <button onClick={() => console.log(selectedFiles)}>files</button>
        <button onClick={() => console.log(thumbnail)}>thumb</button>
        <div className="flex gap-[25px]">
          <div className="shrink grow">
            <h2
              className="h-[60px] text-[33px] text-t-hover-1">{title || '-- Project name --'}</h2>
            <div className="flex flex-col gap-[10px]">
              Enter your project name
              <input
                type="text"
                {...register('title')}
                placeholder="your title"
                onChange={newTitle}
                value={title.trimStart()}/>
              <span className="text-t-error">{errors?.title?.message}</span>
              <div className="flex flex-col gap-[10px]">
                Enter project description
                <textarea
                  placeholder="your description"
                  {...register('description')}
                  onChange={newDescription}
                  value={description.trimStart()}/>
                <span className="text-t-error">
                  {errors.description?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <span
              className="absolute top-[10px] left-[10px] text-t-error">
              {errors.thumbnail?.message}
            </span>
            <Thumbnail thumbnail={thumbnail}
                       setThumbnail={setThumbnail}
                       uniquePath={uniquePath}/>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="text-t-error">
            {errors.image?.message}
          </span>
          <ImageUploadZone uniquePath={uniquePath}
                           selectedFiles={selectedFiles}
                           setSelectedFiles={setSelectedFiles}/>
        </div>
        <Categories chosenCategories={chosenCategories}
                    setChosenCategories={setChosenCategories} errors={errors}/>
        <button onClick={handleSubmit(onSubmit)}>
          submit
        </button>
      </div>
    </>
  );
}