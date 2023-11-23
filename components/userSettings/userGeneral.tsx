'use client';
import * as React from "react";
import {UserEmail} from "@/components/userSettings/userEmail";
import {UserTimezone} from "@/components/userSettings/userTimezone";

type Props = {};

export function UserGeneral(props: Props) {
  return (
    <div className="flex flex-col items-end gap-5 md:items-center">
      <div
        className="flex h-fit flex-col items-center gap-5 rounded-md p-10 text-lg bg-t-main/20 w-[70vw] md:w-full lg:w-[60vw] lg:p-5">
        <div className="flex w-full shrink grow flex-col justify-between gap-5">
          <div className="flex flex-col leading-none gap-0.5">
            <h3
              className="mb-2 text-4xl font-bold -tracking-tight text-t-hover-1">
              General
            </h3>
            <p>
              Email, timezone, language, social media integration, browsing experience.
            </p>
          </div>

          <UserEmail email={'qwe@qwe.ru'}/>
          <UserTimezone/>
          <UserTimezone/>
          <div>
            <h3 className="mb-1 flex gap-1 text-xl text-t-error">
              Danger Zone
            </h3>
            <p className="text-t-error">
              {"Please note that once you remove your account, it will delete all artwork that you've posted."}
            </p>
            <div className="flex justify-end">
              <button
                className="rounded-md border p-1 px-4 transition-all duration-300 border-t-main-2 bg-t-main-2 hover:text-t-error hover:border-t-error">
                Cancel Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}