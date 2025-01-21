export const Urls = {
  noImage: '/noimage.png',
  inqiuryForm: 'https://docs.google.com/forms/d/1E3EOsHMNFk6R0BUHmUFy_e1NQdtucLMQ0TmKV7L0PKY/viewform?pli=1&pli=1&edit_requested=true',
  file: (key?: string) => {
    const base = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_URL
    return key ? `${base}/${key}` : Urls.noImage
  },
}
