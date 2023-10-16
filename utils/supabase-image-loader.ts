import Env from "@/config/env";

const projectId = Env.PROJECTS_ID

type SupabaseLoaderType = {
  src:string
  width:string
  quality:string
}
export default function supabaseLoader({ src, width, quality }:SupabaseLoaderType):string {
  return `https://${projectId}.supabase.co/storage/v1/object/public/projects/${src}?width=${width}&quality=${
    quality || 75
  }`
}