import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/lib/database.types";
import NewProjectMain, {EditArtwork} from "@/components/newProject/newProjectMain";
import {notFound, redirect} from "next/navigation";

type Props = {
  params: { id: string }
};

const ProjectIdPage = async ({params}: Props) => {
  const supabase = createServerComponentClient<Database>({cookies});
  const {data: user} = await supabase.auth.getUser();
  const {data: artworks} = await supabase.from('artworks').select().eq('id', params.id);
  const artwork = artworks && artworks[0] || notFound();
  if (artwork.user_id !== user.user?.id) {
    return redirect('/projects')
  }
  const editArtwork: EditArtwork = {
    curArtworkId: params.id,
    curUniquePath: artwork.folder,
    curTitle: artwork.title,
    curDescription: artwork.description,
    curThumb: {
      id: artwork.thumbnail,
      status: 'loaded',
      file: null
    },
    curSelectedFile: artwork.files.map((v, i) => {
      return {
        id: v,
        order: i,
        file: null,
        status: 'loaded',
      };
    }),
    curChosenCategories: {
      medium: artwork.medium,
      subject: artwork.subject,
    },
  };
  return (
    <div>
      <div>
        {params.id}
      </div>
      <NewProjectMain editArtwork={editArtwork}/>
    </div>
  );
};

export default ProjectIdPage;