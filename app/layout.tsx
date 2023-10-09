import './globals.css';
import type {Metadata} from 'next';
import {Heebo} from 'next/font/google';
import {Nav} from "@/components/navigation/nav";
import React from "react";

const mainFont = Heebo({subsets: ['latin'], weight: ['400']});

export const metadata: Metadata = {
  title: 'Art',
  description: 'App gallery',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={'text-xl relative w-[100%] h-[100vh] flex flex-col overflow-x-hidden ' + mainFont.className}>
        <header>
          <Nav/>
        </header>
        <main className="grow basis-auto">
          {children}
        </main>
        <footer>2023</footer>
      </body>
    </html>
  );
}

