import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ArtworkMain } from "@/components/artwork/artworkMain";
import { Database } from "@/lib/database.types";

type Props = {
  params: { id: string };
};

export type CurrentUserSocialActivity = {
  like: Database["public"]["Tables"]["artworks_likes"]["Row"] | null;
  bookmark: Database["public"]["Tables"]["artworks_bookmarks"]["Row"] | null;
  follow: Database["public"]["Tables"]["users_followers"]["Row"] | null;
};

const ArtworkPage = async ({ params }: Props) => {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookiesStore,
  });

  const { data: artwork } = await supabase
    .from("artworks")
    .select()
    .eq("id", params.id);
  if (!artwork || artwork.length <= 0 || artwork[0].id !== +params.id) {
    return notFound();
  }
  const userId = artwork[0]["user_id"] || "";

  const { data: user } = await supabase.from("users").select().eq("id", userId);
  if (!user || user.length <= 0) {
    return notFound();
  }
  const { data: profiles } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", user && user[0].id);
  const profile = profiles && profiles[0];
  if (!profile) {
    return notFound();
  }
  const { data: _currentUser } = await supabase.auth.getUser();
  const { data: _currentUserProfiles } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", _currentUser.user?.id || "");
  const currentUser =
    _currentUser.user && _currentUserProfiles && _currentUserProfiles[0]
      ? _currentUser.user
      : null;
  const { data: likes } = await supabase.from("artworks_likes").select().match({
    artwork_id: artwork[0].id,
    user_id: currentUser?.id,
  });
  const { data: bookmarks } = await supabase
    .from("artworks_bookmarks")
    .select()
    .match({
      artwork_id: artwork[0].id,
      user_id: currentUser?.id,
    });
  const { data: followers } = await supabase
    .from("users_followers")
    .select()
    .match({
      user_id: user[0].id,
      follower_id: currentUser?.id,
    });
  const currentUserSocialActivity: CurrentUserSocialActivity = {
    like: likes && likes[0],
    follow: followers && followers[0],
    bookmark: bookmarks && bookmarks[0],
  };

  return (
    <section className="container relative h-full">
      <ArtworkMain
        artwork={artwork[0]}
        profile={profile}
        currentUser={currentUser}
        currentUserSocialActivity={currentUserSocialActivity}
      />
    </section>
  );
};
export default ArtworkPage;
