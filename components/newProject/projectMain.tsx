'use client';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {ImageUploadZone} from "@/components/newProject/imageUploadZone";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {newProjectSchema, NewProjectType} from "@/validations/newProjectSchema";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Categories} from "@/components/newProject/categories";
import Env from "@/config/env";
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
    console.log('123');
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

  // useEffect(() => {
  //   console.log('use effect thumb');
  //
  //   async function upload(target: SelectedFileType) {
  //     if (thumbnail) {
  //       return;
  //     }
  //     const {
  //       data,
  //       error
  //     } = await supabase.storage.from(`${Env.PROJECTS_BUCKET}/cache`).upload(`${uniquePath}/${target.file.name}`, target.file);
  //     if (data) {
  //       target.status = 'loaded';
  //       setThumbnail(target);
  //       console.log('thumb set');
  //     }
  //     if (error) {
  //       console.log(error);
  //     }
  //   }
  //
  //   async function replace(target: SelectedFileType) {
  //
  //     console.log('thumb replacing...');
  //     const {
  //       data,
  //       error
  //     } = await supabase.storage.from(Env.PROJECTS_BUCKET).update(`cache/${uniquePath}/${target.file.name}`, target.file);
  //     if (data) {
  //       target.status = 'loaded';
  //       setThumbnail(target);
  //       console.log('thumb replace');
  //     }
  //     if (error) {
  //       console.log(error);
  //     }
  //
  //
  //   }
  //
  //   async function remove() {
  //     console.log('thumb removing...');
  //
  //     const {
  //       data,
  //       error
  //     } = await supabase.storage.from(Env.PROJECTS_BUCKET).remove([`cache/${uniquePath}/thumbnail`]);
  //     if (data) {
  //       setThumbnail(null);
  //       console.log('thumb: null');
  //     }
  //     if (error) {
  //       console.log(error);
  //     }
  //   }
  //
  //   if (selectedFiles[0]?.status === 'loaded' && thumbnail === null) {
  //     const newFile = renameFile(selectedFiles[0].file, 'thumbnail');
  //     const thumb: SelectedFileType = {...selectedFiles[0], file: newFile, status: 'notLoaded'};
  //     setThumbnail(thumb);
  //     upload(thumb).then();
  //   }
  //   if (selectedFiles[0]?.status === 'loaded' && thumbnail && selectedFiles[0].id !== thumbnail.id && thumbnail.status === 'loaded') {
  //     const newFile = renameFile(selectedFiles[0].file, 'thumbnail');
  //     const thumb: SelectedFileType = {...selectedFiles[0], file: newFile, status: 'notLoaded'};
  //     setThumbnail(thumb);
  //     replace(thumb).then();
  //   }
  //   if (!selectedFiles[0] && thumbnail) {
  //     remove().then();
  //   }
  // }, [selectedFiles]);

  return (
    <>
      <div className="flex flex-col text-[18px] w-[90vw] gap-[50px] xl:w-[95%]"
      >
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
                className="flex w-full appearance-none items-center justify-center leading-none outline-none bg-t-main-2 shadow-t-main h-[35px] rounded-[4px] px-[10px] text-[15px] text-t-hover-1 shadow-[0_0_0_1.5px] placeholder:text-t-main/40 hover:shadow-t-hover-1 focus:shadow-t-hover-2"
                type="text"
                {...register('title')}
                placeholder="your title"
                onChange={newTitle}
                value={title.trimStart()}
              />
              <span className="text-t-error">{errors?.title?.message}</span>
              <div className="flex flex-col gap-[10px]">
                Enter project description
                <textarea
                  className="w-full appearance-none leading-none outline-none bg-t-main-2 shadow-t-main min-h-[105px] max-h-[400px] rounded-[4px] p-[10px] text-[15px] text-t-hover-1 shadow-[0_0_0_1.5px] placeholder:text-t-main/40 hover:shadow-t-hover-1 focus:shadow-t-hover-2 md:min-h-[100px]"
                  placeholder="your description"
                  {...register('description')}
                  onChange={newDescription}
                  value={description.trimStart()}
                />
                <span className="text-t-error">{errors.description?.message}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <span
              className="absolute top-[10px] left-[10px] text-t-error">{errors.thumbnail?.message}</span>
            <Thumbnail thumbnail={thumbnail}
                       setThumbnail={setThumbnail}
                       uniquePath={uniquePath}/>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="text-t-error">{errors.image?.message}</span>

          <ImageUploadZone uniquePath={uniquePath}
                           selectedFiles={selectedFiles}
                           setSelectedFiles={setSelectedFiles}/>
        </div>


        <Categories chosenCategories={chosenCategories}
                    setChosenCategories={setChosenCategories} errors={errors}/>

        <button onClick={handleSubmit(onSubmit)}>submit</button>
      </div>
    </>
  );
}