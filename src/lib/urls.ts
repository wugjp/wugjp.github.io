export const Urls = {
  noImage: '/noimage.png',
  file: (key?: string) => {
    const base = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_URL
    return key ? `${base}/${key}` : Urls.noImage
  },
}
