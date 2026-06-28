const rawBase = import.meta.env.BASE_URL;
const base = rawBase.endsWith('/') ? rawBase : rawBase + '/';

export function withBase(path: string): string {
  if (!path) return base;
  if (
    path.startsWith('http') ||
    path.startsWith('//') ||
    path.startsWith('tel:') ||
    path.startsWith('mailto:')
  ) return path;
  if (path === '/') return base;
  if (path.startsWith('#')) return path;
  return base + path.replace(/^\//, '');
}

export function stripBase(pathname: string): string {
  const noTrail = base.replace(/\/$/, '');
  if (!pathname.startsWith(noTrail)) return pathname;
  const stripped = pathname.slice(noTrail.length).replace(/\/+$/, '');
  return stripped === '' ? '/' : stripped;
}
