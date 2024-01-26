import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';


export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({req, res});
  const {data: user} = await supabase.auth.getUser();
  if (!user.user) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }
  if (user.user) {
    const {data: profile} = await supabase.from('profiles').select().eq('user_id', user.user.id)

    if (!profile || !profile[0]) {
      return NextResponse.redirect(new URL('/user/create-profile', req.url))
    }
  }
  return res;
}

export const config = {
  matcher: ['/project/new', '/projects', '/project/[id]','/user/settings/general', '/user/settings/profile', '/user/settings/social', '/user/settings/resume']
};
