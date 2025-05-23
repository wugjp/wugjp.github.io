export const Urls = {
  noImage: '/noimage.png',
  blankImage: '/blank.png',
  inqiuryForm: 'https://docs.google.com/forms/d/1E3EOsHMNFk6R0BUHmUFy_e1NQdtucLMQ0TmKV7L0PKY/viewform?pli=1&pli=1&edit_requested=true',
  file: (key?: string) => {
    const base = 'https://pub-00d47032df24418cb7d9542664460c75.r2.dev'
    return key ? `${base}/${key}` : Urls.noImage
  },
  youtubeVideo: (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`,
  youtubeThumbnail: (videoId: string | undefined | null) => (videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : undefined),
}
