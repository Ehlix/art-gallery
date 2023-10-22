'use client';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {ImageUploadZone, SelectedFileType} from "@/components/newProject/imageUploadZone";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {newProjectSchema, NewProjectType} from "@/validations/newProjectSchema";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {generateRandomNum} from "@/utils/utils";
import {Categories} from "@/components/newProject/categories";

type Props = {};


export type ChosenCategories = {
  medium: string[]
  subject: string[]
}
const uniquePath = Date.now() + '_' + generateRandomNum();
export default function Page(props: Props) {
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

    // const user =  await supabase.auth.getUser()
    // const uniquePath = Date.now() + '_' + generateRandomNum()
    // const {} = await supabase.storage.from(Env.PROJECTS_BUCKET).upload(uniquePath, image)

  };


  return (
    <section className="container flex justify-center pt-[30px]">
      <div className="flex flex-col text-[18px] w-[85vw] gap-[50px] xl:w-[95%]"
      >
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

        <ImageUploadZone uniquePath={uniquePath} register={register('image')}
                         setImage={(files: SelectedFileType[]) => setImage(files)}/>


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
    </section>
  );
};