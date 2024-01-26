"use client";
import { SUBJECTS } from "@/lib/categories_data";
import Image from "next/image";
import { MdAllInclusive, MdArrowLeft, MdArrowRight } from "react-icons/md";
import React, { useState } from "react";
import { cn } from "@/utils/twMergeClsx";
import { useRouter, useSearchParams } from "next/navigation";

export const FilterList = () => {
  const router = useRouter();
  const [isDown, setIsDown] = useState<boolean>(false);
  const [starX, setStarX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const positionIncrease = () => {
    const slider = document.getElementById("slider");
    slider &&
      (slider.scrollLeft =
        slider.scrollLeft +
        (window.innerWidth > 640
          ? window.innerWidth - 380
          : window.innerWidth - 100));
  };

  const positionDecrease = () => {
    const slider = document.getElementById("slider");
    slider &&
      (slider.scrollLeft =
        slider.scrollLeft -
        (window.innerWidth > 640
          ? window.innerWidth - 380
          : window.innerWidth - 130));
  };

  const downHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    const slider = document.getElementById("slider");
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
    const slider = document.getElementById("slider");
    setIsDragged(true);
    if (slider) {
      const x = e.pageX - slider.offsetLeft;
      const step = x - starX;
      slider.scrollLeft = scrollLeft - step;
    }
  };
  console.log();
  const filterChangeHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    x: string,
  ) => {
    if (isDragged) {
      e.stopPropagation();
      setIsDragged(false);
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("subject", x);
    router.replace(`/?${params.toString()}`);
  };

  const allChanelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.delete("subject");
    router.replace(`/?${params.toString()}`);
  };

  return (
    <div
      className={
        "flex h-fit w-full select-none items-center gap-2 overflow-hidden sm:flex-col sm:gap-1"
      }
    >
      <button
        onClick={(e) => allChanelHandler(e)}
        className={cn(
          "flex h-full items-center gap-2 rounded-md p-3 transition duration-300 hover:bg-t-main-3 sm:self-start",
        )}
      >
        <div className="flex h-[60px] min-h-[60px] w-[60px] min-w-[60px] items-center justify-center overflow-hidden rounded-md bg-t-main/20">
          <MdAllInclusive size={30} />
        </div>
        <span className={"whitespace-nowrap"}>All Channels</span>
      </button>

      <div
        className={
          "flex h-fit w-full select-none items-center gap-2 overflow-hidden sm:gap-1"
        }
      >
        <button
          className="flex h-[30px] w-[30px] rounded-full bg-t-main-3 hover:bg-t-main/30"
          onClick={positionDecrease}
        >
          <MdArrowLeft size={30} />
        </button>
        <div className={"overflow-hidden"}>
          <div
            id={"slider"}
            onMouseDown={(e) => downHandler(e)}
            onMouseLeave={leaveHandler}
            onMouseUp={upHandler}
            onMouseMove={(e) => moveHandler(e)}
            className={cn(
              "flex h-fit w-full items-center gap-2 overflow-hidden scroll-smooth sm:gap-1",
              {
                "scroll-auto ": isDown,
              },
            )}
          >
            {SUBJECTS.map((v) => {
              return (
                <button
                  key={v.name}
                  onClick={(e) => filterChangeHandler(e, v.params)}
                  className={
                    "flex h-full items-center gap-2 rounded-md p-3 transition duration-300 hover:bg-t-main-3"
                  }
                >
                  <div className="h-[60px] min-h-[60px] w-[60px] min-w-[60px] overflow-hidden rounded-md">
                    <Image
                      src={`${v.link}/1.jpg`}
                      alt={"1"}
                      className="h-full w-full object-cover object-center"
                      priority={true}
                      height={10}
                      width={10}
                      quality={10}
                    />
                  </div>
                  <span className={"whitespace-nowrap text-xl capitalize"}>
                    {v.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <button
          className="flex h-[30px] w-[30px] rounded-full bg-t-main-3 hover:bg-t-main/30"
          onClick={positionIncrease}
        >
          <MdArrowRight size={30} />
        </button>
      </div>
    </div>
  );
};
