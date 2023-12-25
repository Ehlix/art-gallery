'use client';
import {SUBJECTS} from "@/lib/categories_data";
import Image from "next/image";
import {MdAllInclusive, MdArrowLeft, MdArrowRight} from "react-icons/md";
import React, {useState} from "react";
import {cn} from "@/utils/twMergeClsx";
import {useRouter} from "next/navigation";

type Props = {};


const FilterList = (props: Props) => {
  const router = useRouter();
  const [isDown, setIsDown] = useState<boolean>(false);
  const [starX, setStarX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isDragged, setIsDragged] = useState<boolean>(false);

  const positionIncrease = () => {
    const slider = document.getElementById('slider');
    slider && (slider.scrollLeft = slider.scrollLeft + ((window.innerWidth > 640) ? window.innerWidth - 380 : window.innerWidth - 100));
  };

  const positionDecrease = () => {
    const slider = document.getElementById('slider');
    slider && (slider.scrollLeft = slider.scrollLeft - ((window.innerWidth > 640) ? window.innerWidth - 380 : window.innerWidth - 130));
  };

  const downHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    const slider = document.getElementById('slider');
    if (slider) {
      setStarX(e.pageX - slider.offsetLeft);
      setScrollLeft(slider.scrollLeft);
    }
  };

  const leaveHandler = () => {
    setIsDown(false);
  };

  const upHandler = () => {
    setIsDown(false);
  };

  const moveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) {
      return;
    }
    e.preventDefault();
    const slider = document.getElementById('slider');
    setIsDragged(true);
    if (slider) {
      const x = e.pageX - slider.offsetLeft;
      const step = (x - starX);
      slider.scrollLeft = scrollLeft - step;
    }
  };

  const filterChangeHandler = (e: React.MouseEvent<HTMLButtonElement>, x: string) => {
    if (isDragged) {
      e.stopPropagation();
      setIsDragged(false);
      return;
    }
    router.push(`/?subject=${x}`);
  };

  return (
    <div
      className={'w-full flex overflow-hidden items-center h-fit gap-2 select-none sm:gap-1 sm:flex-col'}>
      <button
        onClick={() => router.push('/')}
        className={cn('h-full sm:self-start p-3 gap-2 flex hover:bg-t-main-3 transition duration-300 rounded-md items-center')}>
        <div
          className="flex items-center justify-center overflow-hidden rounded-md h-[60px] w-[60px] min-h-[60px] min-w-[60px] bg-t-main/20">
          <MdAllInclusive size={30}/>
        </div>
        <span className={'whitespace-nowrap'}>
                All Channels
              </span>
      </button>

      <div
        className={'w-full flex overflow-hidden items-center h-fit gap-2 select-none sm:gap-1'}>
        <button
          className="flex rounded-full w-[30px] bg-t-main-3 h-[30px] hover:bg-t-main/30"
          onClick={positionDecrease}>
          <MdArrowLeft size={30}/>
        </button>
        <div className={'overflow-hidden'}>
          <div id={'slider'}
               onMouseDown={(e) => downHandler(e)}
               onMouseLeave={leaveHandler}
               onMouseUp={upHandler}
               onMouseMove={(e) => moveHandler(e)}
               className={cn("scroll-smooth w-full flex overflow-hidden items-center h-fit gap-2 sm:gap-1", {
                 'scroll-auto ': isDown
               })}>
            {
              SUBJECTS.map((v) => {
                return (
                  <button key={v.name}
                          onClick={(e) => filterChangeHandler(e, v.params)}
                          className={'h-full p-3 gap-2 flex hover:bg-t-main-3 transition duration-300 rounded-md items-center'}>
                    <div
                      className="overflow-hidden rounded-md h-[60px] w-[60px] min-h-[60px] min-w-[60px]">
                      <Image src={`${v.link}/1.jpg`} alt={'1'}
                             className="h-full w-full object-cover object-center"
                             priority={true}
                             height={10}
                             width={10}
                             quality={10}/>
                    </div>
                    <span className={'whitespace-nowrap capitalize text-xl'}>
                      {v.name}
                     </span>
                  </button>
                );
              })
            }
          </div>
        </div>
        <button
          className="flex rounded-full w-[30px] bg-t-main-3 h-[30px] hover:bg-t-main/30"
          onClick={positionIncrease}>
          <MdArrowRight size={30}/>
        </button>
      </div>

    </div>
  );
};

export default FilterList;