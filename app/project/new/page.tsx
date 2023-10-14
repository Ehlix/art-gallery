'use client';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {ImageUploadZone} from "@/components/newProject/imageUploadZone";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {newProjectSchema, NewProjectType} from "@/validations/newProjectSchema";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

type Props = {};

const medium = ['digital 2d', 'digital 3d', 'animation', 'real-time', 'live action cg/vgx', 'rd printing', 'traditional ink', 'traditional dry media', 'traditional paint', 'traditional sculpture', 'mixed media',];

const subject = ['abstract',
  'anatomy',
  'animals & wildlife',
  'anime & manga',
  'architectural concepts',
  'architectural visualization',
  'automotive',
  'board & card game art',
  'book illustration',
  'character animation',
  'character design',
  'character modeling',
  "children's art",
  'comic art',
  'concept art',
  'cover art',
  'creatures',
  'editorial illustration',
  'environmental concept art & design',
  'fan art',
  'fantasy',
  'fashion & costume design',
  'game art',
  'gameplay & level design',
  'games and real-time 3d',
  'graphic design',
  'hard surface',
  'horror',
];

type ChosenCategories = {
  medium: string[]
  subject: string[]
}

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
    setValue('description', description);
  }, [chosenCategories, description, title]);

  const setImage = (file: File[]) => {
    setValue('image', file);
    console.log(file);

  };

  const newTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value.trimStart());
  };
  const newDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value.trimStart());
  };

  const onSubmit = async (payload: NewProjectType) => {

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

        <ImageUploadZone register={register('image')}
                         setImage={(file: File[]) => setImage(file)}/>


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

        <div className="flex flex-col gap-[10px]">
          <h3 className="">Categorization</h3>
          <h4 className="text-[16px]">Medium</h4>
          <div className="flex flex-wrap gap-[8px]">
            {medium.map((v, i) => {
              function categoriesChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
                if (e.currentTarget.checked) {
                  const newMedium = [...chosenCategories.medium, v];
                  setChosenCategories({...chosenCategories, medium: [...newMedium]});
                } else {
                  const filterCategories = chosenCategories.medium.filter((item) => item !== e.currentTarget.value);
                  setChosenCategories({
                    ...chosenCategories,
                    medium: [...filterCategories]
                  });
                }
              }

              function categoriesChangeHandler2(e: React.MouseEvent<HTMLButtonElement>) {
                const isInclude = chosenCategories.medium.includes(e.currentTarget.value);
                const newCategories = [...chosenCategories.medium, e.currentTarget.value];
                if (!isInclude) {
                  setChosenCategories({...chosenCategories, medium: [...newCategories]});
                } else {
                  const filterCategories = chosenCategories.medium.filter((item) => item !== e.currentTarget.value);
                  setChosenCategories({
                    ...chosenCategories,
                    medium: [...filterCategories]
                  });
                }
              }

              return (
                <button
                  onClick={categoriesChangeHandler2}
                  value={v}
                  key={i}
                  className="flex items-center justify-start outline-none transition-all gap-[12px] rounded-[5px] px-[10px] p-[5px] border-t-main border-[1px] hover:bg-t-main/25 focus:bg-t-main/25 focus:border-[1px] focus:outline-none"
                >
                  <input
                    className="cursor-pointer appearance-none h-[15px] w-[15px] border-t-main border-[1.7px] rounded-[3px] checked:bg-t-hover-2 checked:border-none"
                    type="checkbox"
                    value={v}
                    tabIndex={-1000}
                    checked={(chosenCategories?.medium as string[]).includes(v)}
                    onChange={() => {
                    }}
                  />
                  <span>{v}</span>
                </button>
              );
            })}
          </div>
          <span className="text-t-error">{errors.medium?.message}</span>

        </div>

        <button onClick={handleSubmit(onSubmit)}>submit</button>
        <button onClick={() => {
          console.log(chosenCategories);
        }}>asefawefaefs
        </button>
      </div>
    </section>
  );
};