import {
  createMiddlewareClient,
  createServerComponentClient
} from '@supabase/auth-helpers-nextjs';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';


export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({req, res});
  // const supabase = createMiddlewareClient<Database>({req, res});
  // const supabase = createServerComponentClient({cookies});
  const {data:user} = await supabase.auth.getUser();
  //todo: get user profile data and complete redirect if block
  if (!user.user) {
    return NextResponse.redirect(new URL('/auth/sign_in', req.url));
  }
  // if (user.user && profile) {
  //   return NextResponse.redirect(new URL('/auth/sign_in', req.url))
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ['/project/new']
};