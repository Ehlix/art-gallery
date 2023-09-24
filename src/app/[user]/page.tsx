import Image from "next/image";
import React from "react";
import {UserNav} from "@/components/userNav";
import {PiLinkBold} from "react-icons/pi";
import {HiMapPin} from "react-icons/hi2";


export default function Home({params}: { params: { user: string } }) {
  const aaa = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];

  return (
    <main className="relative flex flex-col">


      <div className="flex flex-wrap px-[3vh] gap-[0.5%]">
        {
          aaa.map(() => {
            return (
              <div
                className="transition-all duration-500 ease-in-out hover:shadow-[inset_0px_-300px_100px_-230px_rgba(0,0,0,0.40)] rounded-[5px] mb-[0.5%] h-[19.6vw] w-[19.6%] bg-neutral-500"></div>
            );
          })
        }
      </div>
    </main>
  );
}

