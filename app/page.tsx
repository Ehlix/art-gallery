import {HomeMain} from "@/components/main/homeMain";
import {Suspense} from "react";

const HomePage = async () => {
  const date = new Date;
  const dateStart = date.toUTCString();

  return (
    <section className="container relative">
      <Suspense>
        <HomeMain dateStart={dateStart}/>
      </Suspense>
    </section>
  );
};
export default HomePage;