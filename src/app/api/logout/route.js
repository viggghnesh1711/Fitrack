import { cookies } from 'next/headers';

export async function POST(request) {
    const cookieStore = await cookies();

    cookieStore.delete('userEmail', { path: '/' });

    cookieStore.delete('next-auth.session-token', { path: '/' });
    cookieStore.delete('next-auth.csrf-token', { path: '/' });
    cookieStore.delete('next-auth.callback-url', { path: '/' });
    cookieStore.delete('next-auth.pkce.code_verifier', { path: '/' });
    cookieStore.delete('next-auth.state', { path: '/' });
    
    return new Response('Logged out successfully', { status: 200 });
}