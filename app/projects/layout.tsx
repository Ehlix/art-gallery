import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "My projects",
};

type Props = {
  children: React.ReactNode;
};

const ProjectsLayout = ({ children }: Props) => {
  return (
    <section className="container flex h-full flex-col">
      <div className="flex h-[70px] w-full border-b border-b-t-main-3">
        <h2 className="py-5 text-3xl text-t-hover-1">Portfolio</h2>
      </div>
      <div className="flex w-full flex-col pt-5">{children}</div>
    </section>
  );
};

export default ProjectsLayout;
