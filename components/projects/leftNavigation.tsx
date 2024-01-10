'use client';
import {MdAdd, MdApps, MdDelete, MdFolder, MdFolderOpen} from "react-icons/md";
import React from "react";
import {useParams} from "next/navigation";
import Link from "next/link";

type Props = {};

export const LeftNavigation = (props: Props) => {
  const params = useParams();
  const aaa = [1, 2, 3];
  return (
    <>
      <div className="flex grow flex-col gap-5 py-5">
        {
          !params.album
            ?
            <div
              className="flex items-center gap-1 rounded-md border px-2 py-2 border-t-main bg-t-main-3">
              <MdApps size={20}/>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-t-hover-1">
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
                  className="flex items-center gap-1 rounded-md border px-2 py-2 border-t-main">
              <MdApps size={20}/>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
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
                  className="flex items-center gap-1 rounded-md border px-2 py-2 border-t-main bg-t-main-3">
                  <MdApps size={20}/>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-t-hover-1">
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
                      className="flex items-center gap-1 rounded-md border px-2 py-2 border-t-main">
                  <MdApps size={20}/>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
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
          className="flex items-center justify-center gap-1 rounded-md border px-2 py-1 group border-t-main hover:text-t-hover-1 hover:border-t-hover-1">
          <MdAdd size={20}
                 className="transition-all duration-300 text-t-hover-2 group-hover:text-t-hover-3"/>
          Create new album
        </button>
      </div>
      <button
        className="flex items-center justify-start gap-1 rounded-md border px-4 py-1 group border-t-main hover:text-t-hover-1 hover:border-t-hover-1">
        <MdDelete size={20}/>
        <span className="flex grow items-start">
          Trash
        </span>
        <span>
          0
        </span>
      </button>
    </>
  );
};