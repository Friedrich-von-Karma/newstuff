/**
 * Logowanie do panelu /admin (Decap CMS) przez GitHub – krok 1.
 * Przekierowuje do GitHuba z prośbą o zgodę. Wymaga zmiennych środowiskowych
 * OAUTH_GITHUB_CLIENT_ID i OAUTH_GITHUB_CLIENT_SECRET (Vercel → Settings → Environment Variables).
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const env = (name: string): string | undefined =>
  (import.meta.env as Record<string, string | undefined>)[name] ?? process.env[name];

export const GET: APIRoute = ({ url, cookies }) => {
  const clientId = env('OAUTH_GITHUB_CLIENT_ID');
  if (!clientId) {
    return new Response(
      'Brak zmiennej OAUTH_GITHUB_CLIENT_ID. Dodaj ją w Vercel → Settings → Environment Variables i opublikuj stronę ponownie.',
      { status: 500, headers: { 'content-type': 'text/plain; charset=utf-8' } },
    );
  }

  const state = crypto.randomUUID();
  cookies.set('decap_oauth_state', state, {
    path: '/api',
    httpOnly: true,
    secure: url.protocol === 'https:',
    sameSite: 'lax',
    maxAge: 600,
  });

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', clientId);
  authorize.searchParams.set('redirect_uri', new URL('/api/callback', url.origin).toString());
  authorize.searchParams.set('scope', url.searchParams.get('scope') || 'repo,user');
  authorize.searchParams.set('state', state);

  return new Response(null, { status: 302, headers: { location: authorize.toString(), 'cache-control': 'no-store' } });
};
