import {PicturesMain} from "@/components/picturesMain";
import {Suspense} from "react";

export default async function Home() {


  return (
    <section className="container relative h-full">
      <Suspense>
        <PicturesMain/>
      </Suspense>
    </section>
  );
}

