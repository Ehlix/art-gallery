import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {notFound} from "next/navigation";
import {ArtworkMain} from "@/components/artwork/artworkMain";

interface Props {
  params: { id: string };
}

export default async function ArtworkPage({params}: Props) {

  const supabase = createServerComponentClient({cookies});
  const {data:artwork} = await supabase
    .from('artworks')
    .select().eq('id', params.id);

  if (!artwork || artwork.length <= 0 || artwork[0].id != params.id) {
    return notFound();
  }

  const {data:user} = await supabase.from('users').select().eq('id', artwork[0]['user_id'])

  if (!user || user.length <=0) {
    return notFound();
  }

  return (
    <section className="container relative h-[100%]">
      <ArtworkMain artwork={artwork[0]} user={user[0].metadata}/>
    </section>
  );
}