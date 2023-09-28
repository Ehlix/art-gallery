import * as React from 'react';
import {ImSearch} from "react-icons/im";

type Props = {};

export default function NavInput(props: Props) {
  return (
    <div
      className="flex shrink grow items-center rounded-full bg-neutral-800 group h-[35px] bg-grad-1">
      <div
        className="absolute text-lg transition-all group-focus-within:text-t-hover-2 pl-[12px]">
        <ImSearch/></div>
      <input type="text"
             className="w-full h-full grow rounded-full bg-t-main-2 text-sm outline-none transition pl-[40px] border-t-main placeholder:text-t-main/30
               border-[3px] focus:box-decoration-clone focus:border-t-hover-2 hover:border-t-hover-1"
             placeholder="Search"></input>
    </div>
  );
};