import { auth } from '@/lib/auth';
import { generateJWT } from '@/lib/jwt';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST() {
  const headerStore = await headers();
  const session = await auth.api.getSession({ headers: headerStore });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email } = session.user;
  const token = generateJWT(email);

  const response = NextResponse.json({ success: true });
  response.cookies.set('drivefleet_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return response;
}