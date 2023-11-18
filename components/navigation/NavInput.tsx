import * as React from 'react';
import {ImSearch} from "react-icons/im";

export default function NavInput() {
  return (
    <div
      className="flex shrink grow items-center rounded-full group h-[35px] bg-grad-1">
      <div
        className="absolute transition-all text-base group-focus-within:text-t-hover-2 pl-3">
        <ImSearch/></div>
      <input type="text"
             className="w-full h-full grow rounded-full bg-t-main-2 text-sm outline-none pl-9 border-t-main placeholder:text-t-main/30
               border-2 focus:box-decoration-clone focus:border-t-hover-2 hover:border-t-hover-1 transition duration-200"
             placeholder="Search"></input>
    </div>
  );
};