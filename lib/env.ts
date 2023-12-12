class Env {
  static PROJECTS_BUCKET: string = process.env.NEXT_PUBLIC_PROJECTS_BUCKET!;
  static PROJECTS_ID: string = process.env.NEXT_PUBLIC_PROJECT_ID!;
}

export default Env;