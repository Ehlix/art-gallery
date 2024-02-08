import React from "react";
import { notFound } from "next/navigation";

type Props = {
  params: { album: string };
};

const FolderPage = ({ params }: Props) => {
  return notFound();
  return (
    <>
      <div className="flex h-[70px]">
        <h3 className="py-5 text-2xl text-t-hover-1">{params.album}</h3>
      </div>
    </>
  );
};

export default FolderPage;
