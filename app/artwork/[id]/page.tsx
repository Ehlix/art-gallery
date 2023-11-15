import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {notFound} from "next/navigation";
import {ArtworkMain} from "@/components/artwork/artworkMain";
import {Database} from "@/lib/database.types";

interface Props {
  params: { id: string };
}

export type ArtworkProfileData = {
  name: string
  site: string
  website: string
  avatarLink: string
}

export default async function ArtworkPage({params}: Props) {

  const supabase = createServerComponentClient<Database>({cookies});
  const {data: artwork} = await supabase
    .from('artworks')
    .select().eq('id', params.id);

  if (!artwork || artwork.length <= 0 || artwork[0].id !== +params.id) {
    return notFound();
  }
  const userId = artwork[0]['user_id'] || '';

  const {data: user} = await supabase.from('users').select().eq('id', userId);

  if (!user || user.length <= 0) {
    return notFound();
  }

  const {data: profiles} = await supabase.from('profiles').select().eq('user_id', user && user[0].id);
  const profile = profiles && profiles[0];
  const artworkProfileData: ArtworkProfileData = {
    // @ts-ignore
    name: profile?.name || user[0].metadata?.name,
    // @ts-ignore
    site: user[0].metadata?.site,
    // @ts-ignore
    website: profile?.social?.website,
    avatarLink: (profile?.folder && profile?.avatar) ? `avatars/${profile.folder}/${profile.avatar}` : ''
  };

  return (
    <section className="container relative h-[100%]">
      <ArtworkMain artwork={artwork[0]} artworkData={artworkProfileData}/>
    </section>
  );
}