'use client';
import * as React from 'react';
import {useState} from 'react';
import {CallbackInput} from "@/components/newProject/callbackInput";

type Props = {};

const aaa = [1, 1, 1, 1, 1,];

const medium = ['digital 2d', 'digital 3d', 'animation', 'real-time', 'live action cg/vgx', 'rd printing', 'traditional ink', 'traditional dry media', 'traditional paint', 'traditional sculpture', 'mixed media',];

const subject = ['abstract', 'anatomy', 'animals & wildlife', 'anime & manga', 'architectural concepts', 'architectural visualization', 'automotive', 'board & card game art', 'book illustration', 'character animation', 'character design', 'character modeling', "children's art", 'comic art', 'concept art', 'cover art', 'creatures', 'editorial illustration', 'environmental concept art & design', 'fan art', 'fantasy', 'fashion & costume design', 'game art', 'gameplay & level design', 'games and real-time 3d', 'graphic design', 'hard surfase', 'horror',];


export default function Page(props: Props) {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const newTitle = (t: string) => {
    setTitle(t);
  };
  const newDescription = (t: string) => {
    setDescription(t);
  };

  return (
    <section className="container flex justify-center pt-[30px]">
      <div className="flex flex-col text-[18px] w-[55vw] gap-[50px]">
        <div>
          <h2 className="text-[33px] pb-[20px]">{title || 'Project name'}</h2>
          <div className="flex flex-col">
            Enter your artwork name
            <CallbackInput style="input" placeholder="your project title"
                           callback={newTitle}/>
          </div>
        </div>
        <div className="border-dotted border-t-main border-[3px]">
          UPLOAD ZONE
        </div>
        <div>PREVIEW ZONE
          <div
            className="grid grid-cols-3 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {
              aaa.map((a, i) => {
                return (
                  <div
                    key={i}
                    className="cursor-pointer overflow-hidden group aspect-[1/1] relative flex flex-col justify-end rounded-[3px] w-[100%] h-[100%] bg-t-main transition-all duration-1000 ease-in-out hover:shadow-[inset_0px_-270px_100px_-230px_rgba(0,0,0,0.60)] md:hover:shadow-none">
                    <div
                      className="relative flex h-fit w-full opacity-0 transition-all ease-in-out top-[100%] gap-[5px] duration-[600ms] px-[2%] pb-[2%] group-hover:top-0 group-hover:opacity-100 md:hidden">
                      <div
                        className="shrink-0 grow-0 rounded-full bg-black h-[40px] w-[40px]"></div>
                      <div
                        className="flex flex-col items-start text-t-hover-1 text-[14px]">
                        <p className="font-bold leading-none tracking-[1.1px]">Picture
                          name</p>
                        <p
                          className="leading-5 text-t-hover-1/70 text-[12px]">Nickname</p>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>

        <div className="flex flex-col">
          Enter artwork description
          <CallbackInput style="textarea" placeholder="project description"
                         callback={newDescription}/>
        </div>
        <div>
          <span className="w-full">Categorization</span>
          <div className="flex flex-wrap gap-[8px]">
            {medium.map((v, i) => {
              return (
                <div
                  className="flex items-center justify-start transition-all gap-[12px] rounded-[3px] px-[10px] p-[5px] border-t-main border-[1px] hover:bg-t-main/70"
                  key={i}>
                  <input className="mt-[-1.7px]" type="checkbox"/>
                  <span>{v}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};