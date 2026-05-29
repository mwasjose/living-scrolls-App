export function aiApiUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_AI_BASE_URL?.replace(/\/$/, '') ?? '';
  return base ? `${base}${path}` : path;
}
