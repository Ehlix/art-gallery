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
import {useIsMount} from "@/hooks/useIsMount";
import {useRouter} from "next/navigation";

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
  const router = useRouter()
  const isMount = useIsMount();
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
    if (isMount) return;
    setValue('title', title, {shouldValidate: true});
    setValue('medium', chosenCategories.medium, {shouldValidate: true});
    setValue('subject', chosenCategories.subject, {shouldValidate: true});
    setValue('description', description, {shouldValidate: true});
    setValue('image', selectedFiles, {shouldValidate: true});
    setValue('thumbnail', thumbnail || undefined, {shouldValidate: true});
  }, [chosenCategories, description, selectedFiles, setValue, title]);


  const newTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value.trimStart());
  };
  const newDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value.trimStart());
  };

  const onSubmit = async (payload: NewProjectType) => {
    moveHandler().then(async () => {
      const {data:user} = await supabase.auth.getUser();
      const {error} = await supabase.from('artworks').insert({
        user_id: user.user?.id,
        title: payload.title,
        description: payload.description,
        medium: payload.medium,
        subject: payload.subject,
        folder: uniquePath,
        thumbnail: payload.thumbnail?.file.name,
        files: payload.image?.map((v) => v.file.name),
      });
      if (!error) {
        const userLink = user.user?.user_metadata.site
        router.push(`/${userLink}`)
      }
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
    <div className="flex justify-center pt-7">
      <div className="flex flex-col gap-12 text-lg w-[90vw] xl:w-[95%]">
        <div className="flex items-center justify-start">
          <button
            onClick={handleSubmit(onSubmit)}
            className="mt-2 flex items-center justify-center rounded-md font-medium leading-none transition-all duration-300 bg-t-hover-2 w-[150px] text-t-main-2 h-[40px] hover:bg-t-hover-3 disabled:bg-t-main disabled:text-t-hover-1">
            Save project
          </button>
        </div>

        <div className="flex gap-6 sm:flex-col">
          <div className="shrink grow">
            <h2
              className="text-4xl h-[60px] text-t-hover-1">{title || '-- Project name --'}</h2>
            <div className="flex flex-col gap-2">
              Enter your project name
              <input
                type="text"
                placeholder="your title"
                onChange={newTitle}
                value={title.trimStart()}/>
              <span className="text-t-error">{errors?.title?.message}</span>
              <div className="flex flex-col gap-2">
                Enter project description
                <textarea
                  placeholder="your description"
                  onChange={newDescription}
                  value={description.trimStart()}/>
                <span className="text-t-error">
                  {errors.description?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center sm:flex-col sm:items-center">
            {(thumbnail?.status !== 'loading' && thumbnail?.status !== 'loaded' ) &&<span
              className="absolute top-1 left-2 text-t-error sm:relative sm:top-0 sm:left-0">
              {errors.thumbnail?.message}
            </span>}
            <Thumbnail thumbnail={thumbnail}
                       setThumbnail={setThumbnail}
                       uniquePath={uniquePath}/>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-t-error">
            {errors.image?.message}
          </span>
          <ImageUploadZone uniquePath={uniquePath}
                           selectedFiles={selectedFiles}
                           setSelectedFiles={setSelectedFiles}/>
        </div>
        <Categories chosenCategories={chosenCategories}
                    setChosenCategories={setChosenCategories} errors={errors}/>
      </div>
    </div>
  );
}