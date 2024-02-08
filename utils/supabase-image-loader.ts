import Env from "@/lib/env";

const projectId = Env.PROJECTS_ID;

type SupabaseLoaderType = {
  src: string;
  width: string;
  quality: string;
};
const supabaseLoader = ({
  src,
  width,
  quality,
}: SupabaseLoaderType): string => {
  if (src[0] === "/") {
    return src;
  }
  return `https://${projectId}.supabase.co/storage/v1/object/public/projects/${src}?width=${width}&quality=${
    quality || 75
  }`;
};
export default supabaseLoader;
