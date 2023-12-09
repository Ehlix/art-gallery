import HomeMain from "@/components/main/homeMain";
import {Suspense} from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";

const HomePage = async () => {
  const supabase = createServerComponentClient<Database>({cookies});
  const date = new Date;
  const dateStart = date.toUTCString();
  const {count: artworksCount} = await supabase.from('artworks').select('*', {count: 'exact'}).lte('created_at', dateStart);
  console.log(dateStart);
  console.log(artworksCount);

  return (
    <section className="container relative">
      <Suspense>
        <HomeMain dateStart={dateStart} artworksCount={artworksCount || 0}/>
      </Suspense>
    </section>
  );
};
export default HomePage;