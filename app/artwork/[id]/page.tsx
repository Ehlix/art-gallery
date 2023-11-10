import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {notFound} from "next/navigation";
import {ArtworkMain} from "@/components/artwork/artworkMain";

interface Props {
  params: { id: string };
}

export type ArtworkData = {
  name: string
  site: string
  website: string
  avatarLink: string
}

export default async function ArtworkPage({params}: Props) {

  const supabase = createServerComponentClient({cookies});
  const {data: artwork} = await supabase
    .from('artworks')
    .select().eq('id', params.id);

  if (!artwork || artwork.length <= 0 || artwork[0].id != params.id) {
    return notFound();
  }

  const {data: user} = await supabase.from('users').select().eq('id', artwork[0]['user_id']);

  if (!user || user.length <= 0) {
    return notFound();
  }

  const {data: profiles} = await supabase.from('profiles').select().eq('user_id', user && user[0].id);
  const profile = profiles && profiles[0];
  const artworkData: ArtworkData = {
    name: profile?.name || user[0].metadata.name,
    site: user[0].metadata.site,
    website: profile?.social?.website,
    avatarLink: (profile?.folder && profile?.avatar) ? `avatars/${profile.folder}/${profile.avatar}` : ''
  };

  return (
    <section className="container relative h-[100%]">
      <ArtworkMain artwork={artwork[0]} artworkData={artworkData}/>
    </section>
  );
}