import {PicturesMain} from "@/components/picturesMain";
import {Suspense} from "react";

export default function Home() {

  return (
    <section className="container relative h-full">
      <Suspense>
        <PicturesMain/>
      </Suspense>
    </section>
  );
}

