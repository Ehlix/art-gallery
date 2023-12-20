import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';


export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({req, res});
  // const supabase = createMiddlewareClient<Database>({req, res});
  // const supabase = createServerComponentClient({cookies});
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
  return NextResponse.next();
}

export const config = {
  matcher: ['/project/new', '/projects']
};