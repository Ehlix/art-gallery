'use client';
import {MdAdd, MdApps, MdDelete, MdFolder, MdFolderOpen} from "react-icons/md";
import React from "react";
import {useParams} from "next/navigation";
import Link from "next/link";

type Props = {};

const LeftNavigation = (props: Props) => {
  const params = useParams();
  const aaa = [1, 2, 3];
  return (
    <>
      <div className="grow flex flex-col py-5 gap-5">
        {
          !params.album
            ?
            <div
              className="flex items-center gap-1 border rounded-md border-t-main px-2 py-2 bg-t-main-3">
              <MdApps size={20}/>
              <div className="flex flex-col">
                <div className="text-t-hover-1 flex gap-1 items-center">
                  <MdFolderOpen size={20}/>
                  <span>
                   All
                  </span>
                </div>
                <div className="flex gap-1 text-sm">
                <span>
                  0
                </span>
                  Projects
                </div>
              </div>
            </div>
            :
            <Link href={'/projects'}
                  className="flex items-center gap-1 border rounded-md border-t-main px-2 py-2">
              <MdApps size={20}/>
              <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <MdFolder size={20}/>
                  <span>
                All
              </span>
                </div>
                <div className="flex gap-1 text-sm">
                <span>
                  0
                </span>
                  Projects
                </div>
              </div>
            </Link>
        }
        {
          aaa.map((v) => {
            return (
              (params.album === v + '')
                ?
                <div
                  className="flex items-center gap-1 border rounded-md border-t-main px-2 py-2 bg-t-main-3">
                  <MdApps size={20}/>
                  <div className="flex flex-col">
                    <div className="text-t-hover-1 flex gap-1 items-center">
                      <MdFolderOpen size={20}/>
                      <span>
                   {v}
                  </span>
                    </div>
                    <div className="flex gap-1 text-sm">
                <span>
                  0
                </span>
                      Projects
                    </div>
                  </div>
                </div>
                :
                <Link key={v}
                      href={`/projects/${v}`}
                      className="flex items-center gap-1 border rounded-md border-t-main px-2 py-2">
                  <MdApps size={20}/>
                  <div className="flex flex-col">
                    <div className="flex gap-1 items-center">
                      <MdFolder size={20}/>
                      <span>
                        {v}
                      </span>
                    </div>
                    <div className="flex gap-1 text-sm">
                      <span>
                        0
                      </span>
                      Projects
                    </div>
                  </div>
                </Link>
            );
          })
        }
        <button
          className="border group rounded-md border-t-main px-2 hover:text-t-hover-1 hover:border-t-hover-1 py-1 flex items-center justify-center gap-1">
          <MdAdd size={20}
                 className="text-t-hover-2 group-hover:text-t-hover-3 transition-all duration-300"/>
          Create new album
        </button>
      </div>
      <button
        className="border group rounded-md border-t-main px-4 hover:text-t-hover-1 hover:border-t-hover-1 py-1 flex items-center justify-start gap-1">
        <MdDelete size={20}/>
        <span className="grow flex items-start">
          Trash
        </span>
        <span>
          0
        </span>
      </button>
    </>
  );
};

export default LeftNavigation;