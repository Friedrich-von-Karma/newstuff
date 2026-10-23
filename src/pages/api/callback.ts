/**
 * Logowanie do panelu /admin (Decap CMS) przez GitHub – krok 2.
 * GitHub wraca tutaj z kodem; wymieniamy go na token i przekazujemy do okna panelu
 * w formacie, którego oczekuje Decap CMS.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const env = (name: string): string | undefined =>
  (import.meta.env as Record<string, string | undefined>)[name] ?? process.env[name];

/** Strona w okienku logowania: rozmawia z panelem przez window.opener.postMessage. */
function page(status: 'success' | 'error', content: Record<string, string>) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const text =
    status === 'success'
      ? 'Zalogowano. To okno zamknie się samo…'
      : `Logowanie nie powiodło się: ${content.error ?? 'nieznany błąd'}`;
  const html = `<!doctype html>
<html lang="pl"><head><meta charset="utf-8"><title>Logowanie – panel Blattodea.pl</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b120d;color:#ebe5d3;font:16px/1.6 system-ui,sans-serif;padding:24px;text-align:center}</style>
</head><body><p>${text.replace(/</g, '&lt;')}</p>
<script>
(function () {
  var message = ${JSON.stringify(message)};
  if (!window.opener) { document.body.insertAdjacentHTML('beforeend', '<p>Otwórz panel pod adresem /admin/ i zaloguj się stamtąd.</p>'); return; }
  function receive(e) {
    if (e.data !== 'authorizing:github') return;
    window.removeEventListener('message', receive, false);
    window.opener.postMessage(message, e.origin);
    ${status === 'success' ? 'setTimeout(function () { window.close(); }, 400);' : ''}
  }
  window.addEventListener('message', receive, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;
  return new Response(html, {
    status: status === 'success' ? 200 : 400,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
}

export const GET: APIRoute = async ({ url, cookies }) => {
  const clientId = env('OAUTH_GITHUB_CLIENT_ID');
  const clientSecret = env('OAUTH_GITHUB_CLIENT_SECRET');
  if (!clientId || !clientSecret) {
    return page('error', { error: 'brak zmiennych OAUTH_GITHUB_CLIENT_ID / OAUTH_GITHUB_CLIENT_SECRET na serwerze' });
  }

  const ghError = url.searchParams.get('error');
  if (ghError) return page('error', { error: url.searchParams.get('error_description') || ghError });

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expected = cookies.get('decap_oauth_state')?.value;
  cookies.delete('decap_oauth_state', { path: '/api' });
  if (!code) return page('error', { error: 'brak kodu autoryzacji' });
  if (!state || !expected || state !== expected) {
    return page('error', { error: 'nieprawidłowy parametr state – spróbuj zalogować się jeszcze raz' });
  }

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: new URL('/api/callback', url.origin).toString(),
      }),
    });
    const data = (await res.json()) as { access_token?: string; error?: string; error_description?: string };
    if (!res.ok || !data.access_token) {
      return page('error', { error: data.error_description || data.error || `GitHub odpowiedział kodem ${res.status}` });
    }
    return page('success', { token: data.access_token, provider: 'github' });
  } catch (e) {
    return page('error', { error: `nie udało się połączyć z GitHubem (${e instanceof Error ? e.message : String(e)})` });
  }
};
