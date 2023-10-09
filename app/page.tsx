import {PicturesMain} from "@/components/main/picturesMain";
import {Suspense} from "react";

export default async function Home() {


  return (
    <section className="container relative">
      <Suspense>
        <PicturesMain/>
      </Suspense>
    </section>
  );
}

