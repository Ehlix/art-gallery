import {PicturesMain} from "@/components/main/picturesMain";
import {Suspense} from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";

export default async function HomePage() {
  const supabase = createServerComponentClient<Database>({cookies});
  const {count: artworksCount} = await supabase.from('artworks').select('*', {count: 'exact'})



  return (
    <section className="container relative">
      <Suspense>
        <PicturesMain artworksCount={artworksCount || 0}/>
      </Suspense>
    </section>
  );
}

