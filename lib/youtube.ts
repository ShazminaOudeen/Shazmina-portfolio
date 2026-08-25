// Small helpers for extracting a YouTube video ID from any common URL
// format, and building a thumbnail URL from it. Used by ProjectCard
// (cover thumbnail fallback) and ProjectDetail (embedded player).

export function getYoutubeId(url?: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?&]+)/,
    /(?:youtube\.com\/embed\/)([^?&]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function getYoutubeThumbnail(url?: string): string | null {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}