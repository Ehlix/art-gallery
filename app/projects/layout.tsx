import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Projects',
  description: 'My projects',
};


type Props = {
  children: React.ReactNode
};

const ProjectsLayout = ({children}: Props) => {
  return (
    <section className="h-full flex flex-col container">
      <div className="h-[70px] flex w-full border-b border-b-t-main-3">
        <h2 className="text-t-hover-1 text-3xl py-5">
          Portfolio
        </h2>
      </div>
      <div className="pt-5 flex flex-col w-full">
        {children}
      </div>
    </section>
  );
};

export default ProjectsLayout;