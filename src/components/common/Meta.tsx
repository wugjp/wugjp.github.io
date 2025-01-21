import { currentBaseUrl, currentLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Metadata } from 'next'

const getMetadata = async (title?: string, description?: string, thumbnailUrl?: string): Promise<Metadata> => {
  const { common: t } = await getDictionary()
  return {
    title: title || t.title,
    description: description || t.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: './icon-256x256.png',
    },
    metadataBase: new URL(currentBaseUrl),
    openGraph: {
      title: title || t.title,
      description: description || t.description,
      siteName: title,
      locale: currentLocale,
      type: 'website',
      images: [
        {
          url: thumbnailUrl || `${currentBaseUrl}/icon-256x256.png`,
          width: 256,
          height: 256,
        },
      ],
    },
    twitter: {
      title: title || t.title,
      description: description || t.description,
      creator: '@gomi_ningen',
      images: [thumbnailUrl || `${currentBaseUrl}/icon-256x256.png`],
      card: 'summary',
    },
  }
}

export default getMetadata
