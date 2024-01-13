import {HomeMain} from "@/components/main/homeMain";
import {Suspense} from "react";

const HomePage = async () =>
  (
    <section className="container relative">
      <Suspense>
        <HomeMain/>
      </Suspense>
    </section>
  );

export default HomePage;