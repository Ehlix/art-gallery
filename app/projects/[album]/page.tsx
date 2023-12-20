import React from "react";
import {notFound} from "next/navigation";

type Props = {
  params: { album: string }
};

const FolderPage = ({params}: Props) => {
  return notFound()
  return (
    <>
      <div className="h-[70px] flex">
        <h3 className="py-5 text-t-hover-1 text-2xl">
          {params.album}
        </h3>
      </div>
    </>
  );
};

export default FolderPage;