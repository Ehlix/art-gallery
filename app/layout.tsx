import './globals.css';
import type {Metadata} from 'next';
import {Heebo} from 'next/font/google';
import {NavMain} from "@/components/navigation/navMain";
import {cn} from "@/utils/twMergeClsx";
import React from "react";

const mainFont = Heebo({subsets: ['latin'], weight: ['400']});

export const metadata: Metadata = {
  title: 'Art',
  description: 'Art gallery',
};

const RootLayout = ({children,}: { children: React.ReactNode }) => (
  <html lang="en">
    <body
      className={cn('text-xl relative mr-[calc(-1*(100vw-100%))] w-full h-screen flex flex-col overflow-x-hidden ')}>
      <header>
        <NavMain/>
      </header>
      <main className="grow basis-auto">
        {children}
      </main>
      <footer className="flex justify-center">
        2024
      </footer>
    </body>
  </html>
);
export default RootLayout;