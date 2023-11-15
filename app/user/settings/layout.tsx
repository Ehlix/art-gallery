import React, {Suspense} from "react";
import {Metadata} from "next";
import UserSettingsNav from "@/components/userSettings/userSettingsNav";

export const metadata: Metadata = {
  title: 'Settings',
  description: 'User settings',
};

type Props = {
  children: React.ReactNode
}

export default function UserSettingLayout({children}: Props) {
  return (
    <section className="container flex justify-center gap-[20px] py-[20px]">
      <UserSettingsNav/>
      <Suspense>
        {children}
      </Suspense>
    </section>
  );
}