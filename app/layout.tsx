import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { NavMain } from "@/components/navigation/navMain";
import { cn } from "@/utils/twMergeClsx";
import React, { Suspense } from "react";
import NavLoading from "./navLoading";

const mainFont = Nunito_Sans({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Art",
  description: "Art gallery",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={mainFont.className}>
    <body
      className={cn(
        "relative mr-[calc(-1*(100vw-100%))] flex h-screen w-full flex-col overflow-x-hidden text-xl ",
      )}
    >
      <header>
        <Suspense fallback={<NavLoading />}>
          <NavMain />
        </Suspense>
      </header>
      <main className="grow basis-auto">{children}</main>
      <footer className="flex justify-center">2024</footer>
    </body>
  </html>
);
export default RootLayout;
