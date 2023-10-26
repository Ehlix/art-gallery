import {PicturesMain} from "@/components/main/picturesMain";
import {Suspense} from "react";

export default async function HomePage() {


  return (
    <section className="container relative">
      <Suspense>
        <PicturesMain/>
      </Suspense>
    </section>
  );
}

